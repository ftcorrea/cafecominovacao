export interface NewsItem {
  id: string;
  title: string;
  titleOriginal: string;
  description: string;
  descriptionOriginal: string;
  link: string;
  pubDate: string;
  source: string;
  category?: string;
}

export interface RSSFeed {
  name: string;
  url: string;
  color: string;
}
