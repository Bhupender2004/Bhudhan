'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getSupportedLanguages } from '@/lib/api/translate';
import { useLanguage } from '@/lib/context/language-context';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'select';
  className?: string;
}

export default function LanguageSelector({
  variant = 'dropdown',
  className = ''
}: LanguageSelectorProps) {
  const { currentLanguage, setLanguage } = useLanguage();
  const languages = getSupportedLanguages();
  const [mounted, setMounted] = useState(false);

  // Only show on client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);

    // No need to reload the page as the context will update the UI
  };


  // Don't render until client-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (variant === 'select') {
    return (
      <Select
        value={currentLanguage}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className={`w-[140px] ${className}`}>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`h-9 w-9 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 group ${className}`}
        >
          <Globe className="h-5 w-5 text-slate-600 dark:text-slate-300 group-hover:text-green-600 transition-colors" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-1.5 border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl">
        <div className="px-2 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Preferred Language
        </div>
        <div className="space-y-0.5">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className={`flex cursor-pointer items-center gap-3 rounded-lg p-2.5 text-sm transition-all ${
                currentLanguage === language.code
                  ? 'bg-green-50 font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-green-600'
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <div className={`flex h-6 w-6 items-center justify-center rounded-md border text-[10px] uppercase ${
                currentLanguage === language.code
                  ? 'border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/50 dark:text-green-400'
                  : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-500'
              }`}>
                {language.code}
              </div>
              {language.name}
              {currentLanguage === language.code && (
                <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                  <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
