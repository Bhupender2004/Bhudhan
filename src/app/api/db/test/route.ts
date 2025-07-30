import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      return NextResponse.json({ 
        error: 'MONGODB_URI not found in environment variables' 
      }, { status: 500 });
    }
    
    // Test connection
    const connection = await mongoose.connect(MONGODB_URI);
    
    // Get database info
    const dbName = connection.connection.db?.databaseName;
    const readyState = mongoose.connection.readyState;
    
    // Close connection
    await mongoose.disconnect();
    
    return NextResponse.json({ 
      success: true,
      message: 'MongoDB connection successful!',
      database: dbName,
      readyState: readyState,
      uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') // Hide credentials
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'MongoDB connection failed',
      details: error.message,
      code: error.code,
      codeName: error.codeName
    }, { status: 500 });
  }
}
