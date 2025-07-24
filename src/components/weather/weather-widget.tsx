'use client';

import { useState, useEffect } from 'react';
import { CloudSun, Loader2, RefreshCw, Droplets, Wind } from 'lucide-react';
import Image from 'next/image';
// import { useLanguage } from '@/lib/context/language-context';
import { getCurrentWeather } from '@/lib/api/weather';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export default function WeatherWidget() {
  // Temporary t function until language context is fixed
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'currentWeather': 'Current Weather',
      'temperature': 'Temperature',
      'humidity': 'Humidity',
      'windSpeed': 'Wind Speed',
      'feelsLike': 'Feels Like',
      'pressure': 'Pressure',
      'visibility': 'Visibility',
      'searchLocation': 'Search location',
      'search': 'Search',
      'refresh': 'Refresh',
      'loading': 'Loading weather data...',
      'errorFetchingWeather': 'Error fetching weather data',
      'tryAgain': 'Try again',
      'weatherUpdated': 'Weather data updated',
      'weatherFor': 'Weather for',
      'enterCity': 'Enter city',
      'usingMockWeather': 'Using mock weather data'
    };
    return translations[key] || key;
  };
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch real weather data
      const weatherData = await getCurrentWeather(cityName);

      setWeather({
        location: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        icon: weatherData.weather[0].icon,
      });
      setLoading(false);
    } catch (err) {
      console.error('Weather API error:', err);
      setError(t('errorFetchingWeather'));
      setLoading(false);
      // Optionally, you can still use mock data as a fallback by uncommenting below:
      /*
      const mockWeatherData = {
        location: cityName,
        country: 'IN',
        temperature: 32,
        description: 'clear sky',
        humidity: 65,
        windSpeed: 3.5,
        icon: '01d',
      };
      setWeather(mockWeatherData);
      toast.warning(t('usingMockWeather'));
      */
    }
  };

  useEffect(() => {
    fetchWeatherData('Delhi');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWeatherData(city || 'Delhi').finally(() => {
      setRefreshing(false);
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  if (loading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-24 flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => fetchWeatherData('Delhi')}>
          {t('tryAgain')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder={t('enterCity')}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="outline" size="icon">
          <CloudSun className="h-4 w-4" />
        </Button>
      </form>

      {weather && (
        <div className="space-y-3 bg-primary/5 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-xs text-muted-foreground capitalize">{weather.description}</p>
            </div>
            {weather.icon && weather.description && (
              <Image
                src={getWeatherIcon(weather.icon)}
                alt={weather.description}
                width={50}
                height={50}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-blue-500" />
              <p className="text-muted-foreground">{t('humidity')}:</p>
              <p>{weather.humidity}%</p>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3 text-blue-500" />
              <p className="text-muted-foreground">{t('windSpeed')}:</p>
              <p>{weather.windSpeed} m/s</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <p className="text-muted-foreground">{weather.location}, {weather.country}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
