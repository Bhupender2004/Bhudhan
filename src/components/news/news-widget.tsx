'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
}

export default function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch agricultural news
    const fetchNews = async () => {
      try {
        // In a production app, we would use the actual API
        // import { getAgriculturalNews } from '@/lib/api/news';
        // const data = await getAgriculturalNews(1, 3);
        // const formattedNews = data.articles.map((article, index) => ({
        //   id: index.toString(),
        //   title: article.title,
        //   source: article.source.name,
        //   date: new Date(article.publishedAt).toRelativeString(),
        //   url: `/news/${index}`
        // }));

        // For demo purposes, we'll simulate the API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Mock data (simulating API response)
        setNews([
          {
            id: '1',
            title: 'Government Announces New Subsidy for Organic Farming',
            source: 'Krishi Jagran',
            date: '2 hours ago'
          },
          {
            id: '2',
            title: 'Monsoon Forecast: Good Rainfall Expected This Year',
            source: 'Weather Department',
            date: '5 hours ago'
          },
          {
            id: '3',
            title: 'New Pest-Resistant Rice Variety Developed',
            source: 'Agricultural Research',
            date: '1 day ago'
          }
        ]);
        setLoading(false);
      } catch (err) {
        console.error('News API error:', err);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-24 flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {news.map((item) => (
        <Link key={item.id} href={`/news/${item.id}`} className="block">
          <div className="space-y-1">
            <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.source}</span>
              <span>{item.date}</span>
            </div>
          </div>
        </Link>
      ))}
      <div className="mt-4 text-center">
        <Link href="/news" className="text-xs text-primary hover:underline">
          View all news
        </Link>
      </div>
    </div>
  );
}
