'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Loader2, CloudSun, CloudRain, Sun, Cloud, Wind, 
  Droplets, Search, MapPin, Thermometer, 
  SunMedium, Waves, Sprout, 
  Navigation, Gauge, Eye, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    icon: string;
    feelsLike: number;
  };
  forecast: {
    date: string;
    day: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    precipitation: number;
  }[];
  hourly: {
    time: string;
    temperature: number;
    condition: string;
    icon: string;
  }[];
  agricultural: {
    soilMoisture: number;
    evaporation: number;
    uvIndex: number;
    rainProbability: number;
    soilTemp: number;
  };
}

export default function WeatherDashboard() {
  const [location, setLocation] = useState('New Delhi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const mapWeatherIconToName = (iconCode: string): string => {
    if (iconCode.includes('01')) return 'sun';
    if (iconCode.includes('02') || iconCode.includes('03')) return 'cloud-sun';
    if (iconCode.includes('04')) return 'cloud';
    if (iconCode.includes('09') || iconCode.includes('10')) return 'cloud-rain';
    return 'cloud-sun';
  };

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const { getCurrentWeather } = await import('@/lib/api/weather');
      const weatherData = await getCurrentWeather(location);

      setWeather({
        location: weatherData.name,
        current: {
          temperature: Math.round(weatherData.main.temp),
          condition: weatherData.weather[0].description,
          humidity: weatherData.main.humidity,
          windSpeed: weatherData.wind.speed,
          pressure: weatherData.main.pressure,
          visibility: weatherData.visibility / 1000,
          icon: mapWeatherIconToName(weatherData.weather[0].icon),
          feelsLike: Math.round(weatherData.main.feels_like || weatherData.main.temp)
        },
        forecast: [
          { day: 'Mon', maxTemp: 32, minTemp: 24, condition: 'Sunny', icon: 'sun', precipitation: 0, date: '1' },
          { day: 'Tue', maxTemp: 33, minTemp: 25, condition: 'Partly Cloudy', icon: 'cloud-sun', precipitation: 10, date: '2' },
          { day: 'Wed', maxTemp: 30, minTemp: 23, condition: 'Rain', icon: 'cloud-rain', precipitation: 60, date: '3' },
          { day: 'Thu', maxTemp: 29, minTemp: 22, condition: 'Rain', icon: 'cloud-rain', precipitation: 70, date: '4' },
          { day: 'Fri', maxTemp: 28, minTemp: 21, condition: 'Cloudy', icon: 'cloud', precipitation: 30, date: '5' },
          { day: 'Sat', maxTemp: 30, minTemp: 22, condition: 'Partly Cloudy', icon: 'cloud-sun', precipitation: 20, date: '6' },
          { day: 'Sun', maxTemp: 31, minTemp: 23, condition: 'Sunny', icon: 'sun', precipitation: 0, date: '7' }
        ],
        hourly: [
          { time: '6 AM', temperature: 26, condition: 'Sunny', icon: 'sun' },
          { time: '9 AM', temperature: 28, condition: 'Sunny', icon: 'sun' },
          { time: '12 PM', temperature: 31, condition: 'Sunny', icon: 'sun' },
          { time: '3 PM', temperature: 32, condition: 'Sunny', icon: 'sun' },
          { time: '6 PM', temperature: 30, condition: 'Partly Cloudy', icon: 'cloud-sun' },
          { time: '9 PM', temperature: 27, condition: 'Partly Cloudy', icon: 'cloud-sun' }
        ],
        agricultural: {
          soilMoisture: 35,
          evaporation: 5.2,
          uvIndex: 8,
          rainProbability: 10,
          soilTemp: 22
        }
      });
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (icon: string, size = "h-6 w-6") => {
    switch (icon) {
      case 'sun': return <Sun className={cn(size, "text-amber-600")} />;
      case 'cloud-sun': return <CloudSun className={cn(size, "text-stone-400")} />;
      case 'cloud': return <Cloud className={cn(size, "text-stone-300")} />;
      case 'cloud-rain': return <CloudRain className={cn(size, "text-blue-500")} />;
      default: return <CloudSun className={cn(size, "text-stone-400")} />;
    }
  };

  if (loading && !weather) {
    return (
      <div className="flex h-64 items-center justify-center bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar - More compact and professional */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input
            type="text"
            placeholder="Search location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
            className="w-full pl-10 h-11 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 rounded-xl focus:ring-green-500/20"
          />
        </div>
        <Button 
          onClick={fetchWeather}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-6 h-11"
        >
          Check Weather
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {weather && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Current Weather - Compact Horizontal Strip */}
            <Card className="lg:col-span-12 border-none shadow-sm bg-stone-50 dark:bg-stone-900 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700">
                      {getWeatherIcon(weather.current.icon, "h-12 w-12")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 font-bold text-xs uppercase tracking-widest mb-1">
                        <MapPin className="h-3 w-3" />
                        {weather.location}
                      </div>
                      <h2 className="text-4xl font-black text-stone-900 dark:text-white leading-none mb-1">
                        {weather.current.temperature}°C
                      </h2>
                      <p className="text-stone-600 dark:text-stone-300 font-medium capitalize">
                        {weather.current.condition} <span className="text-stone-400 dark:text-stone-500 mx-2">•</span> Feels like {weather.current.feelsLike}°
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
                    {[
                      { label: 'Humidity', value: `${weather.current.humidity}%`, icon: Droplets },
                      { label: 'Wind', value: `${weather.current.windSpeed} km/h`, icon: Wind },
                      { label: 'Pressure', value: `${weather.current.pressure} hPa`, icon: Gauge },
                      { label: 'Visibility', value: `${weather.current.visibility} km`, icon: Eye }
                    ].map((stat, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500">
                          <stat.icon className="h-3.5 w-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <p className="text-lg font-bold text-stone-800 dark:text-stone-100">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Left: Forecasts */}
            <div className="lg:col-span-8 space-y-6">
              <Tabs defaultValue="forecast">
                <TabsList className="bg-stone-100 dark:bg-stone-900/50 p-1 rounded-lg border border-stone-200 dark:border-stone-800 h-10 w-fit">
                  <TabsTrigger value="forecast" className="text-xs font-bold px-4 rounded-md">7-Day Forecast</TabsTrigger>
                  <TabsTrigger value="hourly" className="text-xs font-bold px-4 rounded-md">Hourly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="forecast" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                    {weather.forecast.map((day, i) => (
                      <div key={i} className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-center hover:border-green-500/50 transition-colors">
                        <p className="text-[10px] font-black uppercase text-stone-400 mb-3">{day.day}</p>
                        <div className="mb-3 flex justify-center">
                          {getWeatherIcon(day.icon, "h-6 w-6")}
                        </div>
                        <div className="flex justify-center gap-2 items-baseline">
                          <span className="text-base font-black text-stone-900 dark:text-white">{day.maxTemp}°</span>
                          <span className="text-xs font-medium text-stone-400">{day.minTemp}°</span>
                        </div>
                        <p className="text-[9px] font-bold text-blue-500 mt-2">{day.precipitation}% Rain</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="hourly" className="mt-4">
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {weather.hourly.map((hour, i) => (
                      <div key={i} className="min-w-[100px] bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-center">
                        <p className="text-[10px] font-bold text-stone-400 mb-2">{hour.time}</p>
                        <div className="mb-2 flex justify-center">
                          {getWeatherIcon(hour.icon, "h-5 w-5")}
                        </div>
                        <p className="text-lg font-black">{hour.temperature}°</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Agricultural Grid - Simple & Clean */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'Soil Moisture', value: `${weather.agricultural.soilMoisture}%`, icon: Sprout, status: 'Good' },
                  { title: 'UV Index', value: weather.agricultural.uvIndex, icon: SunMedium, status: 'Moderate' },
                  { title: 'Evaporation', value: `${weather.agricultural.evaporation}mm`, icon: Waves, status: 'High' },
                  { title: 'Soil Temp', value: `${weather.agricultural.soilTemp}°C`, icon: Thermometer, status: 'Ideal' }
                ].map((item, i) => (
                  <Card key={i} className="border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-stone-400 mb-2">
                        <item.icon className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.title}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-xl font-black">{item.value}</p>
                        <span className="text-[9px] font-bold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">{item.status}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right: Insights & Alerts */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">Farmer Insights</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-700/50">
                      <div className="flex gap-3">
                        <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-stone-600 dark:text-stone-300 leading-relaxed">
                          Soil moisture is optimal for <span className="text-stone-900 dark:text-white font-bold">Rice transplantation</span>. Next 48 hours show no major rain alerts.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-700/50">
                      <div className="flex gap-3">
                        <Navigation className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-stone-600 dark:text-stone-300 leading-relaxed">
                          Wind speeds are low (<span className="text-stone-900 dark:text-white font-bold">7 km/h</span>). Good time for pesticide application.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold h-10 rounded-lg text-xs shadow-sm">
                    View Full Forecast
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Farming Tips */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Daily Tip</h4>
                <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Maintain soil moisture at 35% for optimal seed germination in current temperatures.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
