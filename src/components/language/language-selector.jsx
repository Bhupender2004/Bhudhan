'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/context/language-context';
import { SUPPORTED_LANGUAGES } from '@/lib/translation/translator';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Check, Globe } from 'lucide-react';

/**
 * Language Selector Component
 * @returns {JSX.Element} - Language selector component
 */
export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we have access to the client-side environment
  useEffect(() => setMounted(true), []);
  
  // If not mounted yet, render a placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 px-0">
        <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        <span className="sr-only">Select Language</span>
      </Button>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-9 px-0 hover:bg-primary-50 dark:hover:bg-primary-900/30"
        >
          <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <span className="sr-only">Select Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 border-primary-100 dark:border-primary-900/50">
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, { name, nativeName }]) => (
          <DropdownMenuItem
            key={code}
            className="flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20"
            onClick={() => setLanguage(code)}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">{nativeName}</span>
            </span>
            {language === code && (
              <Check className="h-4 w-4 text-primary-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
