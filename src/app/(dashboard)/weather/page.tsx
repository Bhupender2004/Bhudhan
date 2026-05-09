'use client';

import WeatherDashboard from '@/components/weather/weather-dashboard';
import { CloudSun } from 'lucide-react';
// import { useLanguage } from '@/lib/context/language-context';

export default function WeatherPage() {
  // Temporary t function until language context is fixed
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'weatherWidget': 'Weather Dashboard',
      'weatherWidgetDesc': 'View current weather conditions and forecasts for your location.'
    };
    return translations[key] || key;
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-green-600 font-bold tracking-wider uppercase text-xs">
          <CloudSun className="h-3.5 w-3.5" />
          <span>Real-time Insights</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">{t('weatherWidget')}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          {t('weatherWidgetDesc')}
        </p>
      </div>

      <WeatherDashboard />
    </div>
  );
}
