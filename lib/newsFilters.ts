import { NewsItem } from '@/types/news';

// Retorna notícias dos últimos 3 dias (ou 15 mais recentes se houver menos)
export function getRecentNews(news: NewsItem[]): NewsItem[] {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const recentNews = news.filter(n => new Date(n.pubDate) >= threeDaysAgo);

  // Se tiver menos de 15, retorna as 15 mais recentes
  if (recentNews.length < 15) {
    return news.slice(0, 15);
  }

  return recentNews;
}

// Retorna notícias com mais de 3 dias (até 12 meses)
export function getArchivedNews(news: NewsItem[]): NewsItem[] {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  return news.filter(n => {
    const pubDate = new Date(n.pubDate);
    return pubDate < threeDaysAgo && pubDate >= twelveMonthsAgo;
  });
}

// Retorna notícias de um mês específico
export function getNewsByMonth(news: NewsItem[], yearMonth: string): NewsItem[] {
  const [year, month] = yearMonth.split('-').map(Number);

  return news.filter(n => {
    const pubDate = new Date(n.pubDate);
    return pubDate.getFullYear() === year && pubDate.getMonth() === month - 1;
  });
}

// Retorna lista de meses disponíveis (formato: "2026-01")
export function getAvailableMonths(news: NewsItem[]): string[] {
  const archivedNews = getArchivedNews(news);

  const months = new Set<string>();

  archivedNews.forEach(n => {
    const pubDate = new Date(n.pubDate);
    const yearMonth = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;
    months.add(yearMonth);
  });

  // Ordena do mais recente para o mais antigo
  return Array.from(months).sort((a, b) => b.localeCompare(a));
}

// Formata mês para exibição (ex: "Janeiro 2026")
export function formatMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split('-');
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return `${monthNames[parseInt(month) - 1]} ${year}`;
}
