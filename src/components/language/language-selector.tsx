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
          className={`rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/30 ${className}`}
        >
          <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <div className="p-2 text-xs font-medium text-muted-foreground">
          Select Language
        </div>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm ${
              currentLanguage === language.code
                ? 'bg-primary-50 font-medium text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                : 'hover:bg-primary-50 dark:hover:bg-primary-900/20'
            }`}
            onClick={() => handleLanguageChange(language.code)}
          >
            {language.name}
            {currentLanguage === language.code && (
              <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
