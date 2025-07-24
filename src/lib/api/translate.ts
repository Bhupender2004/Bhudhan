import axios from 'axios';
import { TRANSLATE_API_CONFIG } from './config';

// Translate text to target language
export async function translateText(text: string, targetLanguage: string) {
  try {
    const response = await axios.post(
      TRANSLATE_API_CONFIG.baseUrl,
      {},
      {
        params: {
          q: text,
          target: targetLanguage,
          key: TRANSLATE_API_CONFIG.apiKey,
        },
      }
    );
    
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    // Error translating text
    throw error;
  }
}

// Get supported languages
export function getSupportedLanguages() {
  return TRANSLATE_API_CONFIG.supportedLanguages;
}

// Detect language of text
export async function detectLanguage(text: string) {
  try {
    const response = await axios.post(
      `${TRANSLATE_API_CONFIG.baseUrl}/detect`,
      {},
      {
        params: {
          q: text,
          key: TRANSLATE_API_CONFIG.apiKey,
        },
      }
    );
    
    return response.data.data.detections[0][0].language;
  } catch (error) {
    console.error('Error detecting language:', error);
    throw error;
  }
}
