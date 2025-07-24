import axios from 'axios';
import { WEATHER_API_CONFIG } from './config';
import { getMockWeatherData, getMockForecastData } from './mock-weather';

// Get current weather by city name
export async function getCurrentWeather(city: string) {
  // Use mock data if configured or if in development mode
  if (WEATHER_API_CONFIG.useMockData || WEATHER_API_CONFIG.apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
    console.log('Using mock weather data for city:', city);
    return getMockWeatherData(city);
  }

  try {
    // Fetching weather data

    const response = await axios.get(`${WEATHER_API_CONFIG.baseUrl}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_CONFIG.apiKey,
        units: WEATHER_API_CONFIG.units,
      },
    });

    // Weather API response received
    return response.data;
  } catch (error) {
    // Error fetching current weather
    if (error && typeof error === 'object' && 'response' in error) {
      // Error details available
    }

    // Fallback to mock data on error
    // Falling back to mock weather data
    return getMockWeatherData(city);
  }
}

// Get 5-day forecast by city name
export async function getForecast(city: string) {
  // Use mock data if configured or if in development mode
  if (WEATHER_API_CONFIG.useMockData || WEATHER_API_CONFIG.apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
    // Using mock forecast data
    return getMockForecastData(city);
  }

  try {
    const response = await axios.get(`${WEATHER_API_CONFIG.baseUrl}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_CONFIG.apiKey,
        units: WEATHER_API_CONFIG.units,
      },
    });

    return response.data;
  } catch (error) {
    // Error fetching weather forecast

    // Fallback to mock data on error
    return getMockForecastData(city);
  }
}

// Get weather by coordinates
export async function getWeatherByCoordinates(lat: number, lon: number) {
  // Use mock data if configured or if in development mode
  if (WEATHER_API_CONFIG.useMockData || WEATHER_API_CONFIG.apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
    console.log('Using mock weather data for coordinates:', lat, lon);
    // Use Delhi as a default city for mock data
    return getMockWeatherData('Delhi');
  }

  try {
    const response = await axios.get(`${WEATHER_API_CONFIG.baseUrl}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_CONFIG.apiKey,
        units: WEATHER_API_CONFIG.units,
      },
    });

    return response.data;
  } catch (error) {
    // Error fetching weather by coordinates

    // Fallback to mock data on error
    return getMockWeatherData('Delhi');
  }
}

// Get agricultural weather data (includes soil moisture, etc.)
export async function getAgriculturalWeather(lat: number, lon: number) {
  try {
    // Note: This is a mock function as OpenWeatherMap doesn't have a specific
    // agricultural endpoint. In a real app, you might use a specialized API
    // or combine data from multiple sources.

    // First, get the standard weather data
    const weatherData = await getWeatherByCoordinates(lat, lon);

    // Add mock agricultural data
    return {
      ...weatherData,
      agricultural: {
        soilMoisture: Math.floor(Math.random() * 50) + 30, // 30-80%
        evaporation: (Math.random() * 8 + 2).toFixed(1), // 2-10 mm/day
        uvIndex: Math.floor(Math.random() * 11), // 0-10
        rainProbability: Math.floor(Math.random() * 100), // 0-100%
      }
    };
  } catch (error) {
    console.error('Error fetching agricultural weather data:', error);

    // Create a fallback response with mock data
    const mockWeather = getMockWeatherData('Delhi');
    return {
      ...mockWeather,
      agricultural: {
        soilMoisture: 45, // 45%
        evaporation: '5.2', // 5.2 mm/day
        uvIndex: 7, // 0-10 scale
        rainProbability: 30, // 30%
      }
    };
  }
}
