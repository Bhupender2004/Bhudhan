/**
 * BhuDhan Translation Integration
 * 
 * This module provides integration between the Python-based translator
 * and the Next.js application for real-time translation.
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்' },
  te: { name: 'Telugu', nativeName: 'తెలుగు' }
};

// Cache for translations
const translationCache = {};

/**
 * Load translations from JSON files
 * @param {string} locale - The locale code (e.g., 'en', 'hi')
 * @returns {Promise<Object>} - The translations object
 */
export async function loadTranslations(locale) {
  try {
    // Check if translations are already cached
    if (translationCache[locale]) {
      return translationCache[locale];
    }
    
    // Load translations from file
    const filePath = path.join(process.cwd(), 'translations', `${locale}.json`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const translations = JSON.parse(fileContent);
    
    // Cache translations
    translationCache[locale] = translations;
    
    return translations;
  } catch (error) {
    // Error loading translations

    // Fall back to English if translations can't be loaded
    if (locale !== 'en') {
      // Falling back to English translations
      return loadTranslations('en');
    }
    
    // Return empty object if even English translations can't be loaded
    return {};
  }
}

/**
 * Translate text using the Python translator script
 * @param {string} text - The text to translate
 * @param {string} sourceLang - The source language code
 * @param {string} targetLang - The target language code
 * @returns {Promise<string>} - The translated text
 */
export function translateText(text, sourceLang = 'en', targetLang = 'hi') {
  return new Promise((resolve, reject) => {
    // Skip translation if source and target languages are the same
    if (sourceLang === targetLang) {
      resolve(text);
      return;
    }
    
    // Path to the Python script
    const scriptPath = path.join(process.cwd(), 'scripts', 'translator.py');
    
    // Spawn Python process
    const pythonProcess = spawn('python', [
      scriptPath,
      '--text', text,
      '--source', sourceLang,
      '--target', targetLang
    ]);
    
    let output = '';
    let errorOutput = '';

    // Handle process errors (e.g., Python not found)
    pythonProcess.on('error', (err) => {
      // Failed to start Python process
      reject(new Error(`Failed to start Python process: ${err.message}`));

    // Collect output
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Collect error output
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        // Translation process exited with error code
        // Error output available
        reject(new Error(`Translation failed: ${errorOutput}`));
        return;
      }

      // Extract translated text from output
      // Output format: "Language: Translated text"
      if (!SUPPORTED_LANGUAGES[targetLang]) {
        reject(new Error(`Unsupported target language: ${targetLang}`));
        return;
      }
      const match = output.match(new RegExp(`${SUPPORTED_LANGUAGES[targetLang].name}: (.*)`));
      if (match && match[1]) {
        resolve(match[1].trim());
      } else {
        reject(new Error('Failed to parse translation output'));
      }
    });
  });
}

);
}

/**
 * Clear the translation cache
 */
export function clearTranslationCache() {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
}

// Removed default export to avoid conflicts; use named exports instead.
