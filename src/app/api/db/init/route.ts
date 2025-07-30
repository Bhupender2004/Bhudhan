import { NextResponse } from 'next/server';
import { initializeDatabase, seedDatabase } from '@/lib/db/init';

export async function POST() {
  try {
    // Initialize database
    const initResult = await initializeDatabase();
    
    if (!initResult.success) {
      return NextResponse.json({ 
        error: 'Database initialization failed', 
        details: initResult.error 
      }, { status: 500 });
    }
    
    // Seed database with initial data
    const seedResult = await seedDatabase();
    
    if (!seedResult.success) {
      return NextResponse.json({ 
        error: 'Database seeding failed', 
        details: seedResult.error 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Database initialized and seeded successfully',
      initResult,
      seedResult
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Database setup failed', 
      details: error 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Database initialization endpoint',
    instructions: 'Send a POST request to initialize the database'
  });
}
