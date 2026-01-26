'use client';

import { useApp } from '@/lib/AppContext';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { LABELS } from '@/lib/labels';

export default function Sidebar() {
  const {
    activeSection,
    setActiveSection,
    activeLabel,
    setActiveLabel,
    savedIds,
    news,
    sidebarCollapsed,
    setSidebarCollapsed,
    isDarkMode,
    toggleTheme,
  } = useApp();

  const getLabelCount = (labelId: string) => {
    if (labelId === 'all') return news.length;
    return news.filter(n => n.labels && n.labels.includes(labelId)).length;
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

      {/* Seção de Rótulos */}
      {!sidebarCollapsed && (
        <>
          <div className="px-4 mb-2">
            <h3 className="text-[11px] font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide px-3">
              Rótulos
            </h3>
          </div>

          <nav className="px-4 space-y-0.5 flex-1 overflow-y-auto">
            {LABELS.map(label => (
              <button
                key={label.id}
                onClick={() => {
                  setActiveLabel(label.id);
                  setActiveSection('feed');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors ${
                  activeLabel === label.id
                    ? 'bg-accent/20 text-accent'
                    : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-card-hover dark:hover:bg-dark-bg-card-hover'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {label.icon ? (
                    <span className="text-sm">{label.icon}</span>
                  ) : (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: label.color }}
                    />
                  )}
                  <span>{label.name}</span>
                </div>
                <span className="text-[11px] opacity-60">{getLabelCount(label.id)}</span>
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
