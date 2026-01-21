// Tradutor usando múltiplas APIs com fallback
// Para produção, considere usar a API oficial do Google Translate ou DeepL

export async function translateText(text: string, from: string = 'en', to: string = 'pt'): Promise<string> {
  try {
    // Remove HTML tags
    const cleanText = text.replace(/<[^>]*>/g, '').trim();

    if (!cleanText) return '';

    // Limita o tamanho do texto para evitar erros (máximo 500 caracteres)
    const textToTranslate = cleanText.substring(0, 500);

    // Tenta LibreTranslate primeiro (API pública gratuita)
    try {
      const libreResponse = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: textToTranslate,
          source: from,
          target: to,
          format: 'text',
        }),
      });

      if (libreResponse.ok) {
        const libreData = await libreResponse.json();
        if (libreData.translatedText) {
          return libreData.translatedText;
        }
      }
    } catch (libreError) {
      console.log('LibreTranslate failed, trying MyMemory...');
    }

    // Fallback para MyMemory
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${from}|${to}`;
    const myMemoryResponse = await fetch(myMemoryUrl);
    const myMemoryData = await myMemoryResponse.json();

    if (myMemoryData.responseStatus === 200 && myMemoryData.responseData) {
      return myMemoryData.responseData.translatedText;
    }

    // Se ambas falharem, retorna texto original
    console.warn('Translation failed for:', textToTranslate.substring(0, 50));
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
