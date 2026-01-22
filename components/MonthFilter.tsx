'use client';

import { useApp } from '@/lib/AppContext';
import { getAvailableMonths, formatMonth } from '@/lib/newsFilters';
import { NewsItem } from '@/types/news';

interface MonthFilterProps {
  news: NewsItem[];
}

export default function MonthFilter({ news }: MonthFilterProps) {
  const { selectedMonth, setSelectedMonth } = useApp();

  const availableMonths = getAvailableMonths(news);

  // Se não há meses disponíveis, não exibe nada
  if (availableMonths.length === 0) return null;

  // Se não há mês selecionado e há meses disponíveis, seleciona o mais recente automaticamente
  if (!selectedMonth && availableMonths.length > 0) {
    setSelectedMonth(availableMonths[0]);
  }

  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {availableMonths.map(month => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
              selectedMonth === month
                ? 'bg-accent text-white'
                : 'bg-transparent border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary hover:border-accent/60'
            }`}
          >
            {formatMonth(month)}
          </button>
        ))}
      </div>
    </div>
  );
}
