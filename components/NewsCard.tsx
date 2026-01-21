'use client';

import { NewsItem } from '@/types/news';
import { ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsCardProps {
  news: NewsItem;
  index: number;
}

export default function NewsCard({ news, index }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Agora mesmo';
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      'TechCrunch AI': 'bg-green-500',
      'VentureBeat AI': 'bg-red-500',
      'The Verge AI': 'bg-pink-500',
      'Google DeepMind': 'bg-blue-500',
      'OpenAI': 'bg-emerald-500',
      'NVIDIA Blog': 'bg-lime-500',
      'Meta Research': 'bg-sky-500',
    };
    return colors[source] || 'bg-purple-500';
  };

  return (
    <motion.a
      href={news.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group block bg-card-light dark:bg-card-dark rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      <div className="p-6">
        {/* Header com fonte e data */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getSourceColor(news.source)}`} />
            <span className="text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark">
              {news.source}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <Clock className="w-3 h-3" />
            <span>{formatDate(news.pubDate)}</span>
          </div>
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold mb-3 text-text-primary-light dark:text-text-primary-dark line-clamp-2 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
          {news.title}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-3 mb-4">
          {news.description}
        </p>

        {/* Footer com link */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark italic">
            Clique para ler original
          </span>
          <ExternalLink className="w-4 h-4 text-primary-light dark:text-primary-dark group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </motion.a>
  );
}
