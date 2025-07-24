'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, Search } from 'lucide-react';
import { useLanguage } from '@/lib/context/language-context';

export default function AgriculturalInnovationsPage() {
  useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Precision Agriculture: The Future of Farming in India',
      excerpt: 'Discover how precision agriculture technologies are transforming Indian farms with data-driven decision making, reducing input costs and increasing yields.',
      content: 'Precision agriculture is revolutionizing farming in India by enabling farmers to make data-driven decisions. Using technologies like GPS-guided tractors, drones, and IoT sensors, farmers can monitor crop health, soil conditions, and water needs with unprecedented accuracy. This approach allows for targeted application of inputs like water, fertilizers, and pesticides, reducing waste and environmental impact while optimizing yields. Early adopters in states like Punjab and Gujarat are reporting 15-20% increases in productivity and 20-30% reductions in input costs. The government\'s Digital Agriculture Mission is further accelerating adoption through subsidies and training programs.',
      author: {
        name: 'Dr. Rajiv Sharma',
        role: 'Agricultural Scientist',
        avatar: '/avatars/expert1.png',
        fallback: 'RS'
      },
      category: 'Technology',
      tags: ['Precision Farming', 'IoT', 'Digital Agriculture'],
      date: 'May 15, 2023',
      readTime: '8 min read',
      featured: true,
      image: '/blog/precision-agriculture.jpg'
    },
    {
      id: 2,
      title: 'Climate-Resilient Crop Varieties for Changing Weather Patterns',
      excerpt: 'Learn about new drought-resistant and heat-tolerant crop varieties developed specifically for Indian agricultural conditions.',
      content: 'As climate change intensifies, Indian farmers face increasing challenges from unpredictable rainfall, rising temperatures, and extreme weather events. Fortunately, agricultural research institutions have developed climate-resilient crop varieties that can thrive under these challenging conditions. These include drought-resistant rice varieties like Sahbhagi Dhan that can survive with 30% less water, heat-tolerant wheat varieties like HD-3086 that maintain yields even when temperatures exceed 35°C during grain filling, and salinity-tolerant varieties for coastal regions affected by rising sea levels. These improved varieties not only withstand environmental stresses but also maintain nutritional quality and yield potential, providing a sustainable solution for farmers in vulnerable regions.',
      author: {
        name: 'Dr. Meena Kumari',
        role: 'Plant Breeder',
        avatar: '/avatars/expert2.png',
        fallback: 'MK'
      },
      category: 'Crop Science',
      tags: ['Climate Change', 'Drought Resistance', 'Crop Breeding'],
      date: 'April 28, 2023',
      readTime: '6 min read',
      featured: true,
      image: '/blog/climate-resilient-crops.jpg'
    },
    {
      id: 3,
      title: 'Sustainable Pest Management Strategies for Organic Farming',
      excerpt: 'Effective pest control methods that don\'t rely on chemical pesticides, suitable for organic certification requirements.',
      content: 'Organic farming requires innovative approaches to pest management that maintain ecological balance while protecting crops. This article explores integrated pest management (IPM) strategies that combine biological controls, cultural practices, and natural deterrents. Techniques include introducing beneficial insects like ladybugs and lacewings that prey on common pests, using neem-based and other botanical extracts as natural repellents, implementing crop rotation and companion planting to disrupt pest cycles, and utilizing pheromone traps for monitoring and mass trapping. These methods not only comply with organic certification standards but often result in healthier soil biology and more resilient farming systems. Case studies from successful organic farms across different agro-climatic zones of India demonstrate the practical application of these techniques.',
      author: {
        name: 'Vikram Patel',
        role: 'Organic Farming Specialist',
        avatar: '/avatars/expert3.png',
        fallback: 'VP'
      },
      category: 'Organic Farming',
      tags: ['Pest Management', 'Beneficial Insects', 'Natural Remedies'],
      date: 'April 10, 2023',
      readTime: '7 min read',
      featured: false,
      image: '/blog/organic-pest-management.jpg'
    },
    {
      id: 4,
      title: 'Water Conservation Technologies for Small and Marginal Farmers',
      excerpt: 'Affordable irrigation and water management solutions designed for small landholdings with limited resources.',
      content: 'Water scarcity is a growing concern for Indian agriculture, particularly for small and marginal farmers with limited resources. This article presents cost-effective water conservation technologies that can be implemented on small landholdings. These include low-cost drip irrigation systems made from recycled materials that can reduce water usage by up to 60%, rainwater harvesting structures designed for small farms, mulching techniques using locally available materials to reduce evaporation, and simple soil moisture monitoring methods to optimize irrigation timing. The article also covers community-based approaches where farmers can share resources and infrastructure costs. Implementation guidance, approximate costs, and potential water savings are provided for each technology, along with information on relevant government subsidy programs that can help offset initial investments.',
      author: {
        name: 'Anand Verma',
        role: 'Water Management Expert',
        avatar: '/avatars/expert4.png',
        fallback: 'AV'
      },
      category: 'Water Management',
      tags: ['Drip Irrigation', 'Rainwater Harvesting', 'Small Farms'],
      date: 'March 22, 2023',
      readTime: '5 min read',
      featured: false,
      image: '/blog/water-conservation.jpg'
    },
    {
      id: 5,
      title: 'Soil Health Management: Building Long-term Farm Productivity',
      excerpt: 'Comprehensive guide to understanding, testing, and improving soil health for sustainable agricultural productivity.',
      content: 'Healthy soil is the foundation of productive and sustainable agriculture. This comprehensive guide explores the key components of soil health management for Indian farmers. It begins with understanding the physical, chemical, and biological properties of soil and how they interact to support plant growth. The article covers practical methods for soil testing and interpretation of results, including low-cost options accessible to all farmers. It then details strategies for improving soil health, such as appropriate crop rotation sequences for different soil types, cover cropping to prevent erosion and add organic matter, composting techniques using farm waste, and balanced application of organic and inorganic amendments based on soil test results. The long-term benefits of soil health management are illustrated through case studies of farms that have successfully regenerated degraded soils and achieved stable, high productivity over many years.',
      author: {
        name: 'Dr. Priya Singh',
        role: 'Soil Scientist',
        avatar: '/avatars/expert5.png',
        fallback: 'PS'
      },
      category: 'Soil Management',
      tags: ['Soil Health', 'Composting', 'Crop Rotation'],
      date: 'March 5, 2023',
      readTime: '9 min read',
      featured: false,
      image: '/blog/soil-health.jpg'
    },
    {
      id: 6,
      title: 'Agricultural Drones: Practical Applications for Indian Farmers',
      excerpt: 'How drone technology is becoming accessible to Indian farmers and the various ways it can improve farm management.',
      content: 'Drone technology, once considered futuristic, is now becoming increasingly accessible to Indian farmers. This article explores the practical applications of agricultural drones across different farming operations and scales. It covers crop monitoring capabilities that can detect pest infestations, disease outbreaks, and nutrient deficiencies before they become visible to the naked eye. The article explains how drones equipped with multispectral and thermal cameras can create detailed field maps showing variations in crop health, allowing for targeted interventions. It also discusses precision spraying applications that can reduce pesticide usage by up to 30% while improving coverage and safety. The piece addresses the economics of drone adoption, including service-based models where farmers can hire drone services rather than purchasing equipment. Current regulations governing drone use in Indian agriculture and available government support programs are also covered, along with a roadmap for wider adoption across the country.',
      author: {
        name: 'Arjun Mehta',
        role: 'AgTech Specialist',
        avatar: '/avatars/expert6.png',
        fallback: 'AM'
      },
      category: 'Technology',
      tags: ['Drones', 'Precision Farming', 'Remote Sensing'],
      date: 'February 18, 2023',
      readTime: '7 min read',
      featured: false,
      image: '/blog/agricultural-drones.jpg'
    },
  ];

  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agricultural Innovations</h1>
        <p className="text-muted-foreground">
          Latest research, technologies, and best practices in modern agriculture
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles by title, tag, or category..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Categories</Button>
        <Button variant="outline">Tags</Button>
      </div>

      {searchQuery && (
        <div className="rounded-md bg-muted p-4">
          <h2 className="font-medium">Search Results</h2>
          <p className="text-sm text-muted-foreground">Found {filteredPosts.length} articles matching {searchQuery}</p>
        </div>
      )}

      {!searchQuery && (
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.filter(post => post.featured).map(post => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video w-full bg-muted">
                {/* This would be an actual image in production */}
                <div className="flex h-full items-center justify-center bg-primary-50 dark:bg-primary-900/20">
                  <p className="text-primary-700 dark:text-primary-300">{post.title} Image</p>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge>{post.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{post.author.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{post.author.name}</div>
                    <div className="text-xs text-muted-foreground">{post.author.role}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full">Read Article</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="sustainable">Sustainable Practices</TabsTrigger>
          <TabsTrigger value="crop-science">Crop Science</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => (
              <Card key={post.id} className="flex flex-col">
                <div className="aspect-video w-full bg-muted">
                  {/* This would be an actual image in production */}
                  <div className="flex h-full items-center justify-center bg-primary-50 dark:bg-primary-900/20">
                    <p className="text-primary-700 dark:text-primary-300">{post.title} Image</p>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-primary/5">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="ghost" className="w-full text-primary">Read Article</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </TabsContent>

        <TabsContent value="technology" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.filter(post => post.category === 'Technology').map(post => (
              <Card key={post.id} className="flex flex-col">
                {/* Same card structure as above */}
                <div className="aspect-video w-full bg-muted">
                  <div className="flex h-full items-center justify-center bg-primary-50 dark:bg-primary-900/20">
                    <p className="text-primary-700 dark:text-primary-300">{post.title} Image</p>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-primary/5">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="ghost" className="w-full text-primary">Read Article</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sustainable" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.filter(post =>
              post.category === 'Organic Farming' ||
              post.category === 'Water Management' ||
              post.category === 'Soil Management'
            ).map(post => (
              <Card key={post.id} className="flex flex-col">
                {/* Same card structure as above */}
                <div className="aspect-video w-full bg-muted">
                  <div className="flex h-full items-center justify-center bg-primary-50 dark:bg-primary-900/20">
                    <p className="text-primary-700 dark:text-primary-300">{post.title} Image</p>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-primary/5">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="ghost" className="w-full text-primary">Read Article</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crop-science" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.filter(post => post.category === 'Crop Science').map(post => (
              <Card key={post.id} className="flex flex-col">
                {/* Same card structure as above */}
                <div className="aspect-video w-full bg-muted">
                  <div className="flex h-full items-center justify-center bg-primary-50 dark:bg-primary-900/20">
                    <p className="text-primary-700 dark:text-primary-300">{post.title} Image</p>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-primary/5">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="ghost" className="w-full text-primary">Read Article</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Subscribe to Our Newsletter</CardTitle>
          <CardDescription>
            Get the latest agricultural innovations and research delivered to your inbox
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Enter your email address" type="email" className="flex-1" />
          <Button>Subscribe</Button>
        </CardContent>
      </Card>
    </div>
  );
}
