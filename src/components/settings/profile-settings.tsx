'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/lib/utils/toast';
import { Card, CardContent } from '@/components/ui/card';
import ImageUpload from '@/components/profile/image-upload';

export default function ProfileSettings() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('farmer');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get user info from localStorage
    const savedName = localStorage.getItem('userName');
    const savedPhone = localStorage.getItem('userPhone');
    const savedImage = localStorage.getItem('userProfileImage');

    if (savedName) setName(savedName);
    if (savedPhone) setPhone(savedPhone);
    if (savedImage) setProfileImage(savedImage);

    // In a real implementation, we would fetch the user's profile from the API
  }, []);

  const handleSaveProfile = () => {
    // Save to localStorage for demo purposes
    localStorage.setItem('userName', name);
    localStorage.setItem('userPhone', phone);

    toast.success('Profile updated successfully');

    // In a real implementation, this would update the user's profile in the database
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
            <div className="mb-4 sm:mb-0">
              <ImageUpload
                initialImage={profileImage}
                userName={name}
                onImageChange={setProfileImage}
                size="md"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload a profile picture to personalize your account.
                <br />
                JPG, GIF or PNG. Max size 5MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farmer">Farmer</SelectItem>
              <SelectItem value="shopkeeper">Shopkeeper</SelectItem>
              <SelectItem value="expert">Agricultural Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Address Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Enter your street address"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter your state"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter your pincode"
            />
          </div>
        </div>
      </div>

      <Button onClick={handleSaveProfile}>Save Profile</Button>
    </div>
  );
}
