// API configuration and keys

// Weather API
export const WEATHER_API_CONFIG = {
  // NOTE: You need to replace this with a valid OpenWeatherMap API key
  // Get a free API key from: https://home.openweathermap.org/users/sign_up
  apiKey: 'YOUR_OPENWEATHERMAP_API_KEY',
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  units: 'metric', // Use metric units (Celsius)
  useMockData: true, // Set to false when you have a valid API key
};

// OpenAI API for AI tools
export const OPENAI_API_CONFIG = {
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo123456789abcdefghijklmnopqrstuvwxyz0123',
  model: 'gpt-3.5-turbo', // Default model
};

// Google Translate API for multilingual support
export const TRANSLATE_API_CONFIG = {
  apiKey: process.env.GOOGLE_TRANSLATE_API_KEY || 'AIzaSyDemoTranslateApiKey123456789',
  baseUrl: 'https://translation.googleapis.com/language/translate/v2',
  supportedLanguages: [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
  ],
};

// Data.gov.in API for crop prices
export const DATA_GOV_API_CONFIG = {
  apiKey: process.env.DATA_GOV_IN_API_KEY || '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
  baseUrl: 'https://api.data.gov.in/resource',
  cropPriceEndpoint: '/9ef84268-d588-465a-a308-a864a43d0070',
};

// News API for agricultural news
export const NEWS_API_CONFIG = {
  apiKey: process.env.NEWS_API_KEY || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
  baseUrl: 'https://newsapi.org/v2',
  country: 'in', // India
  category: 'business', // Business category (closest to agriculture)
  query: 'agriculture OR farming OR crops OR farmers',
};
