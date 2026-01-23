'use client';

import { NewsItem } from '@/types/news';
import { useApp } from '@/lib/AppContext';
import { Star, Check } from 'lucide-react';

interface NewsCardCompactProps {
  news: NewsItem;
  featured?: boolean;
}

export default function NewsCardCompact({ news, featured = false }: NewsCardCompactProps) {
  const { savedIds, readIds, toggleSaved, toggleRead } = useApp();

  const isSaved = savedIds.has(news.id);
  const isRead = readIds.has(news.id);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} min`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  // Usar whyItMatters se existir, senão gerar do description
  const whyItMatters = news.whyItMatters || news.description.substring(0, 120) + '...';

  // Usar tags se existirem, senão array vazio
  const tags = news.tags || [];

  return (
    <div
      className={`bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-3.5 transition-all duration-200 cursor-pointer group ${
        isRead ? 'opacity-60' : ''
      } hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover hover:border-accent/60 hover:-translate-y-0.5`}
      onClick={() => window.open(news.link, '_blank')}
    >
      {/* Header do Card - Apenas tempo e badge destaque */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] text-light-text-secondary dark:text-dark-text-secondary">
          {formatTime(news.pubDate)}
        </span>

        {featured && (
          <span className="text-[9px] font-semibold bg-accent text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
            Destaque
          </span>
        )}
      </div>

      {/* Título - Apenas versão em português */}
      <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary leading-snug mb-2.5 line-clamp-2">
        {news.title}
      </h3>

      {/* Por que importa */}
      <div className="bg-accent/10 dark:bg-accent/20 rounded-md p-2 mb-2.5">
        <div className="text-[9px] font-bold text-accent uppercase tracking-wider mb-1">
          Por que importa
        </div>
        <p className="text-[12px] text-light-text-primary dark:text-dark-text-primary leading-relaxed line-clamp-2">
          {whyItMatters}
        </p>
      </div>

      {/* Tags de tipo de conteúdo (máximo 2) */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-[10px] bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-secondary dark:text-dark-text-secondary px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex gap-1.5">
        <button
          onClick={e => {
            e.stopPropagation();
            toggleSaved(news.id);
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium py-1.5 rounded-md transition-colors ${
            isSaved
              ? 'bg-accent text-white border border-accent'
              : 'bg-transparent border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-accent/60'
          }`}
        >
          <Star className={`w-3 h-3 ${isSaved ? 'fill-current' : ''}`} />
          <span>Salvar</span>
        </button>

        <button
          onClick={e => {
            e.stopPropagation();
            toggleRead(news.id);
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium py-1.5 rounded-md transition-colors ${
            isRead
              ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border'
              : 'bg-transparent border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-accent/60'
          }`}
        >
          <Check className="w-3 h-3" />
          <span>Lido</span>
        </button>
      </div>
    </div>
  );
}
