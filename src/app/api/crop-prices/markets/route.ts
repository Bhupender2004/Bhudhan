import { NextRequest, NextResponse } from 'next/server';
import { mockCropPrices } from '@/lib/mock/crop-prices';

export async function GET(request: NextRequest) {
  try {
    // Get parameters from query
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const district = searchParams.get('district');

    if (!state || !district) {
      return NextResponse.json(
        { error: 'State and district parameters are required' },
        { status: 400 }
      );
    }

    // Add a small delay to simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Filter markets based on state and district
    const filteredMarkets = mockCropPrices.records
      .filter(record => record.state === state && record.district === district)
      .map(record => ({ market: record.market }))
      // Remove duplicates
      .filter((market, index, self) =>
        index === self.findIndex(m => m.market === market.market)
      );

    // Return the filtered markets
    return NextResponse.json({
      records: filteredMarkets,
      total: filteredMarkets.length,
      count: filteredMarkets.length,
      limit: "100",
      offset: "0"
    });
  } catch (error) {
    console.error('Error fetching markets:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch markets' },
      { status: 500 }
    );
  }
}
