'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/utils/toast';
import { getSupportedLanguages } from '@/lib/api/translate';
import { useLanguage } from '@/lib/context/language-context';

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

  // Map of language codes to flag images
  const languageFlags: Record<string, string> = {
    en: 'https://placehold.co/60x40/003366/ffffff?text=EN',
    hi: 'https://placehold.co/60x40/FF9933/ffffff?text=HI',
    bn: 'https://placehold.co/60x40/006A4E/ffffff?text=BN',
    te: 'https://placehold.co/60x40/0000FF/ffffff?text=TE',
    mr: 'https://placehold.co/60x40/FF9933/ffffff?text=MR',
    ta: 'https://placehold.co/60x40/006A4E/ffffff?text=TA',
    gu: 'https://placehold.co/60x40/FF9933/ffffff?text=GU',
    kn: 'https://placehold.co/60x40/FFCC00/ffffff?text=KN',
    ml: 'https://placehold.co/60x40/006A4E/ffffff?text=ML',
    pa: 'https://placehold.co/60x40/003366/ffffff?text=PA',
    or: 'https://placehold.co/60x40/FF9933/ffffff?text=OR',
    as: 'https://placehold.co/60x40/006A4E/ffffff?text=AS',
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <RadioGroup
          value={selectedLanguage}
          onValueChange={handleLanguageSelect}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {languages.map((language) => (
            <div
              key={language.code}
              className={`relative flex cursor-pointer rounded-lg border p-4 transition-all hover:border-primary-500 hover:bg-primary-50 dark:hover:border-primary-500 dark:hover:bg-primary-950/30 ${
                selectedLanguage === language.code
                  ? 'border-primary-500 bg-primary-50 dark:border-primary-500 dark:bg-primary-950/50'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <RadioGroupItem
                value={language.code}
                id={`language-${language.code}`}
                className="sr-only"
              />
              <Label
                htmlFor={`language-${language.code}`}
                className="flex flex-1 cursor-pointer items-center gap-3"
              >
                <div className="relative h-10 w-14 overflow-hidden rounded border">
                  <Image
                    src={languageFlags[language.code]}
                    alt={language.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="font-medium">{language.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {language.code === 'en' ? 'English' :
                     language.code === 'hi' ? 'हिन्दी' :
                     language.code === 'bn' ? 'বাংলা' :
                     language.code === 'te' ? 'తెలుగు' :
                     language.code === 'mr' ? 'मराठी' :
                     language.code === 'ta' ? 'தமிழ்' :
                     language.code === 'gu' ? 'ગુજરાતી' :
                     language.code === 'kn' ? 'ಕನ್ನಡ' :
                     language.code === 'ml' ? 'മലയാളം' :
                     language.code === 'pa' ? 'ਪੰਜਾਬੀ' :
                     language.code === 'or' ? 'ଓଡ଼ିଆ' :
                     language.code === 'as' ? 'অসমীয়া' : ''}
                  </p>
                </div>
                {selectedLanguage === language.code && (
                  <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-primary-500"></div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button
        onClick={handleSaveLanguage}
        className="w-full sm:w-auto"
        disabled={selectedLanguage === currentLanguage}
      >
        {selectedLanguage === currentLanguage ? t('saved') : t('saveLanguage')}
      </Button>
    </div>
  );
}
