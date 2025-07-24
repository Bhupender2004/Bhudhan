import { NextResponse } from 'next/server';
import { mockCrops } from '@/lib/mock/crop-prices';

export async function GET() {
  try {
    // Add a small delay to simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return the mock crops data
    return NextResponse.json(mockCrops);
  } catch (error) {
    console.error('Error fetching crops:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch crops' },
      { status: 500 }
    );
  }
}
