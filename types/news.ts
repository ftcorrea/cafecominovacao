export interface NewsItem {
  id: string;
  title: string; // Título traduzido em português
  titleOriginal: string;
  description: string;
  descriptionOriginal: string;
  link: string;
  pubDate: string;
  source: string; // Fonte RSS original (interno, não exibir)

  // Novos campos
  labels: string[]; // Rótulos de empresa/tema (OpenAI, Google, etc)
  tags: string[]; // Tags de tipo de conteúdo (Lançamento, Tutorial, etc)
  whyItMatters: string; // Resumo "Por que importa" (max 25 palavras)
  featuredScore: number; // Pontuação 1-10 para relevância

  category?: string;
}

export interface RSSFeed {
  name: string;
  url: string;
  color: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

