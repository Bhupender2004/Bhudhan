'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Loader2, CloudSun, CloudRain, Sun, Cloud, Wind, 
  Droplets, Search, MapPin, Thermometer, 
  SunMedium, Umbrella, Waves, Sprout, 
  ArrowUpRight, Navigation, Gauge, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
  const [error, setError] = useState<string | null>(null);

  const mapWeatherIconToName = (iconCode: string): string => {
    if (iconCode.includes('01')) return 'sun';
    if (iconCode.includes('02') || iconCode.includes('03')) return 'cloud-sun';
    if (iconCode.includes('04')) return 'cloud';
    if (iconCode.includes('09') || iconCode.includes('10')) return 'cloud-rain';
    if (iconCode.includes('11')) return 'cloud-lightning';
    if (iconCode.includes('13')) return 'cloud-snow';
    if (iconCode.includes('50')) return 'cloud-fog';
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
          { day: 'Today', maxTemp: 32, minTemp: 24, condition: 'Sunny', icon: 'sun', precipitation: 0, date: '1' },
          { day: 'Tomorrow', maxTemp: 33, minTemp: 25, condition: 'Partly Cloudy', icon: 'cloud-sun', precipitation: 10, date: '2' },
          { day: 'Friday', maxTemp: 30, minTemp: 23, condition: 'Rain', icon: 'cloud-rain', precipitation: 60, date: '3' },
          { day: 'Saturday', maxTemp: 29, minTemp: 22, condition: 'Rain', icon: 'cloud-rain', precipitation: 70, date: '4' },
          { day: 'Sunday', maxTemp: 28, minTemp: 21, condition: 'Cloudy', icon: 'cloud', precipitation: 30, date: '5' },
          { day: 'Monday', maxTemp: 30, minTemp: 22, condition: 'Partly Cloudy', icon: 'cloud-sun', precipitation: 20, date: '6' },
          { day: 'Tuesday', maxTemp: 31, minTemp: 23, condition: 'Sunny', icon: 'sun', precipitation: 0, date: '7' }
        ],
        hourly: [
          { time: '06:00', temperature: 26, condition: 'Sunny', icon: 'sun' },
          { time: '09:00', temperature: 28, condition: 'Sunny', icon: 'sun' },
          { time: '12:00', temperature: 31, condition: 'Sunny', icon: 'sun' },
          { time: '15:00', temperature: 32, condition: 'Sunny', icon: 'sun' },
          { time: '18:00', temperature: 30, condition: 'Partly Cloudy', icon: 'cloud-sun' },
          { time: '21:00', temperature: 27, condition: 'Partly Cloudy', icon: 'cloud-sun' },
          { time: '00:00', temperature: 25, condition: 'Cloudy', icon: 'cloud' }
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
  }, [location]);

  const handleLocationChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof location === 'string' && location.trim()) {
      fetchWeather();
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { getWeatherByCoordinates } = await import('@/lib/api/weather');
            const weatherData = await getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
            setLocation(weatherData.name);
            setLoading(false);
          } catch {
            setError('Failed to fetch weather for your location');
            setLoading(false);
          }
        },
        () => {
          setError('Unable to retrieve your location');
          setLoading(false);
        }
      );
    }
  };

  const getWeatherIcon = (icon: string, size = "h-8 w-8") => {
    switch (icon) {
      case 'sun': return <Sun className={cn(size, "text-amber-500")} />;
      case 'cloud-sun': return <CloudSun className={cn(size, "text-sky-400")} />;
      case 'cloud': return <Cloud className={cn(size, "text-slate-400")} />;
      case 'cloud-rain': return <CloudRain className={cn(size, "text-blue-500")} />;
      default: return <CloudSun className={cn(size, "text-sky-400")} />;
    }
  };

  if (loading && !weather) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-green-600 mx-auto" />
          <p className="text-muted-foreground font-medium">Gathering agricultural insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Location Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white/50 dark:bg-gray-900/50 p-2 rounded-2xl border border-border shadow-sm">
        <form onSubmit={handleLocationChange} className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search city for farming weather..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 h-12 bg-transparent border-none focus-visible:ring-0 text-base font-medium"
          />
        </form>
        <div className="h-8 w-[1px] bg-border hidden md:block" />
        <Button 
          variant="ghost" 
          onClick={handleUseCurrentLocation}
          className="h-12 px-6 rounded-xl text-green-700 dark:text-green-400 font-bold hover:bg-green-50 dark:hover:bg-green-900/20 gap-2 w-full md:w-auto"
        >
          <MapPin className="h-4 w-4" />
          Current Location
        </Button>
        <Button 
          type="submit"
          onClick={() => fetchWeather()}
          className="h-12 px-8 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-600/20 w-full md:w-auto"
        >
          Search
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {weather && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Main Weather Card */}
            <div className="relative overflow-hidden rounded-3xl group">
              {/* Sky Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 dark:from-sky-900 dark:via-blue-900 dark:to-indigo-950 transition-all duration-700 group-hover:scale-105" />
              
              {/* Decorative Clouds/Atmosphere */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

              <div className="relative p-8 md:p-12 text-white z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-3 py-1 bg-white/20 rounded-full w-fit backdrop-blur-md border border-white/20">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-xs font-bold uppercase tracking-wider">{weather.location}</span>
                    </div>
                    <div>
                      <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-2">
                        {weather.current.temperature}°
                      </h2>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl md:text-3xl font-bold capitalize opacity-90">{weather.current.condition}</span>
                        <div className="h-6 w-[1px] bg-white/30" />
                        <span className="text-lg font-medium opacity-70">Feels like {weather.current.feelsLike}°</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 animate-float">
                    {getWeatherIcon(weather.current.icon, "h-32 w-32 md:h-48 md:w-48 text-white filter drop-shadow-2xl")}
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                    {[
                      { icon: Droplets, label: 'Humidity', value: `${weather.current.humidity}%`, color: 'bg-blue-500/20' },
                      { icon: Wind, label: 'Wind', value: `${weather.current.windSpeed} km/h`, color: 'bg-indigo-500/20' },
                      { icon: Gauge, label: 'Pressure', value: `${weather.current.pressure} hPa`, color: 'bg-emerald-500/20' },
                      { icon: Eye, label: 'Visibility', value: `${weather.current.visibility} km`, color: 'bg-amber-500/20' }
                    ].map((stat, i) => (
                      <div key={i} className={cn("p-4 rounded-2xl backdrop-blur-xl border border-white/20 transition-transform hover:scale-105", stat.color)}>
                        <stat.icon className="h-5 w-5 mb-2 opacity-80" />
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="forecast" className="space-y-6">
              <TabsList className="flex w-full max-w-2xl bg-white/50 dark:bg-gray-900/50 p-1.5 rounded-2xl border border-border shadow-sm h-16">
                <TabsTrigger value="forecast" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md font-bold text-base transition-all gap-2 h-full">
                  <SunMedium className="h-4 w-4" />
                  7-Day
                </TabsTrigger>
                <TabsTrigger value="hourly" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md font-bold text-base transition-all gap-2 h-full">
                  <Navigation className="h-4 w-4" />
                  Hourly
                </TabsTrigger>
                <TabsTrigger value="agricultural" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md font-bold text-base transition-all gap-2 h-full">
                  <Sprout className="h-4 w-4" />
                  Farming
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forecast">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {weather.forecast.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden bg-white/50 dark:bg-gray-900/30">
                        <CardHeader className="pb-2 pt-6 text-center border-b border-border/50">
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{day.day}</p>
                        </CardHeader>
                        <CardContent className="pt-6 pb-6 text-center space-y-4">
                          <div className="mx-auto transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                            {getWeatherIcon(day.icon, "h-10 w-10 mx-auto")}
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-xl font-bold">{day.maxTemp}°</span>
                              <span className="text-sm font-medium text-muted-foreground">{day.minTemp}°</span>
                            </div>
                            <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 mt-1 uppercase tracking-tight">
                              {day.precipitation}% Rain
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hourly">
                <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-900/30 overflow-hidden">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-xl">Hourly Outlook</CardTitle>
                    <CardDescription>Precision data for next 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex gap-2 overflow-x-auto p-6 scrollbar-hide">
                      {weather.hourly.map((hour, i) => (
                        <div key={i} className="flex min-w-[120px] flex-col items-center p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-default border border-transparent hover:border-border">
                          <p className="text-sm font-bold text-muted-foreground">{hour.time}</p>
                          <div className="my-4">
                            {getWeatherIcon(hour.icon, "h-8 w-8")}
                          </div>
                          <p className="text-2xl font-black">{hour.temperature}°</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">{hour.condition}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="agricultural">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Farming Metrics Grid */}
                  <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        title: 'Soil Moisture', 
                        value: `${weather.agricultural.soilMoisture}%`, 
                        icon: Droplets, 
                        desc: weather.agricultural.soilMoisture < 30 ? 'Irrigation Required' : 'Adequate Levels',
                        color: 'emerald',
                        progress: weather.agricultural.soilMoisture
                      },
                      { 
                        title: 'Soil Temperature', 
                        value: `${weather.agricultural.soilTemp}°C`, 
                        icon: Thermometer, 
                        desc: 'Ideal for wheat & rice',
                        color: 'amber',
                        progress: (weather.agricultural.soilTemp / 40) * 100
                      },
                      { 
                        title: 'UV Index', 
                        value: weather.agricultural.uvIndex, 
                        icon: Sun, 
                        desc: weather.agricultural.uvIndex > 7 ? 'High - Shade needed' : 'Safe for growth',
                        color: 'orange',
                        progress: (weather.agricultural.uvIndex / 12) * 100
                      },
                      { 
                        title: 'Evaporation', 
                        value: `${weather.agricultural.evaporation}mm`, 
                        icon: Waves, 
                        desc: 'Monitor water loss',
                        color: 'blue',
                        progress: (weather.agricultural.evaporation / 10) * 100
                      }
                    ].map((item, i) => (
                      <Card key={i} className="border-none shadow-md overflow-hidden bg-white/50 dark:bg-gray-900/30">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-xl", item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : item.color === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : item.color === 'orange' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400')}>
                              <item.icon className="h-6 w-6" />
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{item.title}</p>
                              <p className="text-3xl font-black">{item.value}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 w-full bg-border/50 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                className={cn("h-full rounded-full", item.color === 'emerald' ? 'bg-emerald-500' : item.color === 'amber' ? 'bg-amber-500' : item.color === 'orange' ? 'bg-orange-500' : 'bg-blue-500')} 
                              />
                            </div>
                            <p className="text-xs font-bold text-muted-foreground">{item.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recommendations Sideboard */}
                  <Card className="border-none bg-green-600 text-white shadow-xl shadow-green-600/20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Sprout className="h-32 w-32" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <ArrowUpRight className="h-5 w-5" />
                        AI Insights
                      </CardTitle>
                      <CardDescription className="text-green-100 font-medium">Daily farming guide</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        { icon: Droplets, text: weather.agricultural.soilMoisture < 30 ? 'Activate irrigation system immediately' : 'Soil moisture looks healthy' },
                        { icon: Umbrella, text: weather.agricultural.rainProbability > 50 ? 'Avoid chemical spraying today' : 'Good day for fertilizer application' },
                        { icon: SunMedium, text: 'Peak heat between 12pm - 3pm' }
                      ].map((rec, i) => (
                        <div key={i} className="flex items-start gap-4 p-3 bg-white/10 rounded-xl border border-white/10">
                          <rec.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-semibold leading-relaxed">{rec.text}</p>
                        </div>
                      ))}
                      <Button className="w-full bg-white text-green-700 hover:bg-green-50 font-black h-12 rounded-xl mt-4">
                        Full Agronomy Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
