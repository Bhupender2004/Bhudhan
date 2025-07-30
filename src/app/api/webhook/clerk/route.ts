import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/lib/db/models/user';

export async function POST(request: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local');
  }

  // Get the headers
  const headerPayload = request.headers;
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;
  } catch (err) {
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  
  await connectToDatabase();

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, phone_numbers, image_url } = evt.data;

    try {
      const user = new User({
        clerkId: id,
        email: email_addresses[0]?.email_address || '',
        name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
        phone: phone_numbers[0]?.phone_number || '',
        profileImage: image_url || '',
        role: 'farmer',
        preferredLanguage: 'en',
        isVerified: false,
      });

      await user.save();
    } catch (error) {
      // User might already exist, ignore error
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, phone_numbers, image_url } = evt.data;

    try {
      await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0]?.email_address || '',
          name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
          phone: phone_numbers[0]?.phone_number || '',
          profileImage: image_url || '',
        }
      );
    } catch (error) {
      // Handle error
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    try {
      await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
      // Handle error
    }
  }

  return NextResponse.json({ message: 'Webhook processed successfully' });
}
