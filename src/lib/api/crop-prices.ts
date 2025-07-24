import axios from 'axios';

// Get crop prices from our Next.js API route
export async function getCropPrices(state?: string, district?: string, market?: string, crop?: string) {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (state) params.append('state', state);
    if (district) params.append('district', district);
    if (market) params.append('market', market);
    if (crop) params.append('crop', crop);

    // Make request to our Next.js API route
    const response = await axios.get(`/api/crop-prices?${params.toString()}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching crop prices:', error);
    throw error;
  }
}

// Get list of states
export async function getStates() {
  try {
    const response = await axios.get('/api/crop-prices/states');
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
}

// Get list of districts for a state
export async function getDistricts(state: string) {
  try {
    const response = await axios.get(`/api/crop-prices/districts?state=${encodeURIComponent(state)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
}

// Get list of markets for a district
export async function getMarkets(state: string, district: string) {
  try {
    const params = new URLSearchParams();
    params.append('state', state);
    params.append('district', district);

    const response = await axios.get(`/api/crop-prices/markets?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching markets:', error);
    throw error;
  }
}

// Get list of crops
export async function getCrops() {
  try {
    const response = await axios.get('/api/crop-prices/crops');
    return response.data;
  } catch (error) {
    console.error('Error fetching crops:', error);
    throw error;
  }
}
