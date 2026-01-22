'use client';

import { useApp } from '@/lib/AppContext';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';

const SOURCES = [
  { id: 'all', name: 'Todas as Fontes', icon: '📡', color: null },
  { id: 'TechCrunch AI', name: 'TechCrunch', icon: '🟢', color: 'sources-techcrunch' },
  { id: 'The Verge AI', name: 'The Verge', icon: '🟠', color: 'sources-verge' },
  { id: 'NVIDIA Blog', name: 'NVIDIA Blog', icon: '🟢', color: 'sources-nvidia' },
  { id: 'OpenAI', name: 'OpenAI', icon: '🟢', color: 'sources-openai' },
  { id: 'Google DeepMind', name: 'Google AI', icon: '🔵', color: 'sources-google' },
  { id: 'Meta Research', name: 'Meta Research', icon: '🔵', color: 'sources-meta' },
];

export default function Sidebar() {
  const {
    activeSection,
    setActiveSection,
    activeSource,
    setActiveSource,
    savedIds,
    readIds,
    news,
    sidebarCollapsed,
    setSidebarCollapsed,
    isDarkMode,
    toggleTheme,
  } = useApp();

  const getSourceCount = (sourceId: string) => {
    if (sourceId === 'all') return news.length;
    return news.filter(n => n.source === sourceId).length;
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-light-bg-secondary dark:bg-dark-bg-secondary border-r border-light-border dark:border-dark-border transition-all duration-200 flex flex-col ${
        sidebarCollapsed ? 'w-[60px]' : 'w-[220px]'
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-lg flex-shrink-0">
            ⚡
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-[15px] text-light-text-primary dark:text-dark-text-primary">
              AI News Hub
            </span>
          )}
        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="p-4 space-y-1">
        <button
          onClick={() => setActiveSection('feed')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeSection === 'feed'
              ? 'bg-accent/20 text-accent'
              : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover'
          } ${sidebarCollapsed ? 'justify-center' : ''}`}
        >
          <span className="text-base">📰</span>
          {!sidebarCollapsed && <span>Meu Feed</span>}
        </button>

        <button
          onClick={() => setActiveSection('saved')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeSection === 'saved'
              ? 'bg-accent/20 text-accent'
              : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover'
          } ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
        >
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? '' : ''}`}>
            <span className="text-base">⭐</span>
            {!sidebarCollapsed && <span>Salvos</span>}
          </div>
          {!sidebarCollapsed && savedIds.size > 0 && (
            <span className="text-[11px] font-medium bg-accent text-white px-1.5 py-0.5 rounded-full">
              {savedIds.size}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSection('read')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeSection === 'read'
              ? 'bg-accent/20 text-accent'
              : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover'
          } ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
        >
          <div className={`flex items-center gap-3`}>
            <span className="text-base">✓</span>
            {!sidebarCollapsed && <span>Lidos</span>}
          </div>
          {!sidebarCollapsed && readIds.size > 0 && (
            <span className="text-[11px] font-medium bg-accent text-white px-1.5 py-0.5 rounded-full">
              {readIds.size}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSection('archive')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            activeSection === 'archive'
              ? 'bg-accent/20 text-accent'
              : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover'
          } ${sidebarCollapsed ? 'justify-center' : ''}`}
        >
          <span className="text-base">📅</span>
          {!sidebarCollapsed && <span>Anteriores</span>}
        </button>
      </nav>

      {/* Divisor */}
      <div className="mx-4 h-px bg-light-border dark:border-dark-border my-3" />

      {/* Seção de Fontes */}
      {!sidebarCollapsed && (
        <>
          <div className="px-4 mb-2">
            <h3 className="text-[11px] font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide px-3">
              Fontes
            </h3>
          </div>

          <nav className="px-4 space-y-0.5 flex-1 overflow-y-auto">
            {SOURCES.map(source => (
              <button
                key={source.id}
                onClick={() => {
                  setActiveSource(source.id);
                  setActiveSection('feed');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors ${
                  activeSource === source.id
                    ? 'bg-accent/20 text-accent'
                    : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {source.color ? (
                    <div
                      className={`w-2 h-2 rounded-full`}
                      style={{
                        backgroundColor:
                          source.color === 'sources-techcrunch'
                            ? '#00aa00'
                            : source.color === 'sources-verge'
                            ? '#fa4b2a'
                            : source.color === 'sources-nvidia'
                            ? '#76b900'
                            : source.color === 'sources-openai'
                            ? '#10a37f'
                            : source.color === 'sources-anthropic'
                            ? '#d4a574'
                            : source.color === 'sources-google'
                            ? '#4285f4'
                            : source.color === 'sources-meta'
                            ? '#0668E1'
                            : '#6366f1',
                      }}
                    />
                  ) : (
                    <span className="text-sm">{source.icon}</span>
                  )}
                  <span>{source.name}</span>
                </div>
                <span className="text-[11px] opacity-60">{getSourceCount(source.id)}</span>
              </button>
            ))}
          </nav>
        </>
      )}

      {/* Rodapé */}
      <div className="mt-auto p-4 border-t border-light-border dark:border-dark-border space-y-1">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 mx-auto" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Recolher</span>
            </>
          )}
        </button>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover transition-colors"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4" />
              {!sidebarCollapsed && <span>Modo Claro</span>}
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              {!sidebarCollapsed && <span>Modo Escuro</span>}
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
