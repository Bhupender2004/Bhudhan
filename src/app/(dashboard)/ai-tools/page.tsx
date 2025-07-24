import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'AI Tools',
  description: 'AI-powered tools for smart farming',
};

export default function AIToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Tools</h1>
        <p className="text-muted-foreground">
          Leverage artificial intelligence to enhance your farming practices
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Crop Disease Detection</CardTitle>
            <CardDescription>
              Upload images of your crops to identify diseases and get treatment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center">
              <p className="text-red-800 font-medium">Identify Plant Diseases</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools/disease-detection" className="w-full">
              <Button className="w-full">Try Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Assistant</CardTitle>
            <CardDescription>
              Ask farming questions in your local language and get instant answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
              <p className="text-blue-800 font-medium">Voice-Powered Assistance</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools/voice-assistant" className="w-full">
              <Button className="w-full">Try Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yield Prediction</CardTitle>
            <CardDescription>
              Predict your crop yield based on historical data and current conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
              <p className="text-green-800 font-medium">Predict Your Harvest</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools/yield-prediction" className="w-full">
              <Button className="w-full">Try Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>BhuDhan Irrigation</CardTitle>
            <CardDescription>
              Get personalized irrigation schedules based on weather and soil conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-gradient-to-r from-cyan-100 to-sky-100 flex items-center justify-center">
              <p className="text-cyan-800 font-medium">Optimize Water Usage</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools/smart-irrigation" className="w-full">
              <Button className="w-full">Try Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pest Prediction</CardTitle>
            <CardDescription>
              Forecast potential pest outbreaks based on environmental conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center">
              <p className="text-amber-800 font-medium">Stay Ahead of Pests</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools/pest-prediction" className="w-full">
              <Button className="w-full">Try Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soil Analysis</CardTitle>
            <CardDescription>
              Upload soil images to get composition analysis and crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-gradient-to-r from-brown-100 to-amber-100 flex items-center justify-center">
              <p className="text-amber-900 font-medium">Understand Your Soil</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/ai-tools/soil-analysis" className="w-full">
              <Button className="w-full">Try Now</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
