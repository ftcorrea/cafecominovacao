# 🎨 Preview Visual - AI News Hub

## 🖥️ Interface Criada

### 📱 Layout Geral

```
┌─────────────────────────────────────────────────────────────┐
│  AI News Hub ✨           [Última atualização] 🔄 🌙       │ ← Header fixo
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [30 Notícias]  [3 Fontes]  [Auto 5min]  ← Estatísticas     │
│                                                               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │ • TC      │  │ • VB      │  │ • TV      │               │
│  │ 2h atrás  │  │ 5h atrás  │  │ 8h atrás  │  ← Grid 3 cols│
│  │           │  │           │  │           │               │
│  │ OpenAI    │  │ DeepMind  │  │ Apple     │               │
│  │ anuncia   │  │ prevê     │  │ chip M4   │               │
│  │ GPT-5...  │  │ proteínas │  │ neural... │               │
│  │           │  │ com 99%.. │  │           │               │
│  │ Descrição │  │ Descrição │  │ Descrição │               │
│  │ traduzida │  │ traduzida │  │ traduzida │               │
│  │ português │  │ português │  │ português │               │
│  │           │  │           │  │           │               │
│  │  📰 Ler   │  │  📰 Ler   │  │  📰 Ler   │               │
│  └───────────┘  └───────────┘  └───────────┘               │
│                                                               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │ • TC      │  │ • VB      │  │ • TV      │               │
│  │ 1d atrás  │  │ 1d atrás  │  │ 2d atrás  │               │
│  │ ...mais notícias...                      │               │
│  └───────────┘  └───────────┘  └───────────┘               │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  © 2026 AI News Hub                                          │ ← Footer
│  Fontes: TechCrunch AI, VentureBeat AI, The Verge AI        │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Paleta de Cores

### Tema Claro ☀️
```
Background: #ffffff (branco puro)
Surface:    #f8fafc (cinza muito claro)
Cards:      #ffffff (branco com sombra)
Primary:    #3b82f6 (azul vibrante)
Text:       #0f172a (cinza escuro)
Secondary:  #64748b (cinza médio)

Acentos:
- TechCrunch: #0ACF83 (verde)
- VentureBeat: #FF6B6B (vermelho)
- The Verge:   #FA26A0 (rosa)
```

### Tema Escuro 🌙
```
Background: #0f172a (azul marinho escuro)
Surface:    #1e293b (azul médio escuro)
Cards:      #334155 (cinza azulado)
Primary:    #60a5fa (azul claro)
Text:       #f1f5f9 (branco suave)
Secondary:  #cbd5e1 (cinza claro)

Mesmos acentos de fonte
```

## ✨ Animações Implementadas

### 1. Cards (Entrada Sequencial)
```
Card 1: aparece em 0.0s
Card 2: aparece em 0.1s
Card 3: aparece em 0.2s
Card 4: aparece em 0.3s
...
Efeito: fade-in + slide-up
```

### 2. Hover nos Cards
```
• Scale: 1.0 → 1.02
• Shadow: lg → 2xl
• Transform: translateY(0) → translateY(-4px)
• Duração: 300ms
• Shimmer effect atravessa o card
```

### 3. Loading Spinner
```
○ Anel externo rotacionando
○ 3 bolinhas pulando (delay sequencial)
○ Texto "Carregando notícias de IA..."
```

### 4. Transição de Tema
```
• Duração: 300ms
• Todas as cores transitam suavemente
• Toggle anima de lua → sol
```

## 📐 Responsividade

### Mobile (< 768px)
```
┌────────────┐
│   Header   │
├────────────┤
│ Estat. (1) │
│ Estat. (2) │
│ Estat. (3) │
├────────────┤
│  Card 1    │
│  (100%)    │
├────────────┤
│  Card 2    │
│  (100%)    │
└────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────────────┐
│       Header        │
├─────────────────────┤
│ Estat.1 │ Estat.2 │ Estat.3 │
├─────────────────────┤
│ Card 1  │  Card 2  │
│ (50%)   │  (50%)   │
├─────────────────────┤
│ Card 3  │  Card 4  │
└─────────────────────┘
```

### Desktop (> 1024px)
```
┌────────────────────────────────┐
│           Header               │
├────────────────────────────────┤
│ Estat.1 │ Estat.2 │ Estat.3   │
├────────────────────────────────┤
│ Card 1 │ Card 2 │ Card 3      │
│ (33%)  │ (33%)  │ (33%)       │
├────────────────────────────────┤
│ Card 4 │ Card 5 │ Card 6      │
└────────────────────────────────┘
```

## 🎯 Componentes Interativos

### 1. NewsCard
```typescript
Estrutura:
┌─────────────────────┐
│ 🟢 TechCrunch  2h   │ ← Header (fonte + tempo)
├─────────────────────┤
│ Título traduzido    │ ← Título em PT (2 linhas)
│ em português...     │
├─────────────────────┤
│ Descrição traduzida │ ← Descrição (3 linhas)
│ explicando o conte- │
│ údo da notícia...   │
├─────────────────────┤
│ Original   →        │ ← Link para fonte
└─────────────────────┘

Estados:
• Normal: branco/cinza
• Hover: levanta + sombra
• Click: abre link externo
```

### 2. ThemeToggle
```typescript
Estado Claro: 🌙 (ícone lua cinza)
Estado Escuro: ☀️ (ícone sol amarelo)

Click: toggle + salva em localStorage
Animação: fade + rotate
```

### 3. Header
```typescript
┌─────────────────────────────────────┐
│ ✨ AI News Hub    [15:30] 🔄 🌙    │
│    Notícias IA                      │
└─────────────────────────────────────┘

Elementos:
• Logo animado (rotação lenta)
• Última atualização
• Botão refresh (roda ao clicar)
• Toggle tema
```

## 📊 Fluxo de Dados

```
┌─────────────┐
│   Browser   │
│  (Cliente)  │
└──────┬──────┘
       │ GET /
       ↓
┌──────────────┐
│   page.tsx   │ ← Página principal
│  (Frontend)  │
└──────┬───────┘
       │ fetch('/api/news')
       ↓
┌──────────────────┐
│ /api/news/route  │ ← API Route
│   (Backend)      │
└────┬──────┬──────┘
     │      │
     ↓      ↓
[RSS]   [Mock Data] ← Fallback
     │
     ↓
[Tradução PT]
     │
     ↓
[JSON Response]
     │
     ↓
┌──────────────┐
│  NewsCard[]  │ ← Renderiza grid
└──────────────┘
```

## 🎬 Experiência do Usuário

### Primeira Visita
1. Página carrega com loading spinner
2. API busca notícias (2-5s)
3. Cards aparecem sequencialmente
4. Animações suaves de entrada
5. Tema detecta preferência do sistema

### Interações
1. **Hover Card**: levanta com sombra
2. **Click Card**: abre notícia em nova aba
3. **Toggle Tema**: transição suave de cores
4. **Refresh**: spinner + recarrega notícias
5. **Auto-refresh**: a cada 5min silenciosamente

### Responsividade
1. Mobile: scroll vertical simples
2. Tablet: 2 colunas balanceadas
3. Desktop: 3 colunas + espaçamento

## 🚀 Performance

- **First Load**: ~120 KB JS
- **Images**: Nenhuma (usa SVG icons)
- **Fonts**: System fonts (sem download)
- **CSS**: Tailwind otimizado
- **Build**: Otimizado pelo Next.js

## 📝 Acessibilidade

✅ Labels ARIA em botões
✅ Contraste adequado (WCAG AA)
✅ Navegação por teclado
✅ Links semânticos
✅ HTML semântico
✅ Lang="pt-BR"

## 🎨 Design System

### Espaçamento
- Padding: 4px, 8px, 12px, 16px, 24px
- Gap: 12px, 16px, 24px
- Margin: 16px, 20px, 32px

### Tipografia
- H1: 24px bold (Logo)
- H3: 18px bold (Card titles)
- Body: 14px regular
- Small: 12px (metadata)

### Shadows
- sm: subtle
- lg: normal
- xl: hover
- 2xl: active

### Radius
- sm: 8px
- md: 12px
- lg: 16px
- full: 9999px (buttons)

---

**Este é o design completo do seu portal de notícias de IA! 🎉**
