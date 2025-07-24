'use client';

import WeatherDashboard from '@/components/weather/weather-dashboard';
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('weatherWidget')}</h1>
        <p className="text-muted-foreground">
          {t('weatherWidgetDesc')}
        </p>
      </div>

      <WeatherDashboard />
    </div>
  );
}
