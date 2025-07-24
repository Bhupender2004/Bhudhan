'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/lib/utils/toast';
import { Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function UserProfile() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');

  if (!isLoaded) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">You need to be signed in to view your profile.</p>
        <Button className="mt-4" asChild>
          <a href="/login">Sign In</a>
        </Button>
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      
      // Update user's full name in Clerk
      if (fullName !== user.fullName) {
        await user.update({
          firstName: fullName.split(' ')[0],
          lastName: fullName.split(' ').slice(1).join(' '),
        });
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
            <AvatarFallback>{user.fullName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.fullName || 'User'}</CardTitle>
            <CardDescription>{user.primaryEmailAddress?.emailAddress || user.primaryPhoneNumber?.phoneNumber}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={user.primaryPhoneNumber?.phoneNumber || ''}
              disabled
              placeholder="Your phone number"
            />
            <p className="text-xs text-muted-foreground">Phone number cannot be changed</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={user.primaryEmailAddress?.emailAddress || ''}
              disabled
              placeholder="Your email address"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleUpdateProfile} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Profile'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
