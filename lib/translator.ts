// Tradutor simples usando a API do Google Translate (via endpoint público)
// Para produção, considere usar a API oficial do Google Translate ou DeepL

export async function translateText(text: string, from: string = 'en', to: string = 'pt'): Promise<string> {
  try {
    // Remove HTML tags
    const cleanText = text.replace(/<[^>]*>/g, '');

    // Usando a API do MyMemory (gratuita até 5000 palavras/dia)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${from}|${to}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText;
    }

    // Fallback: retorna texto original se a tradução falhar
    return cleanText;
  } catch (error) {
    console.error('Translation error:', error);
    return text.replace(/<[^>]*>/g, '');
  }
}

export async function translateBatch(texts: string[]): Promise<string[]> {
  // Traduz múltiplos textos com delay para evitar rate limiting
  const results: string[] = [];

  for (let i = 0; i < texts.length; i++) {
    const translated = await translateText(texts[i]);
    results.push(translated);

    // Delay de 100ms entre requisições
    if (i < texts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}
