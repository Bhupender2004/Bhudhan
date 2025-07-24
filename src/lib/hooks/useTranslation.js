/**
 * BhuDhan Translation Hook
 * 
 * This hook provides translation functionality for React components.
 */

import { useContext } from 'react';
import { LanguageContext } from '@/lib/context/language-context';

/**
 * Hook for accessing translations in React components
 * @returns {Object} - Translation utilities
 */
export function useTranslation() {
  const { 
    language, 
    setLanguage, 
    translations, 
    isLoading,
    translateText: translate
  } = useContext(LanguageContext);
  
  /**
   * Translate a key using the loaded translations
   * @param {string} key - The translation key (dot notation supported)
   * @param {Object} params - Parameters to interpolate into the translation
   * @returns {string} - The translated text
   */
  const t = (key, params = {}) => {
    if (isLoading) return key;
    
    // Get the translation from the nested object using the key path
    const keys = key.split('.');
    let translation = translations;
    
    for (const k of keys) {
      translation = translation?.[k];
      if (translation === undefined) return key;
    }
    
    // If translation is not a string, return the key
    if (typeof translation !== 'string') return key;
    
    // Interpolate parameters
    let result = translation;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    });
    
    return result;
  };
  
  /**
   * Translate text on-the-fly using the Python translator
   * @param {string} text - The text to translate
   * @param {string} sourceLang - The source language code (default: 'en')
   * @returns {Promise<string>} - The translated text
   */
  const translateText = (text, sourceLang = 'en') => {
    return translate(text, sourceLang, language);
  };
  
  return {
    t,
    translateText,
    language,
    setLanguage,
    isLoading
  };
}

export default useTranslation;
