import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { NewsItem } from '@/types/news';
import { RSS_FEEDS } from '@/lib/feeds';
import { translateText } from '@/lib/translator';
import { MOCK_NEWS } from '@/lib/mock-data';

// Mapeia fontes RSS para rótulos
const SOURCE_TO_LABELS: Record<string, string[]> = {
  'OpenAI': ['OpenAI'],
  'Google DeepMind': ['Google'],
  'NVIDIA Blog': ['NVIDIA'],
  'Meta Research': ['Meta'],
  'TechCrunch AI': ['Startups'], // Default para agregadores
  'VentureBeat AI': ['Startups'],
  'The Verge AI': ['Regulamentação'], // Frequentemente cobre políticas
};

// Palavras-chave para identificação de rótulos adicionais
const LABEL_KEYWORDS: Record<string, string[]> = {
  'OpenAI': ['openai', 'gpt', 'chatgpt', 'dall-e', 'sora'],
  'Anthropic': ['anthropic', 'claude'],
  'Google': ['google', 'deepmind', 'gemini', 'bard', 'waymo'],
  'Meta': ['meta', 'facebook', 'llama', 'pytorch'],
  'Microsoft': ['microsoft', 'copilot', 'azure', 'bing'],
  'NVIDIA': ['nvidia', 'cuda', 'gpu', 'h100'],
  'Regulamentação': ['regulation', 'law', 'policy', 'government', 'senate', 'congress', 'eu ai act', 'legislation'],
  'Startups': ['startup', 'funding', 'series', 'venture', 'investment'],
};

// Palavras-chave para tags de tipo de conteúdo
const TAG_KEYWORDS: Record<string, string[]> = {
  'Lançamento': ['launch', 'release', 'announce', 'unveil', 'introduce', 'debut', 'new model'],
  'Atualização': ['update', 'upgrade', 'improve', 'enhance', 'version'],
  'Aquisição': ['acquire', 'acquisition', 'buy', 'purchase', 'merge'],
  'Regulamentação': ['regulation', 'law', 'policy', 'ban', 'restrict', 'compliance'],
  'Tutorial': ['how to', 'guide', 'tutorial', 'learn', 'introduction'],
  'Opinião': ['opinion', 'commentary', 'analysis', 'perspective', 'think'],
  'Pesquisa': ['research', 'paper', 'study', 'discover', 'breakthrough', 'findings'],
};

// Identifica rótulos baseado no conteúdo
function identifyLabels(source: string, title: string, description: string): string[] {
  const labels = new Set<string>();
  const textLower = `${title} ${description}`.toLowerCase();

  // Adiciona rótulo baseado na fonte RSS
  if (SOURCE_TO_LABELS[source]) {
    SOURCE_TO_LABELS[source].forEach(label => labels.add(label));
  }

  // Adiciona rótulos baseados em palavras-chave
  for (const [label, keywords] of Object.entries(LABEL_KEYWORDS)) {
    if (keywords.some(keyword => textLower.includes(keyword.toLowerCase()))) {
      labels.add(label);
    }
  }

  // Se não encontrou nenhum rótulo, adiciona "Startups" como padrão
  if (labels.size === 0) {
    labels.add('Startups');
  }

  return Array.from(labels);
}

// Identifica tags de tipo de conteúdo
function identifyTags(title: string, description: string): string[] {
  const tags: string[] = [];
  const textLower = `${title} ${description}`.toLowerCase();

  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some(keyword => textLower.includes(keyword.toLowerCase()))) {
      tags.push(tag);
    }
  }

  // Retorna no máximo 2 tags (as mais relevantes)
  return tags.slice(0, 2);
}

// Gera o texto "Por que importa"
function generateWhyItMatters(description: string): string {
  // Pega as primeiras 2 sentenças ou até 150 caracteres
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);

  if (sentences.length === 0) return 'Desenvolvimento importante no campo da inteligência artificial.';

  let result = sentences[0].trim();

  // Se muito curto, adiciona segunda sentença
  if (result.length < 80 && sentences.length > 1) {
    result += '. ' + sentences[1].trim();
  }

  // Limita a aproximadamente 25 palavras
  const words = result.split(/\s+/);
  if (words.length > 25) {
    result = words.slice(0, 25).join(' ') + '...';
  }

  return result;
}

// Calcula score de destaque (1-10)
function calculateFeaturedScore(title: string, description: string, pubDate: string): number {
  let score = 5; // Score base

  const textLower = `${title} ${description}`.toLowerCase();

  // Palavras-chave de alto impacto (+3 pontos)
  const highImpactKeywords = ['breakthrough', 'revolutionary', 'launch', 'announce', 'major', 'significant'];
  if (highImpactKeywords.some(k => textLower.includes(k))) score += 3;

  // Empresas principais (+2 pontos)
  const majorCompanies = ['openai', 'google', 'microsoft', 'meta', 'nvidia'];
  if (majorCompanies.some(k => textLower.includes(k))) score += 2;

  // Recência (+1 ponto se menos de 24h)
  const age = Date.now() - new Date(pubDate).getTime();
  const hoursOld = age / (1000 * 60 * 60);
  if (hoursOld < 24) score += 1;

  // Limita entre 1 e 10
  return Math.max(1, Math.min(10, score));
}

interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  guid?: string;
  isoDate?: string;
  [key: string]: any;
}

const parser: Parser<any, RSSItem> = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'content:encoded', 'description'],
  },
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const translate = searchParams.get('translate') !== 'false';

    const allNews: NewsItem[] = [];

    // Busca notícias de todos os feeds
    for (const feed of RSS_FEEDS) {
      try {
        const rssFeed = await parser.parseURL(feed.url);

        for (const item of rssFeed.items.slice(0, Math.ceil(limit / RSS_FEEDS.length))) {
          const titleOriginal = item.title || '';
          const descriptionOriginal = item.contentSnippet || item.description || '';

          // Traduz título e descrição se solicitado
          let title = titleOriginal;
          let description = descriptionOriginal;

          if (translate) {
            try {
              // Traduz com timeout maior e delay entre requisições
              const translateWithTimeout = async (text: string, maxLength: number) => {
                const timeout = new Promise<string>((_, reject) =>
                  setTimeout(() => reject(new Error('Translation timeout')), 10000)
                );

                // Adiciona delay de 200ms antes de cada tradução
                await new Promise(resolve => setTimeout(resolve, 200));

                const translation = translateText(text.substring(0, maxLength));
                return Promise.race([translation, timeout]);
              };

              title = await translateWithTimeout(titleOriginal, 400);

              // Adiciona delay extra entre título e descrição
              await new Promise(resolve => setTimeout(resolve, 300));

              description = await translateWithTimeout(descriptionOriginal, 800);

              // Log de sucesso
              console.log(`✓ Traduzido: ${titleOriginal.substring(0, 50)}...`);
            } catch (error) {
              console.error('Translation failed for item:', titleOriginal.substring(0, 50));
              // Mantém originais se tradução falhar
              title = titleOriginal;
              description = descriptionOriginal;
            }
          }

          // Gera labels, tags e outros campos baseados no conteúdo
          const labels = identifyLabels(feed.name, titleOriginal, descriptionOriginal);
          const tags = identifyTags(titleOriginal, descriptionOriginal);
          const whyItMatters = generateWhyItMatters(description); // Usa descrição traduzida
          const featuredScore = calculateFeaturedScore(titleOriginal, descriptionOriginal, item.pubDate || new Date().toISOString());

          const newsItem: NewsItem = {
            id: `${feed.name}-${item.guid || item.link}`,
            title,
            titleOriginal,
            description,
            descriptionOriginal,
            link: item.link || '',
            pubDate: item.pubDate || new Date().toISOString(),
            source: feed.name,
            // Novos campos
            labels,
            tags,
            whyItMatters,
            featuredScore,
          };

          allNews.push(newsItem);
        }
      } catch (error) {
        console.error(`Error fetching feed ${feed.name}:`, error);
      }
    }

    // Se não conseguiu buscar nenhuma notícia, usa dados mockados (útil para demo/desenvolvimento)
    const newsToReturn = allNews.length > 0 ? allNews : MOCK_NEWS;

    // Ordena por data (mais recentes primeiro)
    newsToReturn.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({
      success: true,
      count: newsToReturn.length,
      news: newsToReturn.slice(0, limit),
      lastUpdate: new Date().toISOString(),
      usingMockData: allNews.length === 0,
    });
  } catch (error) {
    console.error('Error in news API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
