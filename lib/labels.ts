import { Label } from '@/types/news';

export const LABELS: Label[] = [
  {
    id: 'all',
    name: 'Todos os Rótulos',
    color: '#6366f1',
    icon: '🏷️',
  },
  {
    id: 'OpenAI',
    name: 'OpenAI',
    color: '#10a37f',
  },
  {
    id: 'Anthropic',
    name: 'Anthropic',
    color: '#d4a574',
  },
  {
    id: 'Google',
    name: 'Google',
    color: '#4285f4',
  },
  {
    id: 'Meta',
    name: 'Meta',
    color: '#0668e1',
  },
  {
    id: 'Microsoft',
    name: 'Microsoft',
    color: '#00a4ef',
  },
  {
    id: 'NVIDIA',
    name: 'NVIDIA',
    color: '#76b900',
  },
  {
    id: 'Regulamentação',
    name: 'Regulamentação',
    color: '#ef4444',
  },
  {
    id: 'Startups',
    name: 'Startups',
    color: '#f59e0b',
  },
];

// Tags de tipo de conteúdo
export const CONTENT_TAGS = [
  'Lançamento',
  'Atualização',
  'Aquisição',
  'Regulamentação',
  'Tutorial',
  'Opinião',
  'Pesquisa',
] as const;

export type ContentTag = typeof CONTENT_TAGS[number];
