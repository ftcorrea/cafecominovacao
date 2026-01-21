# 🚀 Como Rodar Localmente

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conexão com internet (para buscar RSS feeds)

## Passo a Passo

### 1. Clone o repositório (se ainda não tiver)

```bash
git clone https://github.com/ftcorrea/cafecominovacao.git
cd cafecominovacao
```

### 2. Ou faça pull das últimas mudanças

```bash
git pull origin claude/ai-news-saas-IJK45
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute em modo desenvolvimento

```bash
npm run dev
```

### 5. Abra no navegador

Acesse: **http://localhost:3000**

## ✨ O que você verá

### Header
- Logo "AI News Hub" com ícone animado
- Botão de refresh (atualiza notícias manualmente)
- Toggle de tema claro/escuro
- Horário da última atualização

### Dashboard
3 cards com estatísticas:
- Número de notícias disponíveis
- Número de fontes ativas (3)
- Intervalo de auto-refresh (5min)

### Grid de Notícias
Cards responsivos com:
- **Título traduzido** para português
- **Descrição traduzida** para português
- Indicador colorido da fonte (TechCrunch/VentureBeat/The Verge)
- Tempo desde publicação (ex: "2h atrás", "1d atrás")
- Hover effects suaves
- Click para abrir notícia original

### Funcionalidades Interativas

1. **Tema**: Clique no ícone lua/sol para alternar
2. **Refresh**: Clique no ícone de setas circulares
3. **Cards**: Passe mouse para efeitos, clique para abrir link
4. **Auto-update**: A cada 5 minutos atualiza automaticamente

## 🎨 Testando os Temas

### Tema Claro
- Fundo branco limpo
- Cards brancos com sombra
- Texto escuro
- Acentos azuis

### Tema Escuro
- Fundo azul marinho profundo
- Cards em tons de cinza azulado
- Texto claro
- Acentos azul claro/cyan

## 🔧 Modo Demo vs Produção

### Modo Demo (sem internet)
Se não conseguir acessar os RSS feeds, a aplicação automaticamente carrega 12 notícias mockadas para demonstração.

### Modo Produção (com internet)
Quando rodando localmente com internet, a aplicação:
- Busca RSS feeds reais
- Traduz títulos e descrições automaticamente
- Atualiza a cada 5 minutos
- Mostra notícias mais recentes primeiro

## 📱 Responsividade

Teste redimensionando a janela:
- **Mobile (< 768px)**: 1 coluna
- **Tablet (768px - 1024px)**: 2 colunas
- **Desktop (> 1024px)**: 3 colunas

## 🐛 Solução de Problemas

### Erro de porta em uso
Se a porta 3000 estiver ocupada:
```bash
# Use outra porta
PORT=3001 npm run dev
```

### Erro ao instalar dependências
```bash
# Limpe o cache
rm -rf node_modules package-lock.json
npm install
```

### Notícias não aparecem
- Verifique sua conexão com internet
- Abra o console do navegador (F12) para ver erros
- Verifique se os sites RSS estão acessíveis

## 🚀 Build para Produção

```bash
# Criar build otimizado
npm run build

# Executar build
npm start
```

## 📦 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Outras opções
- Netlify
- AWS Amplify
- Docker
- Heroku

## 💡 Dicas

1. **Performance**: A tradução pode demorar alguns segundos na primeira carga
2. **Cache**: O navegador cacheia as notícias traduzidas
3. **Limite**: API gratuita de tradução tem limite de 5000 palavras/dia
4. **Upgrade**: Para produção, considere Google Translate API ou DeepL

## 🎯 Próximos Passos

Após testar localmente, você pode:
- Customizar cores em `tailwind.config.js`
- Adicionar mais fontes RSS em `lib/feeds.ts`
- Implementar filtros e busca
- Adicionar favoritos
- Criar sistema de usuários
- Deploy em produção

---

**Qualquer dúvida, confira a documentação completa no `README_AI_NEWS.md`**
