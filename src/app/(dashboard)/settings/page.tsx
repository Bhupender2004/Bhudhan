'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LanguageSettings from '@/components/settings/language-settings';
import ProfileSettings from '@/components/settings/profile-settings';
import NotificationSettings from '@/components/settings/notification-settings';
import { useLanguage } from '@/lib/context/language-context';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        <p className="text-muted-foreground">
          {t('manageSettings')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="language">{t('languageSettings')}</TabsTrigger>
          <TabsTrigger value="profile">{t('profileSettings')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notificationSettings')}</TabsTrigger>
        </TabsList>

        <TabsContent value="language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('languageSettings')}</CardTitle>
              <CardDescription>
                {t('chooseLanguage')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LanguageSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('profileSettings')}</CardTitle>
              <CardDescription>
                {t('updateProfile')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProfileSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('notificationSettings')}</CardTitle>
              <CardDescription>
                {t('configureNotifications')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading settings...</p>
          </div>
        </div>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}
