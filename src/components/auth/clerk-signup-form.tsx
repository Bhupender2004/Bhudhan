'use client';

import { useState } from 'react';
import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { Card } from '@/components/ui/card';

export default function ClerkSignupForm() {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  const [] = useState(false);

  return (
    <Card className="w-full overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80 glass-card p-4">
      <div className="absolute inset-0 -z-10 bg-gradient-vibrant opacity-10" />

      <SignUp
        appearance={{
          baseTheme: isDarkTheme ? dark : undefined,
          elements: {
            root: 'w-full mx-auto',
            card: 'bg-transparent shadow-none w-full mx-auto max-w-md p-0',
            main: 'w-full mx-auto px-0',
            form: 'w-full',
            formButtonPrimary:
              'bg-gradient-vibrant hover:bg-gradient-vibrant-hover text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-200 w-full',
            headerTitle: 'text-primary-600 dark:text-primary-400 text-xl',
            headerSubtitle: 'text-gray-600 dark:text-gray-400',
            socialButtonsBlockButton: 'border-gray-300 dark:border-gray-700 w-full',
            socialButtonsBlockButtonText: 'text-gray-600 dark:text-gray-300',
            formFieldLabel: 'text-gray-700 dark:text-gray-300',
            formFieldInput:
              'bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 w-full',
            footerActionLink: 'text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300',
            identityPreviewText: 'text-gray-700 dark:text-gray-300',
            identityPreviewEditButton: 'text-primary-600 dark:text-primary-400',
          },
        }}
        signInUrl="/login"
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"

        // Use hash-based routing instead of path-based routing
        routing="hash"
      />
    </Card>
  );
}
