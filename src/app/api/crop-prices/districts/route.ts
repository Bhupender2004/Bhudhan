import { NextRequest, NextResponse } from 'next/server';
import { mockDistricts } from '@/lib/mock/crop-prices';

export async function GET(request: NextRequest) {
  try {
    // Get state from query parameters
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');

    if (!state) {
      return NextResponse.json(
        { error: 'State parameter is required' },
        { status: 400 }
      );
    }

    // Add a small delay to simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return the mock districts data for the specified state
    if (state in mockDistricts) {
      return NextResponse.json(mockDistricts[state as keyof typeof mockDistricts]);
    } else {
      // Return empty results if state not found
      return NextResponse.json({
        records: [],
        total: 0,
        count: 0,
        limit: "100",
        offset: "0"
      });
    }
  } catch (error) {
    console.error('Error fetching districts:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch districts' },
      { status: 500 }
    );
  }
}
