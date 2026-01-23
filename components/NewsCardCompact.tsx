'use client';

import { NewsItem } from '@/types/news';
import { useApp } from '@/lib/AppContext';
import { useState } from 'react';
import ShareMenu from './ShareMenu';
import Toast from './Toast';

interface NewsCardCompactProps {
  news: NewsItem;
  featured?: boolean;
}

export default function NewsCardCompact({ news, featured = false }: NewsCardCompactProps) {
  const { savedIds, readIds, likedIds, toggleSaved, toggleRead, toggleLiked } = useApp();
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const isSaved = savedIds.has(news.id);
  const isRead = readIds.has(news.id);
  const isLiked = likedIds.has(news.id);

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

      {/* Barra de Ações Compacta */}
      <div className="flex items-center gap-1 pt-2.5 mt-2.5 border-t border-light-border dark:border-dark-border">
        {/* Ação 1: Curtir */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleLiked(news.id);
          }}
          className="group/action relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary active:scale-95"
          aria-label={isLiked ? 'Remover curtida' : 'Curti isso'}
        >
          <span className={`text-lg transition-colors ${isLiked ? 'text-[#f43f5e]' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
            {isLiked ? '♥' : '♡'}
          </span>
          {/* Tooltip */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-dark-text-primary dark:bg-light-text-primary text-light-bg-primary dark:text-dark-bg-primary text-[11px] rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/action:opacity-100 transition-opacity duration-150 hidden md:block">
            {isLiked ? 'Remover curtida' : 'Curti isso'}
          </span>
        </button>

        {/* Ação 2: Salvar */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleSaved(news.id);
          }}
          className="group/action relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary active:scale-95"
          aria-label={isSaved ? 'Remover dos salvos' : 'Salvar para depois'}
        >
          <span className={`text-lg transition-colors ${isSaved ? 'text-[#eab308]' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
            {isSaved ? '⭐' : '☆'}
          </span>
          {/* Tooltip */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-dark-text-primary dark:bg-light-text-primary text-light-bg-primary dark:text-dark-bg-primary text-[11px] rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/action:opacity-100 transition-opacity duration-150 hidden md:block">
            {isSaved ? 'Remover dos salvos' : 'Salvar para depois'}
          </span>
        </button>

        {/* Ação 3: Marcar como Lido */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleRead(news.id);
          }}
          className="group/action relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary active:scale-95"
          aria-label={isRead ? 'Marcar como não lido' : 'Marcar como lido'}
        >
          <span className={`text-lg transition-colors ${isRead ? 'text-accent' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
            {isRead ? '✓' : '○'}
          </span>
          {/* Tooltip */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-dark-text-primary dark:bg-light-text-primary text-light-bg-primary dark:text-dark-bg-primary text-[11px] rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/action:opacity-100 transition-opacity duration-150 hidden md:block">
            {isRead ? 'Marcar como não lido' : 'Marcar como lido'}
          </span>
        </button>

        {/* Ação 4: Compartilhar */}
        <div className="relative">
          <button
            onClick={e => {
              e.stopPropagation();
              setShareMenuOpen(!shareMenuOpen);
            }}
            className="group/action relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary active:scale-95"
            aria-label="Compartilhar"
          >
            <span className="text-lg text-light-text-secondary dark:text-dark-text-secondary group-hover/action:text-accent transition-colors">
              ↗
            </span>
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-dark-text-primary dark:bg-light-text-primary text-light-bg-primary dark:text-dark-bg-primary text-[11px] rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/action:opacity-100 transition-opacity duration-150 hidden md:block">
              Compartilhar
            </span>
          </button>

          {/* Menu de Compartilhamento */}
          <ShareMenu
            isOpen={shareMenuOpen}
            onClose={() => setShareMenuOpen(false)}
            articleUrl={news.link}
            articleTitle={news.title}
            onCopyLink={() => setToastVisible(true)}
          />
        </div>
      </div>

      {/* Toast de Confirmação */}
      <Toast
        message="Link copiado!"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
