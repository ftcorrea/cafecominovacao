# 🤖 AI News Hub

Portal SAAS para agregação e tradução automática de notícias sobre Inteligência Artificial.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Funcionalidades

- 📰 **Agregação de Notícias**: Consolida notícias de múltiplas fontes (TechCrunch, VentureBeat, The Verge)
- 🌐 **Tradução Automática**: Traduz automaticamente notícias de inglês para português
- 🎨 **Tema Claro/Escuro**: Interface adaptável com cores dinâmicas
- ⚡ **Atualização em Tempo Real**: Auto-refresh a cada 5 minutos
- 🎭 **Animações Suaves**: Efeitos visuais modernos usando Framer Motion
- 📱 **Design Responsivo**: Otimizado para desktop, tablet e mobile
- 🔗 **Link para Fonte Original**: Redirecionamento para notícia completa

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **RSS Parser**: rss-parser
- **Tradução**: MyMemory Translation API (gratuita)
- **Ícones**: Lucide React

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000)

## 🏗️ Estrutura do Projeto

```
ai-news-saas/
├── app/
│   ├── api/
│   │   └── news/
│   │       └── route.ts        # API endpoint para buscar notícias
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página inicial
│   └── globals.css             # Estilos globais
├── components/
│   ├── NewsCard.tsx            # Card de notícia individual
│   ├── LoadingSpinner.tsx      # Indicador de carregamento
│   └── ThemeToggle.tsx         # Toggle de tema claro/escuro
├── lib/
│   ├── feeds.ts                # Configuração dos RSS feeds
│   └── translator.ts           # Lógica de tradução
├── types/
│   └── news.ts                 # Tipos TypeScript
└── public/                     # Arquivos estáticos
```

## 🎨 Características de UX/UI

### Design System
- **Cores**: Sistema de cores adaptável para temas claro e escuro
- **Tipografia**: Inter font family para legibilidade
- **Espaçamento**: Sistema consistente baseado em múltiplos de 4px
- **Sombras**: Elevação progressiva para hierarquia visual

### Animações
- Fade in ao carregar cards
- Stagger animation nos cards (delay progressivo)
- Hover effects com scale e shadow
- Loading spinner animado
- Shimmer effect nos cards
- Transições suaves entre temas

### Responsividade
- Mobile-first approach
- Grid adaptativo (1 coluna mobile → 2 tablet → 3 desktop)
- Menu responsivo
- Touch-friendly buttons

## 🔧 Configuração

### Fontes RSS Configuradas

- **TechCrunch AI**: https://techcrunch.com/category/artificial-intelligence/feed/
- **VentureBeat AI**: https://venturebeat.com/category/ai/feed/
- **The Verge AI**: https://www.theverge.com/rss/ai-artificial-intelligence/index.xml

### Customização

Para adicionar novas fontes, edite `lib/feeds.ts`:

```typescript
export const RSS_FEEDS: RSSFeed[] = [
  {
    name: 'Nome da Fonte',
    url: 'https://exemplo.com/feed.xml',
    color: '#HEX_COLOR',
  },
  // ...
];
```

## 🌐 API de Tradução

Atualmente usa a API gratuita MyMemory (limite: 5000 palavras/dia).

Para produção, considere migrar para:
- Google Cloud Translation API
- DeepL API
- Microsoft Translator API

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Outras Plataformas
- **Netlify**: Suporte nativo para Next.js
- **AWS Amplify**: Deploy automático via Git
- **Docker**: Dockerfile incluído para containerização

## 📈 Melhorias Futuras

- [ ] Sistema de favoritos
- [ ] Filtros por categoria/fonte
- [ ] Busca de notícias
- [ ] Notificações push
- [ ] Cache de notícias
- [ ] API de tradução premium
- [ ] Sistema de usuários
- [ ] Newsletter
- [ ] PWA support

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

MIT License - sinta-se livre para usar este projeto.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando Claude Code
