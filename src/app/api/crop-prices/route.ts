import { NextRequest, NextResponse } from 'next/server';
import { mockCropPrices } from '@/lib/mock/crop-prices';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const market = searchParams.get('market');
    const crop = searchParams.get('crop');

    // Filter the mock data based on the query parameters
    let filteredRecords = [...mockCropPrices.records];

    if (state && state !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.state === state);
    }

    if (district && district !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.district === district);
    }

    if (market && market !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.market === market);
    }

    if (crop && crop !== 'all') {
      filteredRecords = filteredRecords.filter(record => record.commodity === crop);
    }

    // Create a response object with the filtered records
    const response = {
      ...mockCropPrices,
      records: filteredRecords,
      total: filteredRecords.length,
      count: filteredRecords.length
    };

    // Add a small delay to simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return the filtered data
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching crop prices:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch crop prices' },
      { status: 500 }
    );
  }
}
