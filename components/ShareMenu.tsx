'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  articleUrl: string;
  articleTitle: string;
  onCopyLink: () => void;
}

export default function ShareMenu({ isOpen, onClose, articleUrl, articleTitle, onCopyLink }: ShareMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    onCopyLink();
    onClose();
  };

  const handleWhatsApp = () => {
    const text = `${articleTitle}\n\nLeia mais no AI News Hub:\n${articleUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
    window.open(twitterUrl, '_blank');
    onClose();
  };

  const handleLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    window.open(linkedinUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-full left-0 mb-2 bg-light-bg-card dark:bg-dark-bg-card border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1 min-w-[160px] z-50"
        >
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors text-sm text-light-text-primary dark:text-dark-text-primary"
          >
            <span className="text-base">📋</span>
            <span>Copiar link</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors text-sm text-light-text-primary dark:text-dark-text-primary"
          >
            <span className="text-base" style={{ color: '#25d366' }}>💬</span>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTwitter}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors text-sm text-light-text-primary dark:text-dark-text-primary"
          >
            <span className="text-base">𝕏</span>
            <span>X (Twitter)</span>
          </button>

          <button
            onClick={handleLinkedIn}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors text-sm text-light-text-primary dark:text-dark-text-primary"
          >
            <span className="text-base" style={{ color: '#0a66c2' }}>💼</span>
            <span>LinkedIn</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
