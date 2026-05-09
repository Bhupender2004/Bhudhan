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
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-green-600 font-bold tracking-wider uppercase text-[10px] mb-1">
            <CloudSun className="h-3 w-3" />
            <span>Agricultural Intelligence</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">{t('weatherWidget')}</h1>
          <p className="text-stone-500 text-sm max-w-md mt-1">
            {t('weatherWidgetDesc')}
          </p>
        </div>
      </div>

      <WeatherDashboard />
    </div>
  );
}
