import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Expert Connect | BhuDhan Krishi',
  description: 'Connect with agricultural experts for personalized advice and problem-solving',
};

// Mock experts data (in a real app, this would come from an API)
const experts = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    title: 'Agricultural Scientist',
    specialization: 'Crop Diseases',
    experience: '15 years',
    rating: 4.9,
    reviews: 124,
    languages: ['English', 'Hindi'],
    availability: 'Available today',
    image: '/images/experts/expert1.jpg',
    bio: 'Dr. Rajesh Kumar is an agricultural scientist with expertise in crop diseases and pest management. He has helped thousands of farmers identify and treat various crop diseases effectively.',
    consultationFee: '₹200 for 15 minutes'
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    title: 'Soil Scientist',
    specialization: 'Soil Health',
    experience: '12 years',
    rating: 4.8,
    reviews: 98,
    languages: ['English', 'Hindi', 'Punjabi'],
    availability: 'Available tomorrow',
    image: '/images/experts/expert2.jpg',
    bio: 'Dr. Priya Singh specializes in soil health management and has extensive experience in recommending appropriate fertilizers and soil amendments for different crops and soil types.',
    consultationFee: '₹250 for 15 minutes'
  },
  {
    id: '3',
    name: 'Dr. Amit Verma',
    title: 'Agronomist',
    specialization: 'Crop Management',
    experience: '10 years',
    rating: 4.7,
    reviews: 87,
    languages: ['English', 'Hindi'],
    availability: 'Available today',
    image: '/images/experts/expert3.jpg',
    bio: 'Dr. Amit Verma is an agronomist with expertise in crop management practices. He provides guidance on crop selection, rotation, and cultivation techniques to maximize yield.',
    consultationFee: '₹200 for 15 minutes'
  },
  {
    id: '4',
    name: 'Dr. Meena Patel',
    title: 'Plant Pathologist',
    specialization: 'Plant Diseases',
    experience: '14 years',
    rating: 4.9,
    reviews: 112,
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: 'Available in 2 days',
    image: '/images/experts/expert4.jpg',
    bio: 'Dr. Meena Patel is a plant pathologist specializing in the diagnosis and management of plant diseases. She has published several research papers on sustainable disease management practices.',
    consultationFee: '₹250 for 15 minutes'
  },
  {
    id: '5',
    name: 'Dr. Suresh Kumar',
    title: 'Entomologist',
    specialization: 'Pest Management',
    experience: '11 years',
    rating: 4.6,
    reviews: 76,
    languages: ['English', 'Hindi', 'Tamil'],
    availability: 'Available today',
    image: '/images/experts/expert5.jpg',
    bio: 'Dr. Suresh Kumar is an entomologist with expertise in integrated pest management. He helps farmers implement eco-friendly pest control strategies.',
    consultationFee: '₹200 for 15 minutes'
  },
  {
    id: '6',
    name: 'Dr. Anita Sharma',
    title: 'Horticulturist',
    specialization: 'Fruit & Vegetable Crops',
    experience: '9 years',
    rating: 4.7,
    reviews: 82,
    languages: ['English', 'Hindi'],
    availability: 'Available tomorrow',
    image: '/images/experts/expert6.jpg',
    bio: 'Dr. Anita Sharma specializes in horticultural crops, particularly fruits and vegetables. She provides guidance on cultivation practices, disease management, and post-harvest handling.',
    consultationFee: '₹200 for 15 minutes'
  },
  {
    id: '7',
    name: 'Dr. Ramesh Yadav',
    title: 'Agricultural Economist',
    specialization: 'Farm Economics',
    experience: '13 years',
    rating: 4.8,
    reviews: 91,
    languages: ['English', 'Hindi'],
    availability: 'Available today',
    image: '/images/experts/expert7.jpg',
    bio: 'Dr. Ramesh Yadav is an agricultural economist who helps farmers make informed decisions about crop selection, marketing, and financial planning to maximize farm profitability.',
    consultationFee: '₹250 for 15 minutes'
  },
  {
    id: '8',
    name: 'Dr. Neha Gupta',
    title: 'Irrigation Specialist',
    specialization: 'Water Management',
    experience: '8 years',
    rating: 4.6,
    reviews: 68,
    languages: ['English', 'Hindi'],
    availability: 'Available in 3 days',
    image: '/images/experts/expert8.jpg',
    bio: 'Dr. Neha Gupta specializes in irrigation and water management. She helps farmers implement efficient irrigation systems and water conservation practices.',
    consultationFee: '₹200 for 15 minutes'
  }
];

// Group experts by specialization
const groupedExperts = experts.reduce((acc, expert) => {
  const specialization = expert.specialization.toLowerCase();
  if (!acc[specialization]) {
    acc[specialization] = [];
  }
  acc[specialization].push(expert);
  return acc;
}, {} as Record<string, typeof experts>);

export default function ExpertConnectPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <h1 className="text-3xl font-bold">Expert Connect</h1>
      </div>

      <div className="mb-8">
        <p className="text-muted-foreground">
          Connect with agricultural experts for personalized advice and problem-solving. 
          Our experts can help you with crop diseases, soil health, pest management, and more.
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search experts by name or specialization..." 
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Experts</TabsTrigger>
          <TabsTrigger value="crop diseases">Crop Diseases</TabsTrigger>
          <TabsTrigger value="soil health">Soil Health</TabsTrigger>
          <TabsTrigger value="pest management">Pest Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </TabsContent>
        
        {Object.entries(groupedExperts).map(([specialization, specializedExperts]) => (
          <TabsContent key={specialization} value={specialization}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {specializedExperts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
        <h2 className="mb-4 text-2xl font-bold">How Expert Connect Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
              <span className="text-lg font-bold text-green-800 dark:text-green-200">1</span>
            </div>
            <h3 className="text-lg font-semibold">Choose an Expert</h3>
            <p className="text-sm text-muted-foreground">
              Browse our list of agricultural experts and select one based on your specific needs.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
              <span className="text-lg font-bold text-green-800 dark:text-green-200">2</span>
            </div>
            <h3 className="text-lg font-semibold">Book a Consultation</h3>
            <p className="text-sm text-muted-foreground">
              Schedule a consultation at a time that works for you. Choose between chat, voice, or video call.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
              <span className="text-lg font-bold text-green-800 dark:text-green-200">3</span>
            </div>
            <h3 className="text-lg font-semibold">Get Personalized Advice</h3>
            <p className="text-sm text-muted-foreground">
              Connect with the expert and receive personalized advice for your specific farming challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpertCard({ expert }: { expert: typeof experts[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          Expert Photo
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg">{expert.name}</CardTitle>
            <CardDescription>{expert.title}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            {expert.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">Specialization:</span>
            <span className="ml-2">{expert.specialization}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">Experience:</span>
            <span className="ml-2">{expert.experience}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">Languages:</span>
            <span className="ml-2">{expert.languages.join(', ')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-green-600" />
            <span className="text-green-600">{expert.availability}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Link href={`/expert-connect/${expert.id}`} className="w-full">
          <Button variant="outline" className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
