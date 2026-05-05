'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/context/language-context';
import { MapPin, Phone, Mail, Calendar, Edit } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/profile/image-upload';

export default function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [userRole, setUserRole] = useState('Farmer');
  const [userStreet, setUserStreet] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userState, setUserState] = useState('');
  const [userPincode, setUserPincode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = () => {
      // Only run in browser environment
      if (typeof window !== 'undefined') {
        const name = localStorage.getItem('userName');
        const phone = localStorage.getItem('userPhone');
        const role = localStorage.getItem('userRole');
        const street = localStorage.getItem('userStreet');
        const city = localStorage.getItem('userCity');
        const state = localStorage.getItem('userState');
        const savedPincode = localStorage.getItem('userPincode');
        const savedEmail = localStorage.getItem('userEmail');
        const savedImage = localStorage.getItem('userProfileImage');

        if (name) setUserName(name);
        if (phone) setUserPhone(phone);
        if (role) setUserRole(role.charAt(0).toUpperCase() + role.slice(1));
        if (street) setUserStreet(street);
        if (city) setUserCity(city);
        if (state) setUserState(state);
        if (pincode) setUserPincode(pincode);
        if (email) setUserEmail(email);
        if (savedImage) setProfileImage(savedImage);

        // Set a mock join date
        const storedJoinDate = localStorage.getItem('userJoinDate');
        if (storedJoinDate) {
          setJoinDate(storedJoinDate);
        } else {
          const mockJoinDate = new Date();
          mockJoinDate.setMonth(mockJoinDate.getMonth() - 3);
          const formattedDate = mockJoinDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          localStorage.setItem('userJoinDate', formattedDate);
          setJoinDate(formattedDate);
        }
      }
    };

    loadUserData();

    // Listen for profile updates
    window.addEventListener('userProfileUpdated', loadUserData);
    return () => window.removeEventListener('userProfileUpdated', loadUserData);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <ImageUpload
                initialImage={profileImage}
                userName={userName}
                onImageChange={setProfileImage}
                size="lg"
              />
            </div>
            <CardTitle className="mt-4">{userName || 'User'}</CardTitle>
            <CardDescription>{userRole}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary-500" />
                <span>+91 {userPhone || '••••••••••'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary-500" />
                <span>{userEmail || 'user@example.com'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span>{userStreet || userCity ? `${userStreet}${userStreet && userCity ? ', ' : ''}${userCity}${userCity && userState ? ', ' : ''}${userState}` : 'Rewari, Haryana'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary-500" />
                <span>Joined on {joinDate}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/settings?tab=profile">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Farming Information</CardTitle>
              <CardDescription>
                Details about your farming activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Primary Crops</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900/20">Wheat</Badge>
                    <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900/20">Rice</Badge>
                    <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900/20">Maize</Badge>
                    <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900/20">+ Add Crop</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Farm Size</h3>
                  <p className="mt-1 text-sm text-muted-foreground">5 acres</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Farming Type</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Mixed (Traditional & Modern)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent interactions on BhuDhan Krishi your digital AI farmer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary-100 p-2 dark:bg-primary-900/30">
                        <svg className="h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Checked Weather Forecast</h4>
                        <p className="text-xs text-muted-foreground">Today at 9:30 AM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary-100 p-2 dark:bg-primary-900/30">
                        <svg className="h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Viewed Community Posts</h4>
                        <p className="text-xs text-muted-foreground">Yesterday at 4:15 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary-100 p-2 dark:bg-primary-900/30">
                        <svg className="h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2H2v10h10V2z" />
                          <path d="M22 12h-10v10h10V12z" />
                          <path d="M12 12H2v10h10V12z" />
                          <path d="M22 2h-10v10h10V2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Browsed Marketplace</h4>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>
                    Track your recent purchases and orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <svg className="mx-auto h-12 w-12 text-muted-foreground/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium">No Orders Yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You have not placed any orders yet. Visit the marketplace to start shopping.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/marketplace">
                        Browse Marketplace
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Items</CardTitle>
                  <CardDescription>
                    Products, articles, and resources you have saved
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <svg className="mx-auto h-12 w-12 text-muted-foreground/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium">No Saved Items</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You have not saved any items yet. Browse the portal and save items for later.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
