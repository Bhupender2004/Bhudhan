/**
 * BhuDhan Translation - Browser Compatible Version
 * 
 * This module provides a simplified browser-compatible version of the translator
 * with static translations for the Next.js application.
 */

// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்' },
  te: { name: 'Telugu', nativeName: 'తెలుగు' }
};

// Static translations for common UI elements
const staticTranslations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    marketplace: 'Marketplace',
    equipment: 'Equipment',
    weather: 'Weather',
    news: 'News',
    schemes: 'Schemes',
    expertConnect: 'Expert Connect',
    cropCalendar: 'Crop Calendar',
    aiTools: 'AI Tools',
    community: 'Community',
    settings: 'Settings',

    // Auth
    login: 'Login',
    welcome: 'Welcome',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    sendOTP: 'Send OTP',
    verifyOTP: 'Verify OTP',
    enterOTP: 'Enter OTP',
    enterPhoneForOTP: 'Enter your phone number to receive an OTP',
    enter6DigitCode: 'Enter the 6-digit code sent to your phone',
    verificationCode: 'Verification Code',
    sendingOTP: 'Sending OTP...',
    verifying: 'Verifying...',
    verifyAndLogin: 'Verify & Login',

    // Common actions
    save: 'Save',
    saved: 'Saved',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    search: 'Search',
    filter: 'Filter',

    // Marketplace
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    viewDetails: 'View Details',
    contactSeller: 'Contact Seller',

    // Settings
    languageSettings: 'Language Settings',
    profileSettings: 'Profile Settings',
    notificationSettings: 'Notification Settings',
    chooseLanguage: 'Choose your preferred language',
    saveLanguage: 'Save Language Preference',

    // Weather
    currentWeather: 'Current Weather',
    forecast: 'Forecast',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    weatherWidget: 'Weather Dashboard',
    weatherWidgetDesc: 'View current weather conditions and forecasts for your location.',

    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    welcomeMessage: 'Welcome to BhuDhan Krishi',
    digitalFarming: 'Digital Farming Assistant for Indian Farmers',
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    marketplace: 'मार्केटप्लेस',
    equipment: 'उपकरण',
    weather: 'मौसम',
    news: 'समाचार',
    schemes: 'योजनाएँ',
    expertConnect: 'विशेषज्ञ से जुड़ें',
    cropCalendar: 'फसल कैलेंडर',
    aiTools: 'AI टूल्स',
    community: 'समुदाय',
    settings: 'सेटिंग्स',

    // Auth
    login: 'लॉगिन',
    welcome: 'स्वागत है',
    fullName: 'पूरा नाम',
    phoneNumber: 'फोन नंबर',
    sendOTP: 'OTP भेजें',
    verifyOTP: 'OTP सत्यापित करें',
    enterOTP: 'OTP दर्ज करें',

    // Common actions
    save: 'सहेजें',
    saved: 'सहेजा गया',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    search: 'खोजें',
    filter: 'फ़िल्टर',

    // Weather
    weatherWidget: 'मौसम डैशबोर्ड',
    weatherWidgetDesc: 'अपने स्थान के लिए वर्तमान मौसम की स्थिति और पूर्वानुमान देखें।',

    // General
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    welcomeMessage: 'भूधन कृषि में आपका स्वागत है',
    digitalFarming: 'भारतीय किसानों के लिए डिजिटल खेती सहायक',
  },
  pa: {
    // Navigation
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    marketplace: 'ਮਾਰਕੀਟਪਲੇਸ',
    equipment: 'ਉਪਕਰਣ',
    weather: 'ਮੌਸਮ',
    news: 'ਖ਼ਬਰਾਂ',
    schemes: 'ਯੋਜਨਾਵਾਂ',
    expertConnect: 'ਮਾਹਿਰ ਨਾਲ ਜੁੜੋ',
    cropCalendar: 'ਫਸਲ ਕੈਲੰਡਰ',
    aiTools: 'AI ਟੂਲਜ਼',
    community: 'ਕਮਿਊਨਿਟੀ',
    settings: 'ਸੈਟਿੰਗਜ਼',

    // Common actions
    save: 'ਸੇਵ ਕਰੋ',
    saved: 'ਸੇਵ ਕੀਤਾ',
    cancel: 'ਰੱਦ ਕਰੋ',
    edit: 'ਸੋਧੋ',
    delete: 'ਮਿਟਾਓ',
    view: 'ਵੇਖੋ',
    search: 'ਖੋਜ',
    filter: 'ਫਿਲਟਰ',

    // General
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    error: 'ਗਲਤੀ',
    success: 'ਸਫਲਤਾ',
    welcomeMessage: 'ਭੂਧਨ ਕ੍ਰਿਸ਼ੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    digitalFarming: 'ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਡਿਜੀਟਲ ਖੇਤੀ ਸਹਾਇਕ',
  },
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    marketplace: 'சந்தை',
    equipment: 'உபகரணங்கள்',
    weather: 'வானிலை',
    news: 'செய்திகள்',
    schemes: 'திட்டங்கள்',
    expertConnect: 'நிபுணர் இணைப்பு',
    cropCalendar: 'பயிர் காலண்டர்',
    aiTools: 'AI கருவிகள்',
    community: 'சமூகம்',
    settings: 'அமைப்புகள்',

    // Common actions
    save: 'சேமி',
    saved: 'சேமிக்கப்பட்டது',
    cancel: 'ரத்து செய்',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    view: 'பார்',
    search: 'தேடு',
    filter: 'வடிகட்டு',

    // General
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை',
    success: 'வெற்றி',
    welcomeMessage: 'பூதன் கிருஷிக்கு வரவேற்கிறோம்',
    digitalFarming: 'இந்திய விவசாயிகளுக்கான டிஜிட்டல் விவசாய உதவியாளர்',
  },
  te: {
    // Navigation
    dashboard: 'డాష్‌బోర్డ్',
    marketplace: 'మార్కెట్‌ప్లేస్',
    equipment: 'పరికరాలు',
    weather: 'వాతావరణం',
    news: 'వార్తలు',
    schemes: 'పథకాలు',
    expertConnect: 'నిపుణులతో కనెక్ట్ అవ్వండి',
    cropCalendar: 'పంట క్యాలెండర్',
    aiTools: 'AI పరికరాలు',
    community: 'సమాజం',
    settings: 'సెట్టింగ్‌లు',

    // Common actions
    save: 'సేవ్ చేయండి',
    saved: 'సేవ్ చేయబడింది',
    cancel: 'రద్దు చేయండి',
    edit: 'సవరించండి',
    delete: 'తొలగించండి',
    view: 'చూడండి',
    search: 'శోధించండి',
    filter: 'ఫిల్టర్',

    // General
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయవంతం',
    welcomeMessage: 'భూధన్ కృషికి స్వాగతం',
    digitalFarming: 'భారతీయ రైతులకు డిజిటల్ వ్యవసాయ సహాయకుడు',
  },
};

/**
 * Load translations from static object
 * @param {string} locale - The locale code (e.g., 'en', 'hi')
 * @returns {Promise<Object>} - The translations object
 */
export async function loadTranslations(locale) {
  try {
    // Return static translations for the locale, or fall back to English
    return staticTranslations[locale] || staticTranslations.en;
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    return staticTranslations.en;
  }
}

/**
 * Translate text using static translations
 * @param {string} text - The text to translate
 * @param {string} sourceLang - The source language code
 * @param {string} targetLang - The target language code
 * @returns {Promise<string>} - The translated text
 */
export async function translateText(text, sourceLang = 'en', targetLang = 'en') {
  try {
    // If source and target languages are the same, return the original text
    if (sourceLang === targetLang) {
      return text;
    }

    // For now, just return the original text as we don't have a real-time translation API
    // In a real implementation, you would call an API here
    // Translation requested
    return text;
  } catch (error) {
    // Translation error occurred
    return text;
  }
}

/**
 * Get a list of supported languages
 * @returns {Object} - Object with language codes as keys and language info as values
 */
export function getSupportedLanguages() {
  return SUPPORTED_LANGUAGES;
}

const translatorModule = {
  loadTranslations,
  translateText,
  getSupportedLanguages,
  SUPPORTED_LANGUAGES
};

export default translatorModule;
