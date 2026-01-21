'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles, TrendingUp } from 'lucide-react';
import NewsCard from '@/components/NewsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ThemeToggle from '@/components/ThemeToggle';
import { NewsItem } from '@/types/news';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchNews = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch('/api/news?limit=30&translate=true');
      const data = await response.json();

      if (data.success) {
        setNews(data.news);
        setLastUpdate(new Date().toLocaleTimeString('pt-BR'));
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Auto-refresh a cada 5 minutos
    const interval = setInterval(() => {
      fetchNews(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e título */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Sparkles className="w-8 h-8 text-primary-light dark:text-primary-dark" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <TrendingUp className="w-8 h-8 text-purple-500 opacity-30" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">AI News Hub</h1>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Notícias de IA em tempo real
                </p>
              </div>
            </motion.div>

            {/* Controles */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {lastUpdate && (
                <span className="hidden sm:block text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Última atualização: {lastUpdate}
                </span>
              )}

              <button
                onClick={() => fetchNews(true)}
                disabled={refreshing}
                className="p-3 rounded-full bg-primary-light dark:bg-primary-dark text-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Atualizar notícias"
              >
                <RefreshCw
                  className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`}
                />
              </button>

              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        {!loading && news.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    {news.length}
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Notícias disponíveis
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    3
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Fontes de notícias
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    5min
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Auto-atualização
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid de notícias */}
        {loading ? (
          <LoadingSpinner />
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <NewsCard key={item.id} news={item} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Nenhuma notícia encontrada.
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <p>
              © {new Date().getFullYear()} AI News Hub. Agregando as melhores
              notícias de IA.
            </p>
            <p className="mt-2">
              Fontes: TechCrunch AI, VentureBeat AI, The Verge AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
