import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/lib/db/models/user';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, phone, role, address, farmDetails, preferredLanguage } = body;

    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: userId });
    
    if (existingUser) {
      // Update existing user
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          email,
          name,
          phone,
          role,
          address,
          farmDetails,
          preferredLanguage,
        },
        { new: true }
      );
      
      return NextResponse.json({ user: updatedUser });
    } else {
      // Create new user
      const newUser = new User({
        clerkId: userId,
        email,
        name,
        phone,
        role: role || 'farmer',
        address,
        farmDetails,
        preferredLanguage: preferredLanguage || 'en',
      });
      
      await newUser.save();
      
      return NextResponse.json({ user: newUser }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
