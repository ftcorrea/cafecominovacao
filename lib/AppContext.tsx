'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsItem } from '@/types/news';

interface AppContextType {
  // Estado de notícias
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;

  // Salvos e lidos
  savedIds: Set<string>;
  readIds: Set<string>;
  toggleSaved: (id: string) => void;
  toggleRead: (id: string) => void;

  // Filtros
  activeSection: 'feed' | 'saved' | 'read' | 'archive';
  setActiveSection: (section: 'feed' | 'saved' | 'read' | 'archive') => void;
  activeSource: string;
  setActiveSource: (source: string) => void;

  // Filtro de mês (para seção Anteriores)
  selectedMonth: string | null; // formato: "2026-01"
  setSelectedMonth: (month: string | null) => void;

  // Busca
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Tema
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<'feed' | 'saved' | 'read' | 'archive'>('feed');
  const [activeSource, setActiveSource] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Carregar dados do localStorage no mount
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    const read = localStorage.getItem('readArticles');
    const theme = localStorage.getItem('theme');

    if (saved) setSavedIds(new Set(JSON.parse(saved)));
    if (read) setReadIds(new Set(JSON.parse(read)));
    if (theme) setIsDarkMode(theme === 'dark');

    // Aplicar tema inicial
    if (theme === 'dark' || !theme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleSaved = (id: string) => {
    setSavedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      localStorage.setItem('savedArticles', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const toggleRead = (id: string) => {
    setReadIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      localStorage.setItem('readArticles', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  };

  return (
    <AppContext.Provider
      value={{
        news,
        setNews,
        savedIds,
        readIds,
        toggleSaved,
        toggleRead,
        activeSection,
        setActiveSection,
        activeSource,
        setActiveSource,
        selectedMonth,
        setSelectedMonth,
        searchQuery,
        setSearchQuery,
        sidebarCollapsed,
        setSidebarCollapsed,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
