'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

interface SchemeItem {
  id: string;
  title: string;
  category: string;
  lastDate: string;
}

export default function SchemeWidget() {
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch government schemes
    const fetchSchemes = async () => {
      try {
        // In a production app, we would fetch from a government API
        // For example, using RSS feeds from Press Information Bureau
        // or data.gov.in APIs for government schemes

        // For demo purposes, we'll simulate the API call
        await new Promise(resolve => setTimeout(resolve, 1300));

        // Mock data (simulating API response)
        setSchemes([
          {
            id: '1',
            title: 'PM Kisan Samman Nidhi',
            category: 'Subsidy',
            lastDate: '30 June 2025'
          },
          {
            id: '2',
            title: 'Kisan Credit Card Scheme',
            category: 'Loan',
            lastDate: 'Ongoing'
          },
          {
            id: '3',
            title: 'Pradhan Mantri Fasal Bima Yojana',
            category: 'Insurance',
            lastDate: '15 July 2025'
          }
        ]);
        setLoading(false);
      } catch (err) {
        console.error('Schemes API error:', err);
        setError('Failed to fetch schemes');
        setLoading(false);
      }
    };

    fetchSchemes();
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
      {schemes.map((scheme) => (
        <Link key={scheme.id} href={`/schemes/${scheme.id}`} className="block">
          <div className="space-y-1">
            <p className="line-clamp-1 text-sm font-medium">{scheme.title}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800">
                {scheme.category}
              </span>
              <span className="text-muted-foreground">
                Last Date: {scheme.lastDate}
              </span>
            </div>
          </div>
        </Link>
      ))}
      <div className="mt-4 text-center">
        <Link href="/schemes" className="text-xs text-primary hover:underline">
          View all schemes
        </Link>
      </div>
    </div>
  );
}
