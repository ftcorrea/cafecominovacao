// Tradutor usando API MyMemory (mais estável)
// Para produção, considere usar a API oficial do Google Translate ou DeepL

export async function translateText(text: string, from: string = 'en', to: string = 'pt'): Promise<string> {
  try {
    // Remove HTML tags e limpa o texto
    const cleanText = text.replace(/<[^>]*>/g, '').trim();

    if (!cleanText) return '';

    // Limita o tamanho do texto (MyMemory tem limite de 500 caracteres)
    const textToTranslate = cleanText.substring(0, 500);

    // Usa MyMemory com email para aumentar o limite
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${from}|${to}&de=noreply@ainewshub.com`;

    const myMemoryResponse = await fetch(myMemoryUrl, {
      headers: {
        'User-Agent': 'AI News Hub/1.0',
      },
    });

    if (!myMemoryResponse.ok) {
      console.warn(`MyMemory HTTP ${myMemoryResponse.status}`);
      return cleanText;
    }

    const myMemoryData = await myMemoryResponse.json();

    if (myMemoryData.responseStatus === 200 && myMemoryData.responseData?.translatedText) {
      const translated = myMemoryData.responseData.translatedText;

      // Verifica se a tradução é válida (não é apenas o texto original)
      if (translated && translated.toLowerCase() !== textToTranslate.toLowerCase()) {
        return translated;
      }
    }

    // Se falhar ou não traduzir, retorna original
    console.warn('Translation returned original text');
    return cleanText;
  } catch (error) {
    console.error('Translation error:', error);
    return text.replace(/<[^>]*>/g, '').trim();
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
