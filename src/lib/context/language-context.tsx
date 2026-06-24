'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define translations for common UI elements
const translations: Record<string, Record<string, string>> = {
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
    rewards: 'BhuDhan Games',
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
    manageSettings: 'Manage your account settings and preferences',
    updateProfile: 'Update your personal information and account details',
    configureNotifications: 'Configure how you receive notifications and alerts',

    // Weather
    currentWeather: 'Current Weather',
    forecast: 'Forecast',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    weatherWidget: 'Weather Updates',
    weatherWidgetDesc: 'Real-time weather information for your location',
    enterCity: 'Enter city name',
    tryAgain: 'Try Again',
    weatherFetchError: 'Failed to fetch weather data. Please try again.',
    noWeatherData: 'No weather data available',
    noForecastData: 'No forecast data available',
    lastUpdated: 'Last updated',
    usingMockWeather: 'Using demo weather data. API key may be invalid.',

    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    welcomeMessage: 'Welcome to BhuDhan',
    digitalFarming: 'Where Intelligence Meets Agriculture',
    platformDescription: 'A comprehensive platform with marketplace, expert connect, weather updates, and AI-powered tools to revolutionize farming practices.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    exploreFeatures: 'Explore Features',

    // Features Section
    overview: 'Overview',
    keyFeaturesTitle: 'Key Features of BhuDhan',
    keyFeaturesDescription: 'Discover how our platform empowers farmers with technology and innovation to improve productivity and sustainability.',
    benefitsForFarmers: 'Benefits for Farmers',

    // Marketplace Feature
    marketplaceFeatureTitle: 'Digital Marketplace',
    marketplaceFeatureDesc: 'Buy and sell agricultural products directly, eliminating middlemen and ensuring fair prices.',
    marketplaceDetail1: 'Direct connection between farmers and buyers without intermediaries',
    marketplaceDetail2: 'Verified sellers and quality-checked products',
    marketplaceDetail3: 'Transparent pricing and secure payment options',
    marketplaceDetail4: 'Wide range of agricultural inputs and produce available',
    marketplaceBenefits: 'Farmers can get better prices for their produce and access quality inputs at competitive rates, increasing their overall profitability.',

    // Equipment Feature
    equipmentFeatureTitle: 'Farm Equipment',
    equipmentFeatureDesc: 'Access modern farming equipment through purchase, rental, or sharing options.',
    equipmentDetail1: 'Browse a wide range of modern and traditional farming equipment',
    equipmentDetail2: 'Rent equipment for short-term needs at affordable rates',
    equipmentDetail3: 'Connect with equipment sharing communities in your area',
    equipmentDetail4: 'Get maintenance tips and service provider contacts',
    equipmentBenefits: 'Reduces capital investment costs while providing access to modern machinery that improves efficiency and reduces manual labor.',

    // Weather Feature
    weatherFeatureTitle: 'Weather Intelligence',
    weatherFeatureDesc: 'Access accurate, localized weather forecasts and agricultural advisories.',
    weatherDetail1: 'Hyperlocal weather forecasts specific to your farm location',
    weatherDetail2: 'Crop-specific weather alerts and notifications',
    weatherDetail3: 'Historical weather data for better planning',
    weatherDetail4: 'Weather-based farming recommendations',
    weatherBenefits: 'Helps farmers make informed decisions about planting, irrigation, and harvesting, reducing crop losses due to unexpected weather events.',

    // Expert Connect Feature
    expertConnectFeatureTitle: 'Expert Connect',
    expertConnectFeatureDesc: 'Connect with agricultural experts for personalized advice and problem-solving.',
    expertConnectDetail1: 'Direct consultation with agricultural scientists and experts',
    expertConnectDetail2: 'Upload photos of crop diseases for quick identification',
    expertConnectDetail3: 'Get personalized solutions for your specific farming challenges',
    expertConnectDetail4: 'Access to a knowledge base of common farming problems and solutions',
    expertConnectBenefits: 'Provides timely expert advice that helps prevent crop losses and optimize farming practices for better yields.',

    // AI Tools Feature
    aiToolsFeatureTitle: 'AI-Powered Tools',
    aiToolsFeatureDesc: 'Leverage artificial intelligence for smarter farming decisions.',
    aiToolsDetail1: 'AI-based crop disease detection using smartphone camera',
    aiToolsDetail2: 'Yield prediction based on historical data and current conditions',
    aiToolsDetail3: 'Smart irrigation recommendations to optimize water usage',
    aiToolsDetail4: 'Personalized crop selection advice based on soil and climate',
    aiToolsBenefits: 'Brings advanced technology to farmers of all scales, enabling data-driven decisions that improve productivity and resource efficiency.',

    // Crop Calendar Feature
    cropCalendarFeatureTitle: 'Crop Calendar',
    cropCalendarFeatureDesc: 'Personalized planting and harvesting schedules for optimal results.',
    cropCalendarDetail1: 'Customized crop calendars based on your location and crops',
    cropCalendarDetail2: 'Timely reminders for important farming activities',
    cropCalendarDetail3: 'Seasonal advisories for crop rotation and management',
    cropCalendarDetail4: 'Integration with weather forecasts for adaptive planning',
    cropCalendarBenefits: 'Helps farmers optimize their planting and harvesting schedules, ensuring better yields and efficient resource utilization throughout the year.',


  },

  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    marketplace: 'बाज़ार',
    equipment: 'उपकरण',
    weather: 'मौसम',
    news: 'समाचार',
    schemes: 'योजनाएँ',
    expertConnect: 'विशेषज्ञ से जुड़ें',
    cropCalendar: 'फसल कैलेंडर',
    aiTools: 'AI उपकरण',
    community: 'समुदाय',
    rewards: 'भूधन गेम्स',
    settings: 'सेटिंग्स',

    // Auth
    login: 'लॉगिन',
    welcome: 'स्वागत है',
    fullName: 'पूरा नाम',
    phoneNumber: 'फोन नंबर',
    sendOTP: 'OTP भेजें',
    verifyOTP: 'OTP सत्यापित करें',
    enterOTP: 'OTP दर्ज करें',
    enterPhoneForOTP: 'OTP प्राप्त करने के लिए अपना फोन नंबर दर्ज करें',
    enter6DigitCode: 'अपने फोन पर भेजे गए 6-अंकों के कोड को दर्ज करें',
    verificationCode: 'सत्यापन कोड',
    sendingOTP: 'OTP भेज रहे हैं...',
    verifying: 'सत्यापित कर रहे हैं...',
    verifyAndLogin: 'सत्यापित करें और लॉगिन करें',

    // Common actions
    save: 'सहेजें',
    saved: 'सहेजा गया',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    search: 'खोजें',
    filter: 'फ़िल्टर',

    // Marketplace
    addToCart: 'कार्ट में जोड़ें',
    buyNow: 'अभी खरीदें',
    viewDetails: 'विवरण देखें',
    contactSeller: 'विक्रेता से संपर्क करें',

    // Settings
    languageSettings: 'भाषा सेटिंग्स',
    profileSettings: 'प्रोफाइल सेटिंग्स',
    notificationSettings: 'अधिसूचना सेटिंग्स',
    chooseLanguage: 'अपनी पसंदीदा भाषा चुनें',
    saveLanguage: 'भाषा प्राथमिकता सहेजें',
    manageSettings: 'अपने खाते की सेटिंग्स और प्राथमिकताओं का प्रबंधन करें',
    updateProfile: 'अपनी व्यक्तिगत जानकारी और खाता विवरण अपडेट करें',
    configureNotifications: 'सूचनाएं और अलर्ट प्राप्त करने के तरीके को कॉन्फ़िगर करें',

    // Weather
    currentWeather: 'वर्तमान मौसम',
    forecast: 'पूर्वानुमान',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    windSpeed: 'हवा की गति',
    weatherWidget: 'मौसम अपडेट',
    weatherWidgetDesc: 'आपके स्थान के लिए रीयल-टाइम मौसम जानकारी',
    enterCity: 'शहर का नाम दर्ज करें',
    tryAgain: 'पुन: प्रयास करें',
    weatherFetchError: 'मौसम डेटा प्राप्त करने में विफल। कृपया पुन: प्रयास करें।',
    noWeatherData: 'कोई मौसम डेटा उपलब्ध नहीं है',
    noForecastData: 'कोई पूर्वानुमान डेटा उपलब्ध नहीं है',
    lastUpdated: 'अंतिम अपडेट',
    usingMockWeather: 'डेमो मौसम डेटा का उपयोग कर रहे हैं। API कुंजी अमान्य हो सकती है।',

    // General
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    welcomeMessage: 'स्मार्ट कृषि पोर्टल में आपका स्वागत है',
    digitalFarming: 'भारतीय किसानों के लिए डिजिटल खेती सहायक',
    platformDescription: 'बाजार, विशेषज्ञ कनेक्ट, मौसम अपडेट और कृषि प्रथाओं में क्रांति लाने के लिए AI-संचालित उपकरणों के साथ एक व्यापक प्लेटफॉर्म।',
    getStarted: 'शुरू करें',
    learnMore: 'अधिक जानें',
    exploreFeatures: 'सुविधाएँ देखें',

    // Features Section
    overview: 'अवलोकन',
    keyFeaturesTitle: 'स्मार्ट कृषि पोर्टल की प्रमुख विशेषताएं',
    keyFeaturesDescription: 'जानें कि हमारा प्लेटफॉर्म किसानों को उत्पादकता और स्थिरता में सुधार के लिए प्रौद्योगिकी और नवाचार के साथ कैसे सशक्त बनाता है।',
    benefitsForFarmers: 'किसानों के लिए लाभ',

    // Marketplace Feature
    marketplaceFeatureTitle: 'डिजिटल बाज़ार',
    marketplaceFeatureDesc: 'कृषि उत्पादों को सीधे खरीदें और बेचें, बिचौलियों को समाप्त करें और उचित मूल्य सुनिश्चित करें।',
    marketplaceDetail1: 'किसानों और खरीदारों के बीच बिना बिचौलियों के सीधा संपर्क',
    marketplaceDetail2: 'सत्यापित विक्रेता और गुणवत्ता-जांच वाले उत्पाद',
    marketplaceDetail3: 'पारदर्शी मूल्य निर्धारण और सुरक्षित भुगतान विकल्प',
    marketplaceDetail4: 'कृषि आदानों और उत्पादों की विस्तृत श्रृंखला उपलब्ध',
    marketplaceBenefits: 'किसान अपनी उपज के लिए बेहतर मूल्य प्राप्त कर सकते हैं और प्रतिस्पर्धी दरों पर गुणवत्तापूर्ण आदानों तक पहुंच सकते हैं, जिससे उनकी समग्र लाभप्रदता बढ़ जाती है।',

    // Equipment Feature
    equipmentFeatureTitle: 'कृषि उपकरण',
    equipmentFeatureDesc: 'खरीद, किराये या साझाकरण विकल्पों के माध्यम से आधुनिक कृषि उपकरणों तक पहुंच प्राप्त करें।',
    equipmentDetail1: 'आधुनिक और पारंपरिक कृषि उपकरणों की विस्तृत श्रृंखला ब्राउज़ करें',
    equipmentDetail2: 'किफायती दरों पर अल्पकालिक जरूरतों के लिए उपकरण किराए पर लें',
    equipmentDetail3: 'अपने क्षेत्र में उपकरण साझाकरण समुदायों से जुड़ें',
    equipmentDetail4: 'रखरखाव टिप्स और सेवा प्रदाता संपर्क प्राप्त करें',
    equipmentBenefits: 'पूंजी निवेश लागत को कम करता है जबकि आधुनिक मशीनरी तक पहुंच प्रदान करता है जो दक्षता में सुधार करता है और मैनुअल श्रम को कम करता है।',

    // Weather Feature
    weatherFeatureTitle: 'मौसम जानकारी',
    weatherFeatureDesc: 'सटीक, स्थानीय मौसम पूर्वानुमान और कृषि सलाह तक पहुंच प्राप्त करें।',
    weatherDetail1: 'आपके खेत के स्थान के लिए विशिष्ट हाइपरलोकल मौसम पूर्वानुमान',
    weatherDetail2: 'फसल-विशिष्ट मौसम अलर्ट और सूचनाएं',
    weatherDetail3: 'बेहतर योजना के लिए ऐतिहासिक मौसम डेटा',
    weatherDetail4: 'मौसम-आधारित खेती की सिफारिशें',
    weatherBenefits: 'किसानों को रोपण, सिंचाई और कटाई के बारे में सूचित निर्णय लेने में मदद करता है, जिससे अप्रत्याशित मौसम की घटनाओं के कारण फसल के नुकसान को कम किया जा सकता है।',

    // Expert Connect Feature
    expertConnectFeatureTitle: 'विशेषज्ञ से जुड़ें',
    expertConnectFeatureDesc: 'व्यक्तिगत सलाह और समस्या-समाधान के लिए कृषि विशेषज्ञों से जुड़ें।',
    expertConnectDetail1: 'कृषि वैज्ञानिकों और विशेषज्ञों के साथ सीधा परामर्श',
    expertConnectDetail2: 'त्वरित पहचान के लिए फसल रोगों की तस्वीरें अपलोड करें',
    expertConnectDetail3: 'अपनी विशिष्ट खेती चुनौतियों के लिए व्यक्तिगत समाधान प्राप्त करें',
    expertConnectDetail4: 'सामान्य खेती समस्याओं और समाधानों के ज्ञान आधार तक पहुंच',
    expertConnectBenefits: 'समय पर विशेषज्ञ सलाह प्रदान करता है जो फसल के नुकसान को रोकने और बेहतर उपज के लिए खेती के तरीकों को अनुकूलित करने में मदद करता है।',

    // AI Tools Feature
    aiToolsFeatureTitle: 'AI-संचालित उपकरण',
    aiToolsFeatureDesc: 'स्मार्ट खेती निर्णयों के लिए कृत्रिम बुद्धिमत्ता का लाभ उठाएं।',
    aiToolsDetail1: 'स्मार्टफोन कैमरा का उपयोग करके AI-आधारित फसल रोग पहचान',
    aiToolsDetail2: 'ऐतिहासिक डेटा और वर्तमान स्थितियों के आधार पर उपज का अनुमान',
    aiToolsDetail3: 'पानी के उपयोग को अनुकूलित करने के लिए स्मार्ट सिंचाई सिफारिशें',
    aiToolsDetail4: 'मिट्टी और जलवायु के आधार पर व्यक्तिगत फसल चयन सलाह',
    aiToolsBenefits: 'सभी स्तरों के किसानों के लिए उन्नत प्रौद्योगिकी लाता है, जो डेटा-संचालित निर्णयों को सक्षम बनाता है जो उत्पादकता और संसाधन दक्षता में सुधार करते हैं।',

    // Crop Calendar Feature
    cropCalendarFeatureTitle: 'फसल कैलेंडर',
    cropCalendarFeatureDesc: 'इष्टतम परिणामों के लिए व्यक्तिगत रोपण और कटाई कार्यक्रम।',
    cropCalendarDetail1: 'आपके स्थान और फसलों के आधार पर अनुकूलित फसल कैलेंडर',
    cropCalendarDetail2: 'महत्वपूर्ण खेती गतिविधियों के लिए समय पर अनुस्मारक',
    cropCalendarDetail3: 'फसल रोटेशन और प्रबंधन के लिए मौसमी सलाह',
    cropCalendarDetail4: 'अनुकूली योजना के लिए मौसम पूर्वानुमान के साथ एकीकरण',
    cropCalendarBenefits: 'किसानों को अपने रोपण और कटाई कार्यक्रमों को अनुकूलित करने में मदद करता है, जिससे पूरे वर्ष बेहतर उपज और कुशल संसाधन उपयोग सुनिश्चित होता है।',
  },

  bn: {
    // Navigation
    dashboard: 'ড্যাশবোর্ড',
    marketplace: 'বাজার',
    equipment: 'সরঞ্জাম',
    weather: 'আবহাওয়া',
    news: 'খবর',
    schemes: 'প্রকল্প',
    expertConnect: 'বিশেষজ্ঞের সাথে যোগাযোগ',
    cropCalendar: 'ফসল ক্যালেন্ডার',
    aiTools: 'AI টুলস',
    community: 'সম্প্রদায়',
    rewards: 'ভূধন গেমস',
    settings: 'সেটিংস',

    // Auth
    login: 'লগইন',
    welcome: 'স্বাগতম',
    fullName: 'পুরো নাম',
    phoneNumber: 'ফোন নম্বর',
    sendOTP: 'OTP পাঠান',
    verifyOTP: 'OTP যাচাই করুন',
    enterOTP: 'OTP লিখুন',

    // Common actions
    save: 'সংরক্ষণ করুন',
    saved: 'সংরক্ষিত হয়েছে',
    cancel: 'বাতিল করুন',
    edit: 'সম্পাদনা করুন',
    delete: 'মুছুন',
    view: 'দেখুন',
    search: 'অনুসন্ধান করুন',
    filter: 'ফিল্টার',

    // Marketplace
    addToCart: 'কার্টে যোগ করুন',
    buyNow: 'এখনই কিনুন',
    viewDetails: 'বিস্তারিত দেখুন',
    contactSeller: 'বিক্রেতার সাথে যোগাযোগ করুন',

    // Settings
    languageSettings: 'ভাষা সেটিংস',
    profileSettings: 'প্রোফাইল সেটিংস',
    notificationSettings: 'বিজ্ঞপ্তি সেটিংস',
    chooseLanguage: 'আপনার পছন্দের ভাষা চয়ন করুন',
    saveLanguage: 'ভাষা পছন্দ সংরক্ষণ করুন',

    // Weather
    currentWeather: 'বর্তমান আবহাওয়া',
    forecast: 'পূর্বাভাস',
    temperature: 'তাপমাত্রা',
    humidity: 'আর্দ্রতা',
    windSpeed: 'বাতাসের গতি',

    // General
    loading: 'লোড হচ্ছে...',
    error: 'ত্রুটি',
    success: 'সফল',
    welcomeMessage: 'স্মার্ট কৃষি পোর্টালে আপনাকে স্বাগতম',
    digitalFarming: 'ভারতীয় কৃষকদের জন্য ডিজিটাল কৃষি সহায়ক',
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
    rewards: 'భూధన్ గేమ్స్',
    settings: 'సెట్టింగ్‌లు',

    // Auth
    login: 'లాగిన్',
    welcome: 'స్వాగతం',
    fullName: 'పూర్తి పేరు',
    phoneNumber: 'ఫోన్ నంబర్',
    sendOTP: 'OTP పంపండి',
    verifyOTP: 'OTP ధృవీకరించండి',
    enterOTP: 'OTP నమోదు చేయండి',

    // Common actions
    save: 'సేవ్ చేయండి',
    saved: 'సేవ్ చేయబడింది',
    cancel: 'రద్దు చేయండి',
    edit: 'సవరించండి',
    delete: 'తొలగించండి',
    view: 'చూడండి',
    search: 'శోధించండి',
    filter: 'ఫిల్టర్',

    // Marketplace
    addToCart: 'కార్ట్‌కి జోడించండి',
    buyNow: 'ఇప్పుడే కొనండి',
    viewDetails: 'వివరాలు చూడండి',
    contactSeller: 'విక్రేతతో సంప్రదించండి',

    // Settings
    languageSettings: 'భాషా సెట్టింగ్‌లు',
    profileSettings: 'ప్రొఫైల్ సెట్టింగ్‌లు',
    notificationSettings: 'నోటిఫికేషన్ సెట్టింగ్‌లు',
    chooseLanguage: 'మీకు ఇష్టమైన భాషను ఎంచుకోండి',
    saveLanguage: 'భాషా ప్రాధాన్యతను సేవ్ చేయండి',

    // Weather
    currentWeather: 'ప్రస్తుత వాతావరణం',
    forecast: 'ముందస్తు అంచనా',
    temperature: 'ఉష్ణోగ్రత',
    humidity: 'తేమ',
    windSpeed: 'గాలి వేగం',

    // General
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయవంతం',
    welcomeMessage: 'స్మార్ట్ కృషి పోర్టల్‌కు స్వాగతం',
    digitalFarming: 'భారతీయ రైతులకు డిజిటల్ వ్యవసాయ సహాయకుడు',
  },

  // Add more languages as needed
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: false,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Get language from localStorage on initial load
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Set RTL direction for languages like Arabic, Urdu, etc.
      const rtlLanguages = ['ar', 'ur', 'he', 'fa'];
      setIsRTL(rtlLanguages.includes(currentLanguage));

      // Set HTML lang attribute and dir attribute
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

      // Add a class to the body for RTL styling
      if (isRTL) {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  }, [currentLanguage, isRTL]);

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[currentLanguage]) {
      return translations.en[key] || key;
    }

    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
