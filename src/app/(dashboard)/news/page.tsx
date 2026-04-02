import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Agricultural News | BhuDhan Krishi',
  description: 'Latest news and updates for farmers in India',
};

// Mock news data (in a real app, this would come from an API)
const newsItems = [
  {
    id: '1',
    title: 'Government Announces New Subsidy for Organic Farming',
    source: 'Krishi Jagran',
    date: '2 hours ago',
    content: 'The Ministry of Agriculture has announced a new subsidy scheme for organic farmers. The scheme aims to promote sustainable farming practices and reduce chemical usage in agriculture. Farmers can apply for the subsidy through the official portal or at their nearest Krishi Vigyan Kendra.',
    imageUrl: '/images/news/organic-farming.jpg'
  },
  {
    id: '2',
    title: 'Monsoon Forecast: Good Rainfall Expected This Year',
    source: 'Weather Department',
    date: '5 hours ago',
    content: 'The Indian Meteorological Department has predicted above-average rainfall this monsoon season. This is good news for farmers who rely on rain-fed agriculture. The monsoon is expected to arrive on time in Kerala and progress normally across the country.',
    imageUrl: '/images/news/monsoon.jpg'
  },
  {
    id: '3',
    title: 'New Pest-Resistant Rice Variety Developed',
    source: 'Agricultural Research',
    date: '1 day ago',
    content: 'Scientists at the Indian Agricultural Research Institute have developed a new rice variety that is resistant to common pests. The variety, named "Rakshak-1", requires fewer pesticides and can increase yields by up to 20%. Seeds will be available to farmers from the next planting season.',
    imageUrl: '/images/news/rice-variety.jpg'
  },
  {
    id: '4',
    title: 'Farmers Markets Going Digital: New App Connects Farmers Directly to Consumers',
    source: 'Tech Today',
    date: '2 days ago',
    content: 'A new mobile application has been launched to connect farmers directly with consumers. The app, called "FarmDirect", allows farmers to list their produce and consumers to place orders for direct delivery. This initiative aims to eliminate middlemen and ensure better prices for farmers.',
    imageUrl: '/images/news/digital-market.jpg'
  },
  {
    id: '5',
    title: 'Water Conservation Techniques Workshop for Farmers',
    source: 'Rural Development Agency',
    date: '3 days ago',
    content: 'A series of workshops on water conservation techniques for agriculture will be conducted across rural districts next month. The workshops will cover drip irrigation, rainwater harvesting, and other water-saving methods. Interested farmers can register at their local agricultural office.',
    imageUrl: '/images/news/water-conservation.jpg'
  }
];

export default function NewsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <h1 className="text-3xl font-bold">Agricultural News</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="h-48 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">News Image Placeholder</p>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center justify-between text-xs">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">{item.content}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/news/${item.id}`} className="w-full">
                <Button variant="outline" className="w-full">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
