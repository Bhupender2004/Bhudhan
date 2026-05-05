'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import { User } from 'lucide-react';
import LanguageSelector from '@/components/language/language-selector';
import { useLanguage } from '@/lib/context/language-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import Sidebar from './sidebar';
import Image from 'next/image';

export default function Header() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string>('User');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const updateUserInfo = () => {
      // Only run in browser environment
      if (typeof window !== 'undefined') {
        // Get user info from localStorage
        const name = localStorage.getItem('userName');
        const phone = localStorage.getItem('userPhone');
        const savedImage = localStorage.getItem('userProfileImage');

        if (name) {
          setUserName(name);
        } else if (phone) {
          setUserName(phone.substring(phone.length - 4)); // Last 4 digits of phone as fallback
        }

        if (savedImage) {
          setProfileImage(savedImage);
        } else {
          setProfileImage(null);
        }
      }
    };

    updateUserInfo();

    // Listen for profile updates
    window.addEventListener('userProfileUpdated', updateUserInfo);
    return () => window.removeEventListener('userProfileUpdated', updateUserInfo);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 dark:border-slate-700 header-gradient backdrop-blur-md shadow-md transition-all duration-300">
      <div className="container flex h-18 items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden icon-hover-effect">
                <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-r-primary-100 bg-white/95 pr-0 backdrop-blur-md dark:border-r-primary-900/50 dark:bg-gray-900/95 sm:max-w-xs">
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
              <div className="px-7 py-6">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm">
                    <Image src="/logo.png" alt="BhuDhan Logo" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-xl font-bold text-transparent dark:from-green-400 dark:via-teal-400 dark:to-blue-400 logo-text-gradient">BhuDhan</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Where Intelligence Meets Agriculture</span>
                  </div>
                </Link>
              </div>
              <Sidebar className="px-2" onRouteClick={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="hidden items-center gap-3 md:flex transition-all duration-300 hover:scale-105">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm animate-pulse-slow">
              <Image src="/logo.png" alt="BhuDhan Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-xl font-bold text-transparent dark:from-green-400 dark:via-teal-400 dark:to-blue-400 logo-text-gradient">BhuDhan</span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 hidden md:block">Where Intelligence Meets Agriculture</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="icon-hover-effect relative overflow-hidden group">
                <div className="relative">
                  <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">3</span>
                </div>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border-primary-100 p-4 dark:border-primary-900/50">
              <h3 className="mb-2 font-medium text-primary-700 dark:text-primary-300">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-md p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New government scheme announced</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <LanguageSelector />

          {/* Only show theme toggle after mounting to prevent hydration mismatch */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="icon-hover-effect relative overflow-hidden group"
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="icon-hover-effect relative overflow-hidden group">
              <div className="relative">
                <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">2</span>
              </div>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full icon-hover-effect hover:ring-2 hover:ring-primary/50">
                <Avatar className="border-2 border-primary-200 dark:border-primary-800">
                  {profileImage && <AvatarImage src={profileImage} alt={userName} />}
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {user?.firstName?.[0] || userName?.[0] || <User className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-primary-100 dark:border-primary-900/50">
              <div className="border-b border-primary-100 p-2 dark:border-primary-900/50">
                <p className="text-sm font-medium">{t('welcome')}, {user?.firstName || userName}</p>
                <p className="text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress || user?.primaryPhoneNumber?.phoneNumber || 'No contact info'}</p>
              </div>
              <div className="p-1">
                <DropdownMenuItem asChild className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm hover:bg-primary/15 hover:text-primary transition-all duration-300">
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4 text-primary-500" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm hover:bg-primary/15 hover:text-primary transition-all duration-300">
                  <Link href="/settings">
                    <svg className="mr-2 h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-red-500 hover:bg-red-500/15 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300"
                  onClick={async () => {
                    try {
                      await signOut();
                      // Clerk will handle the redirect to the sign-in page
                    } catch (error) {
                      console.error('Error signing out:', error);
                    }
                  }}
                >
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
