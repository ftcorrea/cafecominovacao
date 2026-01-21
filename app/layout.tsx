import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI News Hub - Portal de Notícias de IA',
  description: 'Portal agregador de notícias sobre Inteligência Artificial com tradução automática',
  keywords: ['IA', 'Inteligência Artificial', 'Notícias', 'AI', 'Machine Learning'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
