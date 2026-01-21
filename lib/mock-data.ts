import { NewsItem } from '@/types/news';

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'techcrunch-1',
    title: 'OpenAI anuncia novo modelo GPT-5 com capacidades revolucionárias',
    titleOriginal: 'OpenAI announces new GPT-5 model with revolutionary capabilities',
    description: 'A OpenAI revelou hoje seu mais novo modelo de linguagem, GPT-5, prometendo avanços significativos em raciocínio, matemática e compreensão contextual de longo prazo.',
    descriptionOriginal: 'OpenAI revealed today its newest language model, GPT-5, promising significant advances in reasoning, mathematics and long-term contextual understanding.',
    link: 'https://techcrunch.com/2026/01/21/openai-gpt5-announcement',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
    source: 'TechCrunch AI',
  },
  {
    id: 'venturebeat-1',
    title: 'Google DeepMind desenvolve IA que pode prever estruturas de proteínas com 99% de precisão',
    titleOriginal: 'Google DeepMind develops AI that can predict protein structures with 99% accuracy',
    description: 'Pesquisadores do Google DeepMind criaram um novo sistema de IA que prevê estruturas de proteínas com precisão sem precedentes, potencialmente acelerando a descoberta de medicamentos.',
    descriptionOriginal: 'Researchers at Google DeepMind have created a new AI system that predicts protein structures with unprecedented accuracy, potentially accelerating drug discovery.',
    link: 'https://venturebeat.com/ai/deepmind-protein-prediction',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 horas atrás
    source: 'VentureBeat AI',
  },
  {
    id: 'theverge-1',
    title: 'Apple revela chip neural M4 para alimentar recursos de IA em dispositivos',
    titleOriginal: 'Apple reveals M4 neural chip to power AI features on devices',
    description: 'A Apple apresentou seu novo chip M4 com motor neural dedicado, permitindo processamento de IA no dispositivo para privacidade aprimorada e desempenho mais rápido.',
    descriptionOriginal: 'Apple unveiled its new M4 chip with dedicated neural engine, enabling on-device AI processing for enhanced privacy and faster performance.',
    link: 'https://www.theverge.com/2026/1/21/apple-m4-neural-chip',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 horas atrás
    source: 'The Verge AI',
  },
  {
    id: 'techcrunch-2',
    title: 'Startup de IA levanta $500M para revolucionar educação personalizada',
    titleOriginal: 'AI startup raises $500M to revolutionize personalized education',
    description: 'Uma startup focada em educação com IA garantiu $500 milhões em financiamento para desenvolver tutores virtuais adaptativos que se ajustam ao estilo de aprendizado de cada aluno.',
    descriptionOriginal: 'An AI-focused education startup has secured $500 million in funding to develop adaptive virtual tutors that adjust to each student\'s learning style.',
    link: 'https://techcrunch.com/2026/01/20/ai-education-funding',
    pubDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
    source: 'TechCrunch AI',
  },
  {
    id: 'venturebeat-2',
    title: 'Meta lança ferramenta de IA para detectar deepfakes em tempo real',
    titleOriginal: 'Meta launches AI tool to detect deepfakes in real-time',
    description: 'A Meta anunciou uma nova ferramenta de IA capaz de detectar vídeos deepfake em tempo real, ajudando a combater desinformação nas redes sociais.',
    descriptionOriginal: 'Meta announced a new AI tool capable of detecting deepfake videos in real-time, helping combat misinformation on social media.',
    link: 'https://venturebeat.com/ai/meta-deepfake-detection',
    pubDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
    source: 'VentureBeat AI',
  },
  {
    id: 'theverge-2',
    title: 'Microsoft integra IA avançada ao Office 365 para automação de tarefas',
    titleOriginal: 'Microsoft integrates advanced AI into Office 365 for task automation',
    description: 'A Microsoft revelou novos recursos de IA no Office 365 que podem automatizar tarefas repetitivas, escrever emails e criar apresentações com comandos simples.',
    descriptionOriginal: 'Microsoft revealed new AI features in Office 365 that can automate repetitive tasks, write emails, and create presentations with simple commands.',
    link: 'https://www.theverge.com/2026/1/20/microsoft-office-ai',
    pubDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    source: 'The Verge AI',
  },
  {
    id: 'techcrunch-3',
    title: 'Pesquisadores criam IA que pode diagnosticar doenças raras com precisão superior a médicos',
    titleOriginal: 'Researchers create AI that can diagnose rare diseases more accurately than doctors',
    description: 'Um novo sistema de IA desenvolvido por pesquisadores consegue diagnosticar doenças raras com 95% de precisão, superando médicos especialistas em testes cegos.',
    descriptionOriginal: 'A new AI system developed by researchers can diagnose rare diseases with 95% accuracy, outperforming specialist doctors in blind tests.',
    link: 'https://techcrunch.com/2026/01/19/ai-rare-disease-diagnosis',
    pubDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    source: 'TechCrunch AI',
  },
  {
    id: 'venturebeat-3',
    title: 'Amazon anuncia robôs com IA para centros de distribuição',
    titleOriginal: 'Amazon announces AI-powered robots for distribution centers',
    description: 'A Amazon revelou uma nova geração de robôs equipados com IA que podem trabalhar lado a lado com humanos, aumentando a eficiência em 40%.',
    descriptionOriginal: 'Amazon revealed a new generation of AI-equipped robots that can work alongside humans, increasing efficiency by 40%.',
    link: 'https://venturebeat.com/ai/amazon-warehouse-robots',
    pubDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
    source: 'VentureBeat AI',
  },
  {
    id: 'theverge-3',
    title: 'Tesla demonstra novo sistema de direção autônoma totalmente baseado em IA',
    titleOriginal: 'Tesla demonstrates new fully AI-based autonomous driving system',
    description: 'A Tesla mostrou seu sistema de direção autônoma de próxima geração, que não depende de mapas HD e usa apenas câmeras e IA para navegação.',
    descriptionOriginal: 'Tesla showed its next-generation autonomous driving system, which doesn\'t rely on HD maps and uses only cameras and AI for navigation.',
    link: 'https://www.theverge.com/2026/1/18/tesla-autonomous-driving',
    pubDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
    source: 'The Verge AI',
  },
  {
    id: 'techcrunch-4',
    title: 'Nvidia apresenta nova arquitetura de GPU otimizada para treinamento de IA',
    titleOriginal: 'Nvidia presents new GPU architecture optimized for AI training',
    description: 'A Nvidia anunciou sua nova arquitetura de GPU que promete treinar modelos de IA 10x mais rápido com 50% menos consumo de energia.',
    descriptionOriginal: 'Nvidia announced its new GPU architecture that promises to train AI models 10x faster with 50% less power consumption.',
    link: 'https://techcrunch.com/2026/01/17/nvidia-new-gpu-architecture',
    pubDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 dias atrás
    source: 'TechCrunch AI',
  },
  {
    id: 'venturebeat-4',
    title: 'Startup desenvolve IA que cria código funcional a partir de descrições em linguagem natural',
    titleOriginal: 'Startup develops AI that creates functional code from natural language descriptions',
    description: 'Uma nova startup apresentou ferramenta de IA que pode gerar código funcional completo apenas com descrições em linguagem natural, revolucionando o desenvolvimento de software.',
    descriptionOriginal: 'A new startup unveiled an AI tool that can generate complete functional code from just natural language descriptions, revolutionizing software development.',
    link: 'https://venturebeat.com/ai/natural-language-coding',
    pubDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 dias atrás
    source: 'VentureBeat AI',
  },
  {
    id: 'theverge-4',
    title: 'Adobe integra IA generativa em toda suíte Creative Cloud',
    titleOriginal: 'Adobe integrates generative AI across entire Creative Cloud suite',
    description: 'A Adobe anunciou integração profunda de IA generativa em todos os produtos Creative Cloud, permitindo criação de conteúdo assistida por IA no Photoshop, Illustrator e Premiere.',
    descriptionOriginal: 'Adobe announced deep integration of generative AI across all Creative Cloud products, enabling AI-assisted content creation in Photoshop, Illustrator, and Premiere.',
    link: 'https://www.theverge.com/2026/1/16/adobe-creative-cloud-ai',
    pubDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 dias atrás
    source: 'The Verge AI',
  },
];
