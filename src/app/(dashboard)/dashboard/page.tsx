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
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'BhuDhan Krishi Dashboard - Your Digital AI Farmer',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 pb-12">
      {/* 1. Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 md:p-8 text-white shadow-lg shadow-emerald-100 dark:shadow-none transition-all hover:shadow-xl hover:shadow-emerald-200/20 duration-500">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
              <span>🌾</span> Welcome to BhuDhan Krishi
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Hello, Bhupender Yadav! 👋
            </h1>
            <p className="text-emerald-50 text-sm md:text-base font-medium max-w-xl leading-relaxed">
              Your digital AI farming assistant is active and synchronized. Here is your personalized agriculture overview for today.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/ai-tools">
              <Button className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold h-11 px-6 rounded-xl shadow-md transition-all active:scale-[0.98]">
                Launch AI Tools
              </Button>
            </Link>
            <Link href="/expert-connect">
              <Button className="bg-emerald-800/40 text-white hover:bg-emerald-800/60 font-bold border border-white/20 h-11 px-6 rounded-xl transition-all active:scale-[0.98]">
                Chat with Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Row 1: Core Widgets (3-column layout to prevent narrow congestion) */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Farmer Rewards */}
        <div className="transition-all duration-300 hover:scale-[1.01] hover:shadow-md rounded-2xl h-[420px]">
          <RewardsWidget />
        </div>

        {/* Card 2: Current Weather */}
        <Card className="transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-800/50 rounded-2xl h-[420px] flex flex-col justify-between overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm">
          <CardHeader className="pb-3 border-b border-slate-50 dark:border-slate-800/40">
            <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>🌦️</span> Current Weather
            </CardTitle>
            <CardDescription className="text-xs">Local weather and atmospheric details</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pt-4 overflow-y-auto">
            <WeatherWidget />
          </CardContent>
        </Card>

        {/* Card 3: Mandi Crop Prices */}
        <Card className="transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-800/50 rounded-2xl h-[420px] flex flex-col justify-between overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm">
          <CardHeader className="pb-3 border-b border-slate-50 dark:border-slate-800/40">
            <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>📈</span> Mandi Crop Prices
            </CardTitle>
            <CardDescription className="text-xs">Real-time agricultural price trends</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pt-4 overflow-hidden flex flex-col justify-between">
            <CropPriceWidget />
          </CardContent>
        </Card>
      </div>

      {/* 3. Row 2: Secondary Content (2-column layout for wide, premium display) */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Card 4: Latest Schemes */}
        <Card className="transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-800/50 rounded-2xl bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-50 dark:border-slate-800/40">
            <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>🏛️</span> Latest Government Schemes
            </CardTitle>
            <CardDescription className="text-xs">Subsidies, loans, and welfare benefits</CardDescription>
          </CardHeader>
          <CardContent className="pt-5 pb-5">
            <SchemeWidget />
          </CardContent>
        </Card>

        {/* Card 5: Agricultural News */}
        <Card className="transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-800/50 rounded-2xl bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-50 dark:border-slate-800/40">
            <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>📰</span> Agricultural News & Trends
            </CardTitle>
            <CardDescription className="text-xs">Live farming updates and crop advisories</CardDescription>
          </CardHeader>
          <CardContent className="pt-5 pb-5">
            <NewsWidget />
          </CardContent>
        </Card>
      </div>

      {/* 4. Row 3: Calculator & Tools (Wide visual layout) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Calculator & Market Tools</h2>
          <p className="text-sm text-muted-foreground">
            Estimate revenues and manage your crop finance metrics.
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CropPriceCalculator />
          </div>
          <div className="flex">
            <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-50/30 dark:from-green-950/20 dark:to-transparent border border-green-100 dark:border-green-900/20 rounded-2xl flex flex-col justify-between p-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  <span>💡</span> Price Insights
                </CardTitle>
                <CardDescription className="text-emerald-700/80 dark:text-emerald-400/80 text-xs">
                  Calculations are based on current market rates and standard quality.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-3 pt-2 text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-white/80 dark:border-slate-800/50">
                  <span className="text-emerald-600">⏱️</span>
                  <p className="text-xs">Prices are updated every 24 hours to stay accurate.</p>
                </div>
                <div className="flex items-start gap-2 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-white/80 dark:border-slate-800/50">
                  <span className="text-emerald-600">📍</span>
                  <p className="text-xs">Mandi rates vary significantly based on state and district locations.</p>
                </div>
                <div className="flex items-start gap-2 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-white/80 dark:border-slate-800/50">
                  <span className="text-emerald-600">🛡️</span>
                  <p className="text-xs">Quality grade and crop moisture content will affect final mandi pricing.</p>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Link href="/crop-calendar" className="w-full">
                  <Button variant="outline" className="w-full text-xs font-bold border-green-200 dark:border-green-900 hover:bg-green-100/50 rounded-xl">
                    View Seasonal Crop Calendar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* 5. Row 4: Secondary Shortcut Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-4 border-t border-slate-100 dark:border-slate-900">
        <Card className="transition-all duration-300 hover:scale-[1.01] hover:shadow-md border border-slate-100 dark:border-slate-800/50 rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm group">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Digital Marketplace</CardTitle>
            <CardDescription className="text-xs">
              Purchase high-grade seeds, fertilizers, and tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="relative h-36 w-full overflow-hidden rounded-xl group/img shadow-inner border border-slate-100 dark:border-slate-800">
              <Image 
                src="/images/dashboard/marketplace.png" 
                alt="Marketplace" 
                fill 
                className="object-cover transition-transform duration-700 group-hover/img:scale-110"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                <p className="text-white font-extrabold text-lg drop-shadow-md tracking-wide flex items-center gap-1.5">
                  Browse Products <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/marketplace" className="w-full">
              <Button className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 rounded-xl h-10 shadow-sm active:scale-[0.98] transition-all">
                Visit Marketplace
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:scale-[1.01] hover:shadow-md border border-slate-100 dark:border-slate-800/50 rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm group">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Expert Consultations</CardTitle>
            <CardDescription className="text-xs">
              Connect with verified agronomists and specialists.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="relative h-36 w-full overflow-hidden rounded-xl group/img shadow-inner border border-slate-100 dark:border-slate-800">
              <Image 
                src="/images/dashboard/expert-connect.png" 
                alt="Expert Connect" 
                fill 
                className="object-cover transition-transform duration-700 group-hover/img:scale-110"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                <p className="text-white font-extrabold text-lg drop-shadow-md tracking-wide flex items-center gap-1.5">
                  Get Expert Advice <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/expert-connect" className="w-full">
              <Button className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 rounded-xl h-10 shadow-sm active:scale-[0.98] transition-all">
                Connect Now
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:scale-[1.01] hover:shadow-md border border-slate-100 dark:border-slate-800/50 rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm group">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">AI Field Assistant</CardTitle>
            <CardDescription className="text-xs">
              Instant disease scans, soil analysis, and yield predictions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="relative h-36 w-full overflow-hidden rounded-xl group/img shadow-inner border border-slate-100 dark:border-slate-800">
              <Image 
                src="/images/dashboard/ai-tools.png" 
                alt="AI Tools" 
                fill 
                className="object-cover transition-transform duration-700 group-hover/img:scale-110"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                <p className="text-white font-extrabold text-lg drop-shadow-md tracking-wide flex items-center gap-1.5">
                  Explore AI Tools <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools" className="w-full">
              <Button className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 rounded-xl h-10 shadow-sm active:scale-[0.98] transition-all">
                Try AI Tools
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
