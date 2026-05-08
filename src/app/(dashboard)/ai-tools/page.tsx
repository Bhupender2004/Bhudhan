import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'AI Tools',
  description: 'AI-powered tools for smart farming',
};

export default function AIToolsPage() {
  const tools = [
    {
      title: 'Crop Disease Detection',
      description: 'Upload images of your crops to identify diseases and get treatment recommendations',
      image: '/images/ai-tools/disease-detection.png',
      href: '/ai-tools/disease-detection',
      alt: 'Identify Plant Diseases'
    },
    {
      title: 'Voice Assistant',
      description: 'Ask farming questions in your local language and get instant answers',
      image: '/images/ai-tools/voice-assistant.png',
      href: '/ai-tools/voice-assistant',
      alt: 'Voice-Powered Assistance'
    },
    {
      title: 'Yield Prediction',
      description: 'Predict your crop yield based on historical data and current conditions',
      image: '/images/ai-tools/yield-prediction.png',
      href: '/ai-tools/yield-prediction',
      alt: 'Predict Your Harvest'
    },
    {
      title: 'BhuDhan Irrigation',
      description: 'Get personalized irrigation schedules based on weather and soil conditions',
      image: '/images/ai-tools/smart-irrigation.png',
      href: '/ai-tools/smart-irrigation',
      alt: 'Optimize Water Usage'
    },
    {
      title: 'Pest Prediction',
      description: 'Forecast potential pest outbreaks based on environmental conditions',
      image: '/images/ai-tools/pest-prediction.png',
      href: '/ai-tools/pest-prediction',
      alt: 'Stay Ahead of Pests'
    },
    {
      title: 'Soil Analysis',
      description: 'Upload soil images to get composition analysis and crop recommendations',
      image: '/images/ai-tools/soil-analysis.png',
      href: '/ai-tools/soil-analysis',
      alt: 'Understand Your Soil'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Tools</h1>
        <p className="text-muted-foreground">
          Leverage artificial intelligence to enhance your farming practices
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.title} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={tool.image}
                alt={tool.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{tool.title}</CardTitle>
              <CardDescription>
                {tool.description}
              </CardDescription>
            </CardHeader>
            <div className="flex-grow"></div>
            <CardFooter>
              <Link href={tool.href} className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Try Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
