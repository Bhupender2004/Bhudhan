// Mock weather data for development and testing

export interface MockWeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt: number;
}

export interface MockForecastData {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    dt_txt: string;
  }[];
}

// Generate mock weather data for a given city
export function getMockWeatherData(city: string): MockWeatherData {
  // Get a deterministic but seemingly random number based on the city name
  const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate temperature between 15 and 35 degrees
  const temp = 15 + (hash % 20);
  
  // Generate humidity between 40 and 90 percent
  const humidity = 40 + (hash % 50);
  
  // Generate wind speed between 1 and 10 m/s
  const windSpeed = 1 + (hash % 9);
  
  // Weather conditions based on hash
  const weatherConditions = [
    { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
    { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' },
    { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
    { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
    { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' },
    { id: 701, main: 'Mist', description: 'mist', icon: '50d' },
  ];
  
  const weatherIndex = hash % weatherConditions.length;
  
  return {
    name: city,
    sys: {
      country: 'IN', // Assuming India for all cities
    },
    main: {
      temp: temp,
      feels_like: temp - 2 + (hash % 4),
      humidity: humidity,
      pressure: 1000 + (hash % 30),
    },
    weather: [weatherConditions[weatherIndex]],
    wind: {
      speed: windSpeed,
      deg: hash % 360,
    },
    visibility: 10000 - (hash % 5000),
    dt: Math.floor(Date.now() / 1000),
  };
}

// Generate mock forecast data for a given city
export function getMockForecastData(city: string): MockForecastData {
  const forecastList = [];
  const now = new Date();
  
  // Generate forecast for next 5 days, every 3 hours
  for (let i = 0; i < 40; i++) {
    const forecastTime = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);
    const hash = city.length + i;
    
    // Temperature varies by time of day and has a slight random component
    const hourOfDay = forecastTime.getHours();
    let baseTemp = 25; // Base temperature
    
    // Temperature is lower at night, higher during the day
    if (hourOfDay >= 0 && hourOfDay < 6) {
      baseTemp = 18;
    } else if (hourOfDay >= 6 && hourOfDay < 12) {
      baseTemp = 22;
    } else if (hourOfDay >= 12 && hourOfDay < 18) {
      baseTemp = 28;
    } else {
      baseTemp = 20;
    }
    
    // Add some variation
    const temp = baseTemp + (hash % 5) - 2;
    
    // Weather conditions based on hash and time
    const weatherConditions = [
      { id: 800, main: 'Clear', description: 'clear sky', icon: hourOfDay >= 6 && hourOfDay < 18 ? '01d' : '01n' },
      { id: 801, main: 'Clouds', description: 'few clouds', icon: hourOfDay >= 6 && hourOfDay < 18 ? '02d' : '02n' },
      { id: 802, main: 'Clouds', description: 'scattered clouds', icon: hourOfDay >= 6 && hourOfDay < 18 ? '03d' : '03n' },
      { id: 803, main: 'Clouds', description: 'broken clouds', icon: hourOfDay >= 6 && hourOfDay < 18 ? '04d' : '04n' },
      { id: 500, main: 'Rain', description: 'light rain', icon: hourOfDay >= 6 && hourOfDay < 18 ? '10d' : '10n' },
    ];
    
    const weatherIndex = (hash + i) % weatherConditions.length;
    
    forecastList.push({
      dt: Math.floor(forecastTime.getTime() / 1000),
      main: {
        temp: temp,
        feels_like: temp - 1,
        humidity: 50 + (hash % 30),
        pressure: 1010 + (hash % 20),
      },
      weather: [weatherConditions[weatherIndex]],
      wind: {
        speed: 2 + (hash % 8),
        deg: (hash * i) % 360,
      },
      visibility: 10000,
      dt_txt: forecastTime.toISOString().slice(0, 19).replace('T', ' '),
    });
  }
  
  return {
    city: {
      name: city,
      country: 'IN',
    },
    list: forecastList,
  };
}
