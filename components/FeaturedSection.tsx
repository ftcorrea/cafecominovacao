'use client';

import { NewsItem } from '@/types/news';

interface FeaturedSectionProps {
  news: NewsItem[];
}

export default function FeaturedSection({ news }: FeaturedSectionProps) {
  // Selecionar as 2 notícias mais recentes como destaques
  const featured = news.slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <div className="bg-light-bg-card dark:bg-dark-bg-card border border-accent/30 rounded-lg p-4 mb-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-base">
          ☕
        </div>
        <div>
          <h2 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
            Destaques
          </h2>
          <p className="text-[11px] text-light-text-secondary dark:text-dark-text-secondary">
            Notícias mais relevantes
          </p>
        </div>
      </div>

      {/* Cards de Destaque */}
      <div className="flex gap-3">
        {featured.map(item => (
          <div
            key={item.id}
            onClick={() => window.open(item.link, '_blank')}
            className="flex-1 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-3.5 cursor-pointer hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover transition-colors"
          >
            <h3 className="text-[13px] font-medium text-light-text-primary dark:text-dark-text-primary leading-snug mb-1.5 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-[12px] text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
              {item.description.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
