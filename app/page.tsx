'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import Sidebar from '@/components/Sidebar';
import NewsCardCompact from '@/components/NewsCardCompact';
import FeaturedSection from '@/components/FeaturedSection';

export default function Home() {
  const {
    news,
    setNews,
    savedIds,
    readIds,
    activeSection,
    activeSource,
    searchQuery,
    setSearchQuery,
    sidebarCollapsed,
  } = useApp();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchNews = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch('/api/news?limit=50&translate=true');
      const data = await response.json();

      if (data.success) {
        setNews(data.news);
        setLastUpdate(new Date());
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

    // Auto-refresh a cada 10 minutos
    const interval = setInterval(() => {
      fetchNews(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Filtrar notícias baseado na seção, fonte e busca
  const filteredNews = useMemo(() => {
    let filtered = [...news];

    // Filtro por seção
    if (activeSection === 'saved') {
      filtered = filtered.filter(n => savedIds.has(n.id));
    } else if (activeSection === 'read') {
      filtered = filtered.filter(n => readIds.has(n.id));
    }

    // Filtro por fonte
    if (activeSource !== 'all') {
      filtered = filtered.filter(n => n.source === activeSource);
    }

    // Filtro por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        n =>
          n.title.toLowerCase().includes(query) ||
          n.titleOriginal.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [news, activeSection, activeSource, savedIds, readIds, searchQuery]);

  const getPageTitle = () => {
    if (activeSection === 'saved') return 'Artigos Salvos';
    if (activeSection === 'read') return 'Histórico de Leitura';
    if (activeSource !== 'all') {
      const sourceNames: Record<string, string> = {
        'TechCrunch AI': 'TechCrunch',
        'The Verge AI': 'The Verge',
        'NVIDIA Blog': 'NVIDIA Blog',
        'OpenAI': 'OpenAI',
        'Google DeepMind': 'Google AI',
        'Meta Research': 'Meta Research',
      };
      return sourceNames[activeSource] || activeSource;
    }
    return 'Todas as Notícias';
  };

  const getLastUpdateText = () => {
    if (!lastUpdate) return '';

    const diff = Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000 / 60);

    if (diff < 1) return 'Atualizado agora';
    if (diff < 60) return `Atualizado há ${diff} min`;
    const hours = Math.floor(diff / 60);
    return `Atualizado há ${hours}h`;
  };

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary">
      <Sidebar />

      {/* Área Principal */}
      <main
        className={`transition-all duration-200 ${
          sidebarCollapsed ? 'ml-[60px]' : 'ml-[220px]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[22px] font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                {getPageTitle()}
              </h1>
              <p className="text-[13px] text-light-text-secondary dark:text-dark-text-secondary">
                {filteredNews.length} notícias • {getLastUpdateText()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Campo de Busca */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-[260px] pl-10 pr-4 py-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg text-sm text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Botão Refresh */}
              <button
                onClick={() => fetchNews(true)}
                disabled={refreshing}
                className="p-2.5 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg hover:border-accent/60 transition-colors disabled:opacity-50"
                aria-label="Atualizar notícias"
              >
                <RefreshCw
                  className={`w-4 h-4 text-light-text-primary dark:text-dark-text-primary ${
                    refreshing ? 'animate-spin' : ''
                  }`}
                />
              </button>
            </div>
          </header>

          {/* Seção de Destaques (apenas no feed principal) */}
          {activeSection === 'feed' && activeSource === 'all' && !searchQuery && (
            <FeaturedSection news={filteredNews} />
          )}

          {/* Grid de Notícias */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 text-accent animate-spin mx-auto mb-3" />
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Carregando notícias...
                </p>
              </div>
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredNews.map((item, index) => (
                <NewsCardCompact
                  key={item.id}
                  news={item}
                  featured={
                    activeSection === 'feed' &&
                    activeSource === 'all' &&
                    !searchQuery &&
                    index < 2
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">📭</div>
              <h3 className="text-base font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Nenhuma notícia encontrada
              </h3>
              <p className="text-[13px] text-light-text-secondary dark:text-dark-text-secondary">
                {activeSection === 'saved'
                  ? 'Você ainda não salvou nenhum artigo.'
                  : activeSection === 'read'
                  ? 'Você ainda não marcou nenhum artigo como lido.'
                  : 'Tente ajustar seus filtros ou busca.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
