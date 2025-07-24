'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Loader2, TrendingUp, TrendingDown, RefreshCw, MapPin } from 'lucide-react';
import { getStates, getDistricts } from '@/lib/api/crop-prices';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CropPrice {
  name: string;
  price: number;
  change: number;
  state?: string;
  district?: string;
  market?: string;
}

export default function CropPriceWidget() {
  const [prices, setPrices] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'crop' | 'location'>('crop');
  const [refreshing, setRefreshing] = useState(false);

  // Define all available crops
  const allCrops = useMemo(() => [
    { name: 'Wheat', price: 2250, change: 50 },
    { name: 'Rice', price: 3800, change: -30 },
    { name: 'Cotton', price: 6500, change: 120 },
    { name: 'Soybean', price: 4200, change: 75 },
    { name: 'Maize', price: 1950, change: 25 },
    { name: 'Barley', price: 2100, change: -15 },
    { name: 'Sugarcane', price: 350, change: 10 },
    { name: 'Potato', price: 1800, change: -45 },
    { name: 'Onion', price: 2500, change: 200 },
    { name: 'Tomato', price: 2800, change: -150 },
    { name: 'Mustard', price: 5200, change: 80 },
    { name: 'Groundnut', price: 5800, change: 110 },
  ], []);

  // Define states and districts (fallback data)
  const [stateData, setStateData] = useState<Record<string, string[]>>({
    'all': ['all'],
    'Haryana': ['all', 'Rewari', 'Gurugram', 'Hisar', 'Karnal', 'Ambala'],
    'Punjab': ['all', 'Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda'],
    'Uttar Pradesh': ['all', 'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut'],
    'Rajasthan': ['all', 'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner'],
    'Maharashtra': ['all', 'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Karnataka': ['all', 'Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belgaum'],
    'Tamil Nadu': ['all', 'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    'Andhra Pradesh': ['all', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
    'Telangana': ['all', 'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
    'West Bengal': ['all', 'Kolkata', 'Asansol', 'Siliguri', 'Durgapur', 'Bardhaman'],
  });

  // Fetch real states from API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statesData = await getStates();
        if (statesData && statesData.records && statesData.records.length > 0) {
          const newStateData: { [key: string]: string[] } = { 'all': ['all'] };

          // Add each state from the API
          statesData.records.forEach((stateRecord: { state: string }) => {
            const stateName = stateRecord.state;
            if (stateName && !newStateData[stateName]) {
              newStateData[stateName] = ['all'];
            }
          });

          setStateData(prevState => ({ ...prevState, ...newStateData }));
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        // Keep using the fallback state data
      }
    };

    fetchStates();
  }, []);

  // Define types for location-based crop prices
  type CropPriceInfo = { base: number; variance: number };
  type LocationBasedPrices = {
    [state: string]: {
      [crop: string]: CropPriceInfo;
    };
  };
  
  // Define location-based crop prices
  const locationBasedPrices: LocationBasedPrices = useMemo(() => ({
    'Haryana': {
      'Wheat': { base: 2300, variance: 100 },
      'Rice': { base: 3900, variance: 200 },
      'Cotton': { base: 6600, variance: 300 },
      'Mustard': { base: 5300, variance: 150 },
    },
    'Punjab': {
      'Wheat': { base: 2280, variance: 120 },
      'Rice': { base: 4000, variance: 180 },
      'Cotton': { base: 6550, variance: 250 },
      'Maize': { base: 2050, variance: 100 },
    },
    'Uttar Pradesh': {
      'Wheat': { base: 2200, variance: 150 },
      'Rice': { base: 3750, variance: 200 },
      'Sugarcane': { base: 370, variance: 30 },
      'Potato': { base: 1750, variance: 150 },
    },
    'Rajasthan': {
      'Wheat': { base: 2180, variance: 120 },
      'Barley': { base: 2150, variance: 100 },
      'Mustard': { base: 5250, variance: 200 },
      'Groundnut': { base: 5700, variance: 250 },
    },
    'Maharashtra': {
      'Cotton': { base: 6450, variance: 300 },
      'Soybean': { base: 4250, variance: 200 },
      'Onion': { base: 2600, variance: 400 },
      'Sugarcane': { base: 360, variance: 40 },
    },
    'Karnataka': {
      'Rice': { base: 3850, variance: 150 },
      'Maize': { base: 1980, variance: 120 },
      'Sugarcane': { base: 355, variance: 35 },
      'Cotton': { base: 6480, variance: 280 },
    },
    'Tamil Nadu': {
      'Rice': { base: 3950, variance: 180 },
      'Sugarcane': { base: 365, variance: 25 },
      'Cotton': { base: 6520, variance: 270 },
      'Groundnut': { base: 5850, variance: 200 },
    },
    'Andhra Pradesh': {
      'Rice': { base: 3880, variance: 170 },
      'Cotton': { base: 6550, variance: 250 },
      'Groundnut': { base: 5900, variance: 220 },
      'Tomato': { base: 2900, variance: 500 },
    },
    'Telangana': {
      'Rice': { base: 3830, variance: 160 },
      'Cotton': { base: 6580, variance: 270 },
      'Maize': { base: 1970, variance: 110 },
      'Tomato': { base: 2850, variance: 450 },
    },
    'West Bengal': {
      'Rice': { base: 3920, variance: 190 },
      'Potato': { base: 1850, variance: 200 },
      'Mustard': { base: 5150, variance: 180 },
      'Maize': { base: 1930, variance: 100 },
    },
  }), []);

  // State for available districts
  const [availableDistricts, setAvailableDistricts] = useState<string[]>(stateData[selectedState] || ['all']);

  // Update available districts when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState === 'all') {
        setAvailableDistricts(['all']);
        return;
      }

      try {
        // Try to fetch districts from the API
        if (selectedState !== 'all') {
          const districtsData = await getDistricts(selectedState);
          if (districtsData && districtsData.records && districtsData.records.length > 0) {
            const districts = ['all'];

            // Add each district from the API
            districtsData.records.forEach((districtRecord: { district: string }) => {
              const districtName = districtRecord.district;
              if (districtName && !districts.includes(districtName)) {
                districts.push(districtName);
              }
            });

            setAvailableDistricts(districts);
            setSelectedDistrict('all');
            return;
          }
        }
      } catch (error) {
        console.error(`Error fetching districts for ${selectedState}:`, error);
        // Fall back to the static data
      }

      // Fallback to static data if API fails or returns no results
      if (selectedState in stateData) {
        setAvailableDistricts(stateData[selectedState]);
        setSelectedDistrict('all');
      } else {
        setAvailableDistricts(['all']);
      }
    };

    fetchDistricts();
  }, [selectedState, stateData]);


  const fetchPrices = useCallback(async ({ crop, state, district, mode }: { crop: string; state: string; district: string; mode: string }) => {
    setLoading(true);
    setError(null);

    try {
      let result: CropPrice[] = [];

      if (mode === 'crop') {
        // Filter allCrops by selected crop
        let filtered = allCrops;
        if (crop !== 'all') {
          filtered = allCrops.filter(c => c.name.toLowerCase() === crop.toLowerCase());
        }
        result = filtered.map(c => ({
          ...c,
          state: undefined,
          district: undefined,
        }));
      } else if (mode === 'location') {
        // Show prices by location
        if (state !== 'all' && locationBasedPrices[state]) {
          const cropsInState = locationBasedPrices[state];
          result = Object.entries(cropsInState).map(([cropName, priceObj]) => {
            // Randomize price within variance for demo
            const price = priceObj.base + Math.floor(Math.random() * priceObj.variance) - Math.floor(priceObj.variance / 2);
            const change = Math.floor(Math.random() * 200) - 100;
            return {
              name: cropName,
              price,
              change,
              state,
              district: district !== 'all' ? district : undefined,
            };
          });
        } else {
          // If 'all' or state not found, show nothing
          result = [];
        }
      }

      setPrices(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to fetch crop prices.');
      } else {
        setError('Failed to fetch crop prices.');
      }
      setPrices([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [allCrops, locationBasedPrices]);

  useEffect(() => {
    fetchPrices({
      crop: selectedCrop,
      state: selectedState,
      district: selectedDistrict,
      mode: viewMode
    });
  }, [selectedCrop, selectedState, selectedDistrict, viewMode, fetchPrices]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPrices({
      crop: selectedCrop,
      state: selectedState,
      district: selectedDistrict,
      mode: viewMode
    });
  };

  if (loading) {
    return (
      <div className="flex h-[150px] items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[150px] flex-col items-center justify-center text-center">
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'crop' | 'location')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-7">
          <TabsTrigger value="crop" className="text-xs">By Crop</TabsTrigger>
          <TabsTrigger value="location" className="text-xs">By Location</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between gap-1">
        {viewMode === 'crop' ? (
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full h-7 text-xs">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {allCrops.map((crop) => (
                <SelectItem key={crop.name} value={crop.name.toLowerCase()}>
                  {crop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="flex items-center gap-1 w-full">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full h-7 text-xs">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {Object.keys(stateData).filter(state => state !== 'all').map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedState !== 'all' && (
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-full h-7 text-xs">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 flex-shrink-0"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-1 overflow-y-auto max-h-[150px] pr-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {prices.map((crop) => (
          <div key={`${crop.name}-${crop.state}-${crop.district}`} className="flex flex-col gap-0.5 border-b border-gray-100 pb-1 last:border-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{crop.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">₹{crop.price}/q</span>
                <div className={`flex items-center text-xs ${crop.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crop.change > 0 ? (
                    <TrendingUp className="mr-0.5 h-2.5 w-2.5" />
                  ) : (
                    <TrendingDown className="mr-0.5 h-2.5 w-2.5" />
                  )}
                  {Math.abs(crop.change)}
                </div>
              </div>
            </div>

            {(crop.state || crop.district) && (
              <div className="flex items-center text-xs text-muted-foreground">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <MapPin className="h-2.5 w-2.5 mr-0.5" />
                        <span className="truncate text-[10px]">
                          {crop.state}{crop.district && crop.district !== 'All Districts' ? `, ${crop.district}` : ''}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{crop.state}{crop.district && crop.district !== 'All Districts' ? `, ${crop.district}` : ''}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        ))}

        {prices.length === 0 && !loading && !error && (
          <div className="py-2 text-center text-xs text-muted-foreground">
            No crop prices available
          </div>
        )}
      </div>
    </div>
  );
}
