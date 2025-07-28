/**
 * Internationalization (i18n) System for Global Business Platform
 * 
 * This module provides comprehensive internationalization support including:
 * - Multi-language support
 * - Regional formatting (dates, numbers, currencies)
 * - Timezone handling
 * - RTL language support
 * - Cultural adaptations
 * - Accessibility compliance
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Supported languages and regions
export const supportedLanguages = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    regions: ['US', 'UK', 'AU', 'CA', 'IN'],
    rtl: false
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    regions: ['IN'],
    rtl: false
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    regions: ['ES', 'MX', 'AR', 'CO'],
    rtl: false
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    regions: ['FR', 'CA', 'BE', 'CH'],
    rtl: false
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    regions: ['DE', 'AT', 'CH'],
    rtl: false
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    regions: ['SA', 'AE', 'EG', 'QA'],
    rtl: true
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    regions: ['CN', 'TW', 'HK'],
    rtl: false
  },
  ja: {
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    regions: ['JP'],
    rtl: false
  },
  ko: {
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    regions: ['KR'],
    rtl: false
  },
  pt: {
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    regions: ['PT', 'BR'],
    rtl: false
  },
  ru: {
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    regions: ['RU', 'BY', 'KZ'],
    rtl: false
  }
};

// Regional settings for formatting
export const regionalSettings = {
  US: {
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    numberFormat: 'en-US',
    timezone: 'America/New_York'
  },
  IN: {
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    numberFormat: 'en-IN',
    timezone: 'Asia/Kolkata'
  },
  UK: {
    currency: 'GBP',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'en-GB',
    timezone: 'Europe/London'
  },
  EU: {
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'de-DE',
    timezone: 'Europe/Berlin'
  },
  AU: {
    currency: 'AUD',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    numberFormat: 'en-AU',
    timezone: 'Australia/Sydney'
  },
  CA: {
    currency: 'CAD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    numberFormat: 'en-CA',
    timezone: 'America/Toronto'
  }
};

// Translation namespaces
export const translationNamespaces = {
  common: 'common',
  business: 'business',
  navigation: 'navigation',
  forms: 'forms',
  errors: 'errors',
  notifications: 'notifications',
  validation: 'validation',
  analytics: 'analytics'
};

// Initialize i18n configuration
const initI18n = () => {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      // Debug mode for development
      debug: process.env.NODE_ENV === 'development',
      
      // Fallback language
      fallbackLng: 'en',
      
      // Supported languages
      supportedLngs: Object.keys(supportedLanguages),
      
      // Namespaces
      ns: Object.values(translationNamespaces),
      defaultNS: translationNamespaces.common,
      
      // Backend configuration
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        addPath: '/locales/{{lng}}/{{ns}}.json',
        crossDomain: true,
        withCredentials: true
      },
      
      // Detection options
      detection: {
        order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage', 'sessionStorage'],
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng'
      },
      
      // Interpolation options
      interpolation: {
        escapeValue: false,
        skipOnVariables: false
      },
      
      // React options
      react: {
        useSuspense: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'p', 'span']
      }
    });

  return i18n;
};

// Utility functions for internationalization
export const i18nUtils = {
  // Get current language
  getCurrentLanguage: () => i18n.language,
  
  // Get current region
  getCurrentRegion: () => {
    const lang = i18n.language;
    const languageInfo = supportedLanguages[lang];
    return languageInfo?.regions[0] || 'US';
  },
  
  // Change language
  changeLanguage: async (language) => {
    try {
      await i18n.changeLanguage(language);
      // Update document direction for RTL languages
      const isRTL = supportedLanguages[language]?.rtl || false;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      return true;
    } catch (error) {
      console.error('Failed to change language:', error);
      return false;
    }
  },
  
  // Format currency based on region
  formatCurrency: (amount, region = null) => {
    const currentRegion = region || i18nUtils.getCurrentRegion();
    const settings = regionalSettings[currentRegion] || regionalSettings.US;
    
    return new Intl.NumberFormat(settings.numberFormat, {
      style: 'currency',
      currency: settings.currency
    }).format(amount);
  },
  
  // Format date based on region
  formatDate: (date, region = null) => {
    const currentRegion = region || i18nUtils.getCurrentRegion();
    const settings = regionalSettings[currentRegion] || regionalSettings.US;
    
    return new Intl.DateTimeFormat(settings.numberFormat, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  },
  
  // Format time based on region
  formatTime: (time, region = null) => {
    const currentRegion = region || i18nUtils.getCurrentRegion();
    const settings = regionalSettings[currentRegion] || regionalSettings.US;
    
    return new Intl.DateTimeFormat(settings.numberFormat, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: settings.timeFormat === '12h'
    }).format(new Date(time));
  },
  
  // Format number based on region
  formatNumber: (number, region = null) => {
    const currentRegion = region || i18nUtils.getCurrentRegion();
    const settings = regionalSettings[currentRegion] || regionalSettings.US;
    
    return new Intl.NumberFormat(settings.numberFormat).format(number);
  },
  
  // Get timezone offset
  getTimezoneOffset: (region = null) => {
    const currentRegion = region || i18nUtils.getCurrentRegion();
    const settings = regionalSettings[currentRegion] || regionalSettings.US;
    
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (0 * 60000)); // Adjust for target timezone
    
    return targetTime.toLocaleString(settings.numberFormat, {
      timeZone: settings.timezone
    });
  },
  
  // Check if current language is RTL
  isRTL: () => {
    const currentLang = i18n.language;
    return supportedLanguages[currentLang]?.rtl || false;
  },
  
  // Get supported languages for a region
  getLanguagesForRegion: (region) => {
    return Object.entries(supportedLanguages)
      .filter(([_, lang]) => lang.regions.includes(region))
      .map(([code, lang]) => ({ code, ...lang }));
  },
  
  // Get regions for a language
  getRegionsForLanguage: (language) => {
    return supportedLanguages[language]?.regions || [];
  },
  
  // Validate if language-region combination is supported
  isValidLanguageRegion: (language, region) => {
    const langInfo = supportedLanguages[language];
    return langInfo?.regions.includes(region) || false;
  }
};

// Hook for using internationalization in components
export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage: i18nUtils.changeLanguage,
    formatCurrency: i18nUtils.formatCurrency,
    formatDate: i18nUtils.formatDate,
    formatTime: i18nUtils.formatTime,
    formatNumber: i18nUtils.formatNumber,
    isRTL: i18nUtils.isRTL,
    supportedLanguages
  };
};

// Initialize i18n
const i18nInstance = initI18n();

export default i18nInstance; 