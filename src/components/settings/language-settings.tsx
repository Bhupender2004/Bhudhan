'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe, Sparkles, Languages } from 'lucide-react';
import { motion as m } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/utils/toast';
import { getSupportedLanguages } from '@/lib/api/translate';
import { useLanguage } from '@/lib/context/language-context';
import { cn } from '@/lib/utils';

export default function LanguageSettings() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const { toast } = useToast();
  const languages = getSupportedLanguages();

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleSaveLanguage = () => {
    setLanguage(selectedLanguage);
    toast.success(t('success') + ': ' + t('saveLanguage'));
  };

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
  };

  // High-quality flag URLs from FlagCDN
  const languageFlags: Record<string, string> = {
    en: 'https://flagcdn.com/w160/gb.png',
    hi: 'https://flagcdn.com/w160/in.png',
    pa: 'https://flagcdn.com/w160/in.png',
    ta: 'https://flagcdn.com/w160/in.png',
    te: 'https://flagcdn.com/w160/in.png',
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8 py-2">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 rounded-xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <Languages className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Available Languages</h3>
          <p className="text-sm text-muted-foreground font-medium">Select your preferred local language for a personalized farming experience</p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {languages.map((language) => (
          <motion.div
            key={language.code}
            variants={item}
            whileHover={{ scale: 1.01, translateY: -2 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "relative flex cursor-pointer rounded-xl border-2 p-1 transition-all duration-200 overflow-hidden",
              selectedLanguage === language.code
                ? "border-green-600 bg-green-50/50 dark:border-green-500 dark:bg-green-900/10 shadow-md"
                : "border-border bg-card hover:border-green-200 dark:hover:border-green-900 shadow-sm"
            )}
            onClick={() => handleLanguageSelect(language.code)}
          >
            <div className="relative flex w-full flex-col gap-3 p-4 z-10">
              <div className="flex items-center justify-between">
                <div className="relative h-10 w-14 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                  <Image
                    src={languageFlags[language.code]}
                    alt={language.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <AnimatePresence>
                  {selectedLanguage === language.code && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white shadow-sm"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className={cn(
                    "font-bold text-base transition-colors",
                    selectedLanguage === language.code ? "text-green-700 dark:text-green-400" : "text-gray-900 dark:text-gray-100"
                  )}>
                    {language.name}
                  </p>
                  {language.code === currentLanguage && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-[10px] font-bold text-amber-800 uppercase tracking-wider dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-muted-foreground leading-snug">
                  {language.code === 'en' ? 'English' :
                   language.code === 'hi' ? 'हिन्दी' :
                   language.code === 'pa' ? 'ਪੰਜਾਬੀ' :
                   language.code === 'ta' ? 'தமிழ்' :
                   language.code === 'te' ? 'తెలుగు' : ''}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 border-t border-border/50">
        <Button
          onClick={handleSaveLanguage}
          size="lg"
          className={cn(
            "w-full sm:w-64 h-12 text-base font-bold transition-all duration-200 rounded-xl",
            selectedLanguage === currentLanguage 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500" 
              : "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/10 active:scale-95"
          )}
          disabled={selectedLanguage === currentLanguage}
        >
          {selectedLanguage === currentLanguage ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              {t('saved')}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {t('saveLanguage')}
            </span>
          )}
        </Button>
        
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mb-0.5">
            Automatic Translation
          </p>
          <p className="text-xs text-muted-foreground max-w-sm italic">
            Your preferences will be updated instantly across all services.
          </p>
        </div>
      </div>
    </div>
  );
}
