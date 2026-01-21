import { RSSFeed } from '@/types/news';

export const RSS_FEEDS: RSSFeed[] = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    color: '#0ACF83',
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    color: '#FF6B6B',
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    color: '#FA26A0',
  },
  {
    name: 'Google DeepMind',
    url: 'https://deepmind.google/blog/rss.xml',
    color: '#4285F4',
  },
  {
    name: 'OpenAI',
    url: 'https://openai.com/news/rss.xml',
    color: '#10A37F',
  },
  {
    name: 'NVIDIA Blog',
    url: 'https://blogs.nvidia.com/feed/',
    color: '#76B900',
  },
  {
    name: 'Meta Research',
    url: 'https://research.facebook.com/feed/',
    color: '#0668E1',
  },
];
