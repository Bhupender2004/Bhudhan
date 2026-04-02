'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, User, Facebook, Twitter, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { use } from 'react';

// Metadata is now handled in a separate file

// Extend Window interface to include our custom shareArticle object
declare global {
  interface Window {
    shareArticle: {
      facebook: () => void;
      twitter: () => void;
      whatsapp: () => void;
    };
  }
}

// Mock news data (in a real app, this would come from an API)
const newsItems = [
  {
    id: '1',
    title: 'Government Announces New Subsidy for Organic Farming',
    source: 'Krishi Jagran',
    author: 'Rajesh Kumar',
    date: 'April 8, 2023',
    content: `
      <p>The Ministry of Agriculture has announced a new subsidy scheme for organic farmers. The scheme aims to promote sustainable farming practices and reduce chemical usage in agriculture. Farmers can apply for the subsidy through the official portal or at their nearest Krishi Vigyan Kendra.</p>

      <p>Under the new scheme, farmers who adopt organic farming methods will receive financial assistance of up to ₹50,000 per hectare. The subsidy will cover the cost of organic inputs, certification, and training. The government hopes that this initiative will encourage more farmers to switch to organic farming and help India become a global leader in organic agriculture.</p>

      <p>The Minister of Agriculture stated, "Organic farming is not just good for the environment, but also for the health of our citizens. This subsidy scheme is part of our commitment to promote sustainable agriculture and ensure food security for future generations."</p>

      <p>The scheme will be implemented in phases, starting with selected districts in each state. Farmers interested in the scheme can attend awareness programs that will be conducted at the block level in the coming weeks.</p>

      <p>Agricultural experts have welcomed this move, saying that it will help reduce the dependence on chemical fertilizers and pesticides, which have long-term negative effects on soil health and biodiversity.</p>
    `,
    imageUrl: '/images/news/organic-farming.jpg'
  },
  {
    id: '2',
    title: 'Monsoon Forecast: Good Rainfall Expected This Year',
    source: 'Weather Department',
    author: 'Dr. Priya Singh',
    date: 'April 8, 2023',
    content: `
      <p>The Indian Meteorological Department has predicted above-average rainfall this monsoon season. This is good news for farmers who rely on rain-fed agriculture. The monsoon is expected to arrive on time in Kerala and progress normally across the country.</p>

      <p>According to the forecast, most parts of India will receive normal to above-normal rainfall, with only a few regions in the northeast expected to receive slightly below-normal precipitation. The monsoon is crucial for Indian agriculture, as it accounts for more than 70% of the country's annual rainfall.</p>

      <p>Dr. Priya Singh, a senior meteorologist, explained, "Our models indicate a favorable monsoon this year due to neutral El Niño conditions in the Pacific Ocean. This should result in good crop yields, especially for kharif crops like rice, pulses, and oilseeds."</p>

      <p>Farmers are advised to prepare their fields in advance and consider the rainfall forecast while planning their sowing schedule. The government has also ensured adequate supply of seeds and fertilizers to help farmers make the most of the good monsoon.</p>

      <p>Water reservoirs, which are currently at 40% of their capacity, are expected to fill up during the monsoon, ensuring water availability for the rabi season as well.</p>
    `,
    imageUrl: '/images/news/monsoon.jpg'
  },
  {
    id: '3',
    title: 'New Pest-Resistant Rice Variety Developed',
    source: 'Agricultural Research',
    author: 'Dr. Amit Verma',
    date: 'April 7, 2023',
    content: `
      <p>Scientists at the Indian Agricultural Research Institute have developed a new rice variety that is resistant to common pests. The variety, named "Rakshak-1", requires fewer pesticides and can increase yields by up to 20%. Seeds will be available to farmers from the next planting season.</p>

      <p>Rakshak-1 has been developed after years of research and field trials across different agro-climatic zones. It shows strong resistance to brown planthoppers, stem borers, and bacterial leaf blight, which are major pests affecting rice cultivation in India.</p>

      <p>Dr. Amit Verma, the lead scientist behind this development, said, "This variety not only reduces the need for pesticides but also has better nutritional content and cooking quality compared to existing varieties. It's a win-win for farmers and consumers."</p>

      <p>The new variety is suitable for cultivation in both irrigated and rain-fed conditions and has a maturity period of 120-125 days. It performs well in a wide range of soil types and can withstand moderate drought conditions.</p>

      <p>The government plans to distribute Rakshak-1 seeds to farmers at subsidized rates through Krishi Vigyan Kendras and authorized seed dealers. Training programs will also be conducted to educate farmers about the best practices for cultivating this new variety.</p>
    `,
    imageUrl: '/images/news/rice-variety.jpg'
  },
  {
    id: '4',
    title: 'Farmers Markets Going Digital: New App Connects Farmers Directly to Consumers',
    source: 'Tech Today',
    author: 'Neha Sharma',
    date: 'April 6, 2023',
    content: `
      <p>A new mobile application has been launched to connect farmers directly with consumers. The app, called "FarmDirect", allows farmers to list their produce and consumers to place orders for direct delivery. This initiative aims to eliminate middlemen and ensure better prices for farmers.</p>

      <p>FarmDirect was developed by a team of young entrepreneurs who wanted to address the challenges faced by small and marginal farmers in selling their produce. The app includes features like real-time price updates, quality ratings, and secure payment options.</p>

      <p>Neha Sharma, one of the co-founders, explained, "We noticed that farmers often get only 30-40% of what consumers pay for agricultural produce. With FarmDirect, we're trying to create a more equitable system where farmers can get 70-80% of the final price."</p>

      <p>The app has already been downloaded by over 10,000 farmers and 50,000 consumers in its first month. It currently operates in 10 major cities and plans to expand to 50 more cities by the end of the year.</p>

      <p>Farmers who have used the app report an increase in their income by 25-30%. Consumers also benefit from fresher produce at competitive prices. The app also promotes sustainable agriculture by highlighting organic and naturally grown products.</p>
    `,
    imageUrl: '/images/news/digital-market.jpg'
  },
  {
    id: '5',
    title: 'Water Conservation Techniques Workshop for Farmers',
    source: 'Rural Development Agency',
    author: 'Suresh Patel',
    date: 'April 5, 2023',
    content: `
      <p>A series of workshops on water conservation techniques for agriculture will be conducted across rural districts next month. The workshops will cover drip irrigation, rainwater harvesting, and other water-saving methods. Interested farmers can register at their local agricultural office.</p>

      <p>The workshops are being organized by the Rural Development Agency in collaboration with agricultural universities and NGOs. They aim to address the growing water scarcity issues faced by farmers and promote sustainable water management practices.</p>

      <p>Suresh Patel, the coordinator of the program, said, "Water is becoming increasingly scarce, and traditional irrigation methods waste a lot of water. These workshops will demonstrate practical, cost-effective solutions that farmers can implement on their fields."</p>

      <p>The workshops will include hands-on training sessions where farmers can learn to install drip irrigation systems, construct small check dams, and implement mulching techniques. Experts will also discuss crop selection based on water availability and climate conditions.</p>

      <p>Farmers who implement these water conservation techniques will be eligible for additional support under various government schemes. Success stories from farmers who have already adopted these methods will also be shared during the workshops to inspire others.</p>
    `,
    imageUrl: '/images/news/water-conservation.jpg'
  }
];

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const newsItem = newsItems.find(item => item.id === unwrappedParams.id);

  // Set document title dynamically and handle share functionality
  useEffect(() => {
    if (newsItem) {
      document.title = `${newsItem.title} | BhuDhan Krishi`;

      // Add window.location for share functionality
      if (typeof window !== 'undefined') {
        // This code only runs in the browser
        window.shareArticle = {
          facebook: () => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(newsItem.title);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank', 'width=600,height=400');
          },
          twitter: () => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(newsItem.title);
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
          },
          whatsapp: () => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(newsItem.title);
            window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank');
          }
        };
      }
    }
  }, [newsItem]);

  if (!newsItem) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center">
          <Link href="/news">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">News Article Not Found</h1>
            <p>The news article you are looking for does not exist or has been removed.</p>
            <Link href="/news">
              <Button className="mt-4">View All News</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <Link href="/news">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="h-64 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">News Image Placeholder</p>
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{newsItem.title}</h1>

          <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6">
            <div className="flex items-center mr-6 mb-2">
              <User className="h-4 w-4 mr-1" />
              <span>{newsItem.author}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{newsItem.date}</span>
            </div>
            <div className="mb-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                {newsItem.source}
              </span>
            </div>
          </div>

          <div className="prose prose-green dark:prose-invert max-w-none"
               dangerouslySetInnerHTML={{ __html: newsItem.content }} />

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-300"
                onClick={() => window.shareArticle.facebook()}
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-sky-100 hover:text-sky-600 hover:border-sky-300"
                onClick={() => window.shareArticle.twitter()}
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-green-100 hover:text-green-600 hover:border-green-300"
                onClick={() => window.shareArticle.whatsapp()}
              >
                <Share2 className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
