import { NextResponse } from 'next/server';
import { mockStates } from '@/lib/mock/crop-prices';

export async function GET() {
  try {
    // Add a small delay to simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return the mock states data
    return NextResponse.json(mockStates);
  } catch (error) {
    console.error('Error fetching states:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch states' },
      { status: 500 }
    );
  }
}
