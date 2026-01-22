import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { NewsItem } from '@/types/news';
import { RSS_FEEDS } from '@/lib/feeds';
import { translateText } from '@/lib/translator';
import { MOCK_NEWS } from '@/lib/mock-data';

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

          const newsItem: NewsItem = {
            id: `${feed.name}-${item.guid || item.link}`,
            title,
            titleOriginal,
            description,
            descriptionOriginal,
            link: item.link || '',
            pubDate: item.pubDate || new Date().toISOString(),
            source: feed.name,
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
