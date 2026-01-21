import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { NewsItem } from '@/types/news';
import { RSS_FEEDS } from '@/lib/feeds';
import { translateText } from '@/lib/translator';

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
              // Traduz apenas as primeiras 200 palavras para economia de API
              title = await translateText(titleOriginal.substring(0, 500));
              description = await translateText(descriptionOriginal.substring(0, 1000));
            } catch (error) {
              console.error('Translation failed for item:', error);
              // Mantém originais se tradução falhar
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

    // Ordena por data (mais recentes primeiro)
    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({
      success: true,
      count: allNews.length,
      news: allNews.slice(0, limit),
      lastUpdate: new Date().toISOString(),
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
