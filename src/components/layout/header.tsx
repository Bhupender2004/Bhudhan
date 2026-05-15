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
    <header className="sticky top-0 z-40 border-b border-green-100/30 dark:border-slate-800/50 header-gradient backdrop-blur-xl transition-all duration-500">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors">
                <svg className="h-6 w-6 text-green-700 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="flex items-center gap-3 font-bold group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-inner transition-transform group-hover:scale-110">
                    <Image src="/logo.png" alt="BhuDhan Logo" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-xl font-bold text-transparent dark:from-green-400 dark:via-teal-400 dark:to-blue-400 logo-text-gradient">BhuDhan</span>
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-tight">Intelligence Meets Agriculture</span>
                  </div>
                </Link>
              </div>
              <Sidebar className="px-2" onRouteClick={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="hidden items-center gap-3 md:flex transition-all duration-500 hover:opacity-90 group">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-green-200/50 dark:group-hover:shadow-green-900/20">
              <Image src="/logo.png" alt="BhuDhan Logo" fill className="object-cover p-1" />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-green-600 via-teal-500 to-emerald-600 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-green-400 dark:via-teal-400 dark:to-emerald-400 logo-text-gradient">BhuDhan</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-green-600/70 dark:text-green-400/60 hidden lg:block">Smart Krishi Ecosystem</span>
            </div>
          </Link>
        </div>

        {/* Center Section: Search Bar */}
        <div className="hidden flex-1 max-w-md mx-8 md:flex relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400 group-focus-within:text-green-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search crops, prices, or news..."
            className="w-full h-11 pl-10 pr-4 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-[10px] font-medium text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 shadow-sm pointer-events-none">⌘K</span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-1 md:gap-3">
          <div className="flex items-center gap-1 mr-2 px-2 py-1 bg-white/30 dark:bg-slate-800/30 rounded-full border border-white/50 dark:border-slate-700/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 relative">
                  <svg className="h-5 w-5 text-slate-600 dark:text-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-white dark:border-slate-900"></span>
                  </span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3">
                  <h3 className="font-bold text-white flex items-center justify-between">
                    Notifications
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">3 New</span>
                  </h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                  <div className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 group-hover:scale-110 transition-transform">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">New government scheme announced</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">2 hours ago • PM Kisan Update</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 p-2">
                  <Button variant="ghost" className="w-full h-9 text-xs font-bold text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20">
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <LanguageSelector />

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="h-9 w-9 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden w-5 h-5">
                  <div className={`transition-all duration-500 absolute inset-0 ${theme === 'light' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                    <svg className="h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </div>
                  <div className={`transition-all duration-500 absolute inset-0 ${theme === 'dark' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  </div>
                </div>
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            <Link href="/cart" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 relative group">
                <svg className="h-5 w-5 text-slate-600 dark:text-slate-300 group-hover:text-green-600 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-white border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">2</span>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-11 pl-1 pr-3 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent hover:border-white/50 dark:hover:border-slate-700/50 transition-all duration-300 group">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar className="h-9 w-9 border-2 border-white dark:border-slate-800 shadow-sm group-hover:ring-2 group-hover:ring-green-400/50 transition-all">
                      {profileImage && <AvatarImage src={profileImage} alt={userName} />}
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-700 text-white font-bold text-xs">
                        {user?.firstName?.[0] || userName?.[0] || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></div>
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-none gap-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{user?.firstName || userName}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-green-600/70 dark:text-green-400/60">Farmer Pro</span>
                  </div>
                  <svg className="h-3 w-3 text-slate-400 group-hover:text-green-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
              <div className="px-3 py-4 mb-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm">
                    {profileImage && <AvatarImage src={profileImage} alt={userName} />}
                    <AvatarFallback className="bg-green-500 text-white font-bold text-sm">
                      {user?.firstName?.[0] || userName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user?.firstName || userName}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.primaryEmailAddress?.emailAddress || 'farmer@bhudhan.com'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <DropdownMenuItem asChild className="flex cursor-pointer items-center gap-3 rounded-xl p-2.5 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all">
                  <Link href="/profile">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 group-hover:text-green-600 transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex cursor-pointer items-center gap-3 rounded-xl p-2.5 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all">
                  <Link href="/settings">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 group-hover:text-green-600 transition-colors">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-3 rounded-xl p-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-all"
                  onClick={async () => {
                    try { await signOut(); } catch (error) { console.error('Error signing out:', error); }
                  }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/20 text-red-500">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </div>
                  Sign Out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
