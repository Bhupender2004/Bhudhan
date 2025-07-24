'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

// Main auth provider that uses Clerk
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <ClerkProvider
      appearance={{
        baseTheme: isDarkTheme ? dark : undefined,
        elements: {
          formButtonPrimary:
            'bg-gradient-vibrant hover:bg-gradient-vibrant-hover text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-200',
          card: 'bg-white dark:bg-gray-900 shadow-xl',
          headerTitle: 'text-primary-600 dark:text-primary-400',
          headerSubtitle: 'text-gray-600 dark:text-gray-400',
          socialButtonsBlockButton: 'border-gray-300 dark:border-gray-700',
          socialButtonsBlockButtonText: 'text-gray-600 dark:text-gray-300',
          formFieldLabel: 'text-gray-700 dark:text-gray-300',
          formFieldInput:
            'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-400',
          footerActionLink: 'text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
