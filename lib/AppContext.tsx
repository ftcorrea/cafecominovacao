'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsItem } from '@/types/news';

interface AppContextType {
  // Estado de notícias
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;

  // Salvos, lidos e curtidos
  savedIds: Set<string>;
  readIds: Set<string>;
  likedIds: Set<string>;
  toggleSaved: (id: string) => void;
  toggleRead: (id: string) => void;
  toggleLiked: (id: string) => void;

  // Filtros
  activeSection: 'feed' | 'saved' | 'archive';
  setActiveSection: (section: 'feed' | 'saved' | 'archive') => void;
  activeLabel: string;
  setActiveLabel: (label: string) => void;

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
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<'feed' | 'saved' | 'archive'>('feed');
  const [activeLabel, setActiveLabel] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Carregar dados do localStorage no mount
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    const read = localStorage.getItem('readArticles');
    const liked = localStorage.getItem('likedArticles');
    const theme = localStorage.getItem('theme');

    if (saved) setSavedIds(new Set(JSON.parse(saved)));
    if (read) setReadIds(new Set(JSON.parse(read)));
    if (liked) setLikedIds(new Set(JSON.parse(liked)));
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

  const toggleLiked = (id: string) => {
    setLikedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      localStorage.setItem('likedArticles', JSON.stringify(Array.from(newSet)));
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
        likedIds,
        toggleSaved,
        toggleRead,
        toggleLiked,
        activeSection,
        setActiveSection,
        activeLabel,
        setActiveLabel,
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
