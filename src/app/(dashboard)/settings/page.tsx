'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LanguageSettings from '@/components/settings/language-settings';
import ProfileSettings from '@/components/settings/profile-settings';
import NotificationSettings from '@/components/settings/notification-settings';
import { useLanguage } from '@/lib/context/language-context';
import { User, Bell, Globe, Settings as SettingsIcon } from 'lucide-react';

function SettingsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('language');

  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get('tab');
    if (tabParam && ['language', 'profile', 'notifications'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-green-600 font-bold tracking-wider uppercase text-xs mb-1">
            <SettingsIcon className="h-3 w-3" />
            <span>Preferences</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">{t('settings')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {t('manageSettings')}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 border-b">
          <TabsList className="bg-gray-100 dark:bg-gray-800/50 p-1 h-12 rounded-xl border border-gray-200 dark:border-gray-800">
            <TabsTrigger 
              value="language" 
              className="rounded-lg px-6 h-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-sm transition-all gap-2 font-semibold"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t('languageSettings')}</span>
              <span className="sm:hidden">Language</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="rounded-lg px-6 h-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-sm transition-all gap-2 font-semibold"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t('profileSettings')}</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="rounded-lg px-6 h-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-sm transition-all gap-2 font-semibold"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">{t('notificationSettings')}</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <TabsContent value="language" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <CardHeader className="pb-4 border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">{t('languageSettings')}</CardTitle>
                      <CardDescription className="text-sm">
                        {t('chooseLanguage')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <LanguageSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <CardHeader className="pb-4 border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">{t('profileSettings')}</CardTitle>
                      <CardDescription className="text-sm">
                        {t('updateProfile')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ProfileSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <CardHeader className="pb-4 border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">{t('notificationSettings')}</CardTitle>
                      <CardDescription className="text-sm">
                        {t('configureNotifications')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <NotificationSettings />
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mx-auto mb-6"></div>
            <p className="text-lg font-medium animate-pulse text-muted-foreground">Synchronizing your preferences...</p>
          </div>
        </div>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}
