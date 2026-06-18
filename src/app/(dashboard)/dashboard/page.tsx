import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WeatherWidget from '@/components/weather/weather-widget';
import NewsWidget from '@/components/news/news-widget';
import CropPriceWidget from '@/components/dashboard/crop-price-widget';
import SchemeWidget from '@/components/schemes/scheme-widget';
import CropPriceCalculator from '@/components/dashboard/CropPriceCalculator';
import RewardsWidget from '@/components/dashboard/rewards-widget';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'BhuDhan Krishi Dashboard - Your Digital AI Farmer',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your BhuDhan Krishi dashboard - your digital AI farmer.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/marketplace">
            <Button>Visit Marketplace</Button>
          </Link>
          <Link href="/expert-connect">
            <Button variant="outline">Connect with Expert</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="transition-all duration-300 hover:scale-[1.02]">
          <RewardsWidget />
        </div>

        <Card className="transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherWidget />
          </CardContent>
        </Card>

        <Card className="h-[370px] flex flex-col transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Crop Prices</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <CropPriceWidget />
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Schemes</CardTitle>
          </CardHeader>
          <CardContent>
            <SchemeWidget />
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agricultural News</CardTitle>
          </CardHeader>
          <CardContent>
            <NewsWidget />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Calculator & Tools</h2>
            <p className="text-muted-foreground">
              Calculate crop prices and manage your farming finance
            </p>
          </div>
          <div className="mt-4">
            <CropPriceCalculator />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30">
            <CardHeader>
              <CardTitle className="text-lg">Price Insights</CardTitle>
              <CardDescription>
                Calculations are based on current market rates and standard quality.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Prices are updated every 24 hours</p>
              <p>• Mandi rates vary by location</p>
              <p>• Quality grade affects final pricing</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>
              Purchase seeds, fertilizers, and other agricultural products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 w-full overflow-hidden rounded-md group">
              <Image 
                src="/images/dashboard/marketplace.png" 
                alt="Marketplace" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/40">
                <p className="text-white font-bold text-lg drop-shadow-md">Browse Products</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/marketplace" className="w-full">
              <Button className="w-full">Visit Marketplace</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Expert Connect</CardTitle>
            <CardDescription>
              Connect with agricultural experts for personalized advice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 w-full overflow-hidden rounded-md group">
              <Image 
                src="/images/dashboard/expert-connect.png" 
                alt="Expert Connect" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/40">
                <p className="text-white font-bold text-lg drop-shadow-md">Get Expert Advice</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/expert-connect" className="w-full">
              <Button className="w-full">Connect Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>AI Tools</CardTitle>
            <CardDescription>
              Use AI-powered tools for crop disease detection and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 w-full overflow-hidden rounded-md group">
              <Image 
                src="/images/dashboard/ai-tools.png" 
                alt="AI Tools" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/40">
                <p className="text-white font-bold text-lg drop-shadow-md">Explore AI Tools</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools" className="w-full">
              <Button className="w-full">Try AI Tools</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
