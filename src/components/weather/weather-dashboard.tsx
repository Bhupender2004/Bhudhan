'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CloudSun, CloudRain, Sun, Cloud, Wind, Droplets } from 'lucide-react';

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
  };
}

export default function WeatherDashboard() {
  const [location, setLocation] = useState('New Delhi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Map OpenWeatherMap icon codes to our internal icon names
  const mapWeatherIconToName = (iconCode: string): string => {
    // OpenWeatherMap icon codes: https://openweathermap.org/weather-conditions
    if (iconCode.includes('01')) return 'sun'; // clear sky
    if (iconCode.includes('02') || iconCode.includes('03')) return 'cloud-sun'; // few/scattered clouds
    if (iconCode.includes('04')) return 'cloud'; // broken/overcast clouds
    if (iconCode.includes('09') || iconCode.includes('10')) return 'cloud-rain'; // rain
    if (iconCode.includes('11')) return 'cloud-lightning'; // thunderstorm
    if (iconCode.includes('13')) return 'cloud-snow'; // snow
    if (iconCode.includes('50')) return 'cloud-fog'; // mist/fog
    return 'cloud-sun'; // default
  };

  // Fetch real weather data from OpenWeatherMap API
  const fetchWeather = async () => {
    try {
      setLoading(true);

      // Import the weather API functions
      const { getCurrentWeather } = await import('@/lib/api/weather');

      // Fetch current weather data
      const weatherData = await getCurrentWeather(location);

      setWeather({
        location: weatherData.name,
        current: {
          temperature: Math.round(weatherData.main.temp),
          condition: weatherData.weather[0].description,
          humidity: weatherData.main.humidity,
          windSpeed: weatherData.wind.speed,
          pressure: weatherData.main.pressure,
          visibility: weatherData.visibility / 1000, // Convert to km
          icon: mapWeatherIconToName(weatherData.weather[0].icon)
        },
        forecast: [
          {
            date: '2025-04-09',
            day: 'Today',
            maxTemp: 32,
            minTemp: 24,
            condition: 'Sunny',
            icon: 'sun',
            precipitation: 0
          },
          {
            date: '2025-04-10',
            day: 'Tomorrow',
            maxTemp: 33,
            minTemp: 25,
            condition: 'Partly Cloudy',
            icon: 'cloud-sun',
            precipitation: 10
          },
          {
            date: '2025-04-11',
            day: 'Friday',
            maxTemp: 30,
            minTemp: 23,
            condition: 'Rain',
            icon: 'cloud-rain',
            precipitation: 60
          },
          {
            date: '2025-04-12',
            day: 'Saturday',
            maxTemp: 29,
            minTemp: 22,
            condition: 'Rain',
            icon: 'cloud-rain',
            precipitation: 70
          },
          {
            date: '2025-04-13',
            day: 'Sunday',
            maxTemp: 28,
            minTemp: 21,
            condition: 'Cloudy',
            icon: 'cloud',
            precipitation: 30
          },
          {
            date: '2025-04-14',
            day: 'Monday',
            maxTemp: 30,
            minTemp: 22,
            condition: 'Partly Cloudy',
            icon: 'cloud-sun',
            precipitation: 20
          },
          {
            date: '2025-04-15',
            day: 'Tuesday',
            maxTemp: 31,
            minTemp: 23,
            condition: 'Sunny',
            icon: 'sun',
            precipitation: 0
          }
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
          rainProbability: 10
        }
      });
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleLocationChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof location === 'string' && location.trim()) {
      fetchWeather();
    }
  };

  // Add geolocation support for 'Use Current Location' button
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Import the weather API functions
            const { getWeatherByCoordinates } = await import('@/lib/api/weather');
            const weatherData = await getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
            setLocation(weatherData.name);
            setWeather({
              location: weatherData.name,
              current: {
                temperature: Math.round(weatherData.main.temp),
                condition: weatherData.weather[0].description,
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed,
                pressure: weatherData.main.pressure,
                visibility: weatherData.visibility / 1000, // Convert to km
                icon: mapWeatherIconToName(weatherData.weather[0].icon)
              },
              forecast: [
                {
                  date: '2025-04-09',
                  day: 'Today',
                  maxTemp: 32,
                  minTemp: 24,
                  condition: 'Sunny',
                  icon: 'sun',
                  precipitation: 0
                },
                {
                  date: '2025-04-10',
                  day: 'Tomorrow',
                  maxTemp: 33,
                  minTemp: 25,
                  condition: 'Partly Cloudy',
                  icon: 'cloud-sun',
                  precipitation: 10
                },
                {
                  date: '2025-04-11',
                  day: 'Friday',
                  maxTemp: 30,
                  minTemp: 23,
                  condition: 'Rain',
                  icon: 'cloud-rain',
                  precipitation: 60
                },
                {
                  date: '2025-04-12',
                  day: 'Saturday',
                  maxTemp: 29,
                  minTemp: 22,
                  condition: 'Rain',
                  icon: 'cloud-rain',
                  precipitation: 70
                },
                {
                  date: '2025-04-13',
                  day: 'Sunday',
                  maxTemp: 28,
                  minTemp: 21,
                  condition: 'Cloudy',
                  icon: 'cloud',
                  precipitation: 30
                },
                {
                  date: '2025-04-14',
                  day: 'Monday',
                  maxTemp: 30,
                  minTemp: 22,
                  condition: 'Partly Cloudy',
                  icon: 'cloud-sun',
                  precipitation: 20
                },
                {
                  date: '2025-04-15',
                  day: 'Tuesday',
                  maxTemp: 31,
                  minTemp: 23,
                  condition: 'Sunny',
                  icon: 'sun',
                  precipitation: 0
                }
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
              agricultural: weather?.agricultural || {
                soilMoisture: 35,
                evaporation: 5.2,
                uvIndex: 8,
                rainProbability: 10
              }
            });
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
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloud-sun':
        return <CloudSun className="h-8 w-8 text-blue-400" />;
      case 'cloud':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case 'cloud-rain':
        return <CloudRain className="h-8 w-8 text-blue-600" />;
      default:
        return <CloudSun className="h-8 w-8 text-blue-400" />;
    }
  };

  if (loading && !weather) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-2/3">
          <form onSubmit={handleLocationChange} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter city or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="w-full md:w-1/3">
          <Button variant="outline" className="w-full" onClick={handleUseCurrentLocation}>
            Use Current Location
          </Button>
        </div>
      </div>

      {weather && (
        <>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 text-white">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="text-2xl font-bold">{weather.location}</h2>
                  <p className="text-lg">{weather.current.condition}</p>
                </div>
                <div className="flex items-center gap-4">
                  {getWeatherIcon(weather.current.icon)}
                  <span className="text-5xl font-bold">{weather.current.temperature}°C</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Humidity</p>
                      <p>{weather.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Wind</p>
                      <p>{weather.current.windSpeed} km/h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="forecast">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
              <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
              <TabsTrigger value="agricultural">Agricultural Data</TabsTrigger>
            </TabsList>

            <TabsContent value="forecast" className="mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                {weather.forecast.map((day) => (
                  <Card key={day.date}>
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="text-center text-sm">{day.day}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4 pt-0 text-center">
                      <div className="mb-2 flex justify-center">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <p className="text-sm">{day.condition}</p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <span className="font-medium">{day.maxTemp}°</span>
                        <span className="text-muted-foreground">{day.minTemp}°</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Rain: {day.precipitation}%
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hourly" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Forecast</CardTitle>
                  <CardDescription>
                    Hourly temperature and conditions for the next 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {weather.hourly.map((hour) => (
                      <div key={hour.time} className="flex min-w-[100px] flex-col items-center">
                        <p className="font-medium">{hour.time}</p>
                        <div className="my-2">
                          {getWeatherIcon(hour.icon)}
                        </div>
                        <p className="text-lg font-bold">{hour.temperature}°</p>
                        <p className="text-xs text-muted-foreground">{hour.condition}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agricultural" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agricultural Weather Data</CardTitle>
                  <CardDescription>
                    Specialized weather information for farming activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-green-50 p-4">
                      <h3 className="mb-2 font-medium">Soil Moisture</h3>
                      <p className="text-2xl font-bold">{weather.agricultural.soilMoisture}%</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {weather.agricultural.soilMoisture < 30 ? 'Low - Irrigation needed' : 'Adequate'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-2 font-medium">Evaporation Rate</h3>
                      <p className="text-2xl font-bold">{weather.agricultural.evaporation} mm/day</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {weather.agricultural.evaporation > 5 ? 'High - Monitor water needs' : 'Normal'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-yellow-50 p-4">
                      <h3 className="mb-2 font-medium">UV Index</h3>
                      <p className="text-2xl font-bold">{weather.agricultural.uvIndex}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {weather.agricultural.uvIndex > 7 ? 'High - Protect sensitive crops' : 'Moderate'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-indigo-50 p-4">
                      <h3 className="mb-2 font-medium">Rain Probability</h3>
                      <p className="text-2xl font-bold">{weather.agricultural.rainProbability}%</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {weather.agricultural.rainProbability > 50 ? 'High - Plan accordingly' : 'Low'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-medium">Farming Recommendations</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 rounded-full bg-green-100 p-1">✓</span>
                        <span>
                          {weather.agricultural.soilMoisture < 30
                            ? 'Irrigation recommended for optimal crop growth'
                            : 'Soil moisture levels are adequate for most crops'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 rounded-full bg-green-100 p-1">✓</span>
                        <span>
                          {weather.agricultural.uvIndex > 7
                            ? 'Consider providing shade for sensitive crops'
                            : 'UV levels are moderate - normal precautions sufficient'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 rounded-full bg-green-100 p-1">✓</span>
                        <span>
                          {weather.agricultural.rainProbability > 50
                            ? 'Delay outdoor activities like spraying or fertilizing'
                            : 'Good conditions for outdoor farming activities'}
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
