'use client';

import Link from 'next/link';
import { ArrowLeft, MessageCircle, Phone, Video, Calendar, Star, Award, Languages, MapPin, Briefcase, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect, use } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

// Metadata is now handled in a separate file

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
    consultationFee: '₹200 for 15 minutes',
    education: [
      'Ph.D. in Plant Pathology, Indian Agricultural Research Institute',
      'M.Sc. in Agriculture, Punjab Agricultural University',
      'B.Sc. in Agriculture, Haryana Agricultural University'
    ],
    expertise: [
      'Identification and management of crop diseases',
      'Integrated pest management',
      'Sustainable disease control methods',
      'Crop health monitoring'
    ],
    location: 'Delhi, India',
    availableSlots: [
      { date: 'Today', slots: ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] },
      { date: 'Tomorrow', slots: ['9:30 AM', '11:00 AM', '3:00 PM', '5:30 PM'] },
      { date: 'Day After Tomorrow', slots: ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'] }
    ],
    testimonials: [
      {
        name: 'Ramesh Singh',
        location: 'Haryana',
        rating: 5,
        comment: 'Dr. Kumar helped me identify and treat a fungal disease in my wheat crop that I had been struggling with for weeks. His advice saved my entire harvest.'
      },
      {
        name: 'Suresh Patel',
        location: 'Gujarat',
        rating: 5,
        comment: 'Very knowledgeable and patient. He explained the disease cycle and prevention methods in a way that was easy to understand.'
      },
      {
        name: 'Mahesh Yadav',
        location: 'Uttar Pradesh',
        rating: 4,
        comment: 'Provided practical and cost-effective solutions for managing pests in my vegetable farm. Would definitely consult again.'
      }
    ]
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
    consultationFee: '₹250 for 15 minutes',
    education: [
      'Ph.D. in Soil Science, Punjab Agricultural University',
      'M.Sc. in Soil Science, G.B. Pant University',
      'B.Sc. in Agriculture, Punjab Agricultural University'
    ],
    expertise: [
      'Soil testing and analysis',
      'Fertilizer recommendations',
      'Soil amendment strategies',
      'Organic soil management',
      'Nutrient deficiency diagnosis'
    ],
    location: 'Ludhiana, Punjab',
    availableSlots: [
      { date: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '2:30 PM', '4:00 PM'] },
      { date: 'Day After Tomorrow', slots: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'] },
      { date: 'In 3 Days', slots: ['9:30 AM', '11:30 AM', '2:00 PM', '4:30 PM'] }
    ],
    testimonials: [
      {
        name: 'Gurpreet Singh',
        location: 'Punjab',
        rating: 5,
        comment: 'Dr. Singh\'s soil management advice helped me improve my soil health significantly. My crop yield has increased by 30% after following her recommendations.'
      },
      {
        name: 'Harjinder Kaur',
        location: 'Haryana',
        rating: 5,
        comment: 'Very thorough in her analysis and recommendations. She suggested specific soil amendments that were perfect for my farm\'s soil type.'
      },
      {
        name: 'Manpreet Singh',
        location: 'Punjab',
        rating: 4,
        comment: 'Helped me understand the importance of soil testing and how to interpret the results. Her fertilizer recommendations were spot on.'
      }
    ]
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
    consultationFee: '₹200 for 15 minutes',
    education: [
      'Ph.D. in Agronomy, Indian Agricultural Research Institute',
      'M.Sc. in Agronomy, Banaras Hindu University',
      'B.Sc. in Agriculture, Chandra Shekhar Azad University'
    ],
    expertise: [
      'Crop rotation planning',
      'Intercropping strategies',
      'Precision farming techniques',
      'Sustainable crop management',
      'Yield optimization'
    ],
    location: 'Kanpur, Uttar Pradesh',
    availableSlots: [
      { date: 'Today', slots: ['11:00 AM', '1:30 PM', '3:00 PM', '5:30 PM'] },
      { date: 'Tomorrow', slots: ['10:30 AM', '12:00 PM', '2:30 PM', '4:00 PM'] },
      { date: 'Day After Tomorrow', slots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] }
    ],
    testimonials: [
      {
        name: 'Rajendra Kumar',
        location: 'Uttar Pradesh',
        rating: 5,
        comment: 'Dr. Verma\'s crop rotation plan has transformed my farm. I\'m now getting better yields with less input costs.'
      },
      {
        name: 'Vinod Sharma',
        location: 'Madhya Pradesh',
        rating: 4,
        comment: 'His advice on intercropping has helped me maximize land use and increase my overall farm income.'
      },
      {
        name: 'Sanjay Patel',
        location: 'Gujarat',
        rating: 5,
        comment: 'Very knowledgeable about modern farming techniques. He helped me implement precision farming methods that have significantly improved my crop quality.'
      }
    ]
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
    consultationFee: '₹250 for 15 minutes',
    education: [
      'Ph.D. in Plant Pathology, Gujarat Agricultural University',
      'M.Sc. in Plant Protection, Anand Agricultural University',
      'B.Sc. in Agriculture, Junagadh Agricultural University'
    ],
    expertise: [
      'Disease diagnosis and management',
      'Fungal and bacterial pathogen identification',
      'Viral disease management',
      'Integrated disease management',
      'Biological control methods'
    ],
    location: 'Ahmedabad, Gujarat',
    availableSlots: [
      { date: 'In 2 Days', slots: ['9:30 AM', '11:00 AM', '2:30 PM', '4:00 PM'] },
      { date: 'In 3 Days', slots: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'] },
      { date: 'In 4 Days', slots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] }
    ],
    testimonials: [
      {
        name: 'Naresh Patel',
        location: 'Gujarat',
        rating: 5,
        comment: 'Dr. Patel quickly identified a complex viral disease in my tomato crop that other experts had missed. Her treatment plan saved my entire greenhouse.'
      },
      {
        name: 'Bhavesh Shah',
        location: 'Maharashtra',
        rating: 5,
        comment: 'Extremely knowledgeable about plant diseases. She provided a comprehensive management plan that was both effective and environmentally friendly.'
      },
      {
        name: 'Kiran Modi',
        location: 'Rajasthan',
        rating: 4,
        comment: 'Her expertise in biological control methods has helped me reduce my dependence on chemical fungicides while still effectively managing diseases.'
      }
    ]
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
    consultationFee: '₹200 for 15 minutes',
    education: [
      'Ph.D. in Entomology, Tamil Nadu Agricultural University',
      'M.Sc. in Entomology, Kerala Agricultural University',
      'B.Sc. in Agriculture, Tamil Nadu Agricultural University'
    ],
    expertise: [
      'Integrated pest management',
      'Biological pest control',
      'Insect identification',
      'Eco-friendly pest control methods',
      'Pesticide resistance management'
    ],
    location: 'Coimbatore, Tamil Nadu',
    availableSlots: [
      { date: 'Today', slots: ['10:30 AM', '12:00 PM', '3:30 PM', '5:00 PM'] },
      { date: 'Tomorrow', slots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] },
      { date: 'Day After Tomorrow', slots: ['10:00 AM', '1:30 PM', '3:00 PM', '5:30 PM'] }
    ],
    testimonials: [
      {
        name: 'Murugan Rajan',
        location: 'Tamil Nadu',
        rating: 5,
        comment: 'Dr. Kumar\'s IPM strategies have helped me control pests effectively while reducing my pesticide use by 70%. My crops are healthier and my costs are lower.'
      },
      {
        name: 'Senthil Kumar',
        location: 'Kerala',
        rating: 4,
        comment: 'His knowledge of biological control agents is impressive. The predatory insects he recommended have kept my vegetable farm pest-free for months.'
      },
      {
        name: 'Lakshmi Narayanan',
        location: 'Andhra Pradesh',
        rating: 5,
        comment: 'Dr. Kumar helped me identify a rare pest infestation and provided a targeted control strategy that worked perfectly.'
      }
    ]
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
    consultationFee: '₹200 for 15 minutes',
    education: [
      'Ph.D. in Horticulture, Indian Agricultural Research Institute',
      'M.Sc. in Horticulture, Punjab Agricultural University',
      'B.Sc. in Agriculture, Himachal Pradesh Agricultural University'
    ],
    expertise: [
      'Fruit crop management',
      'Vegetable production techniques',
      'Protected cultivation',
      'Post-harvest management',
      'High-density planting'
    ],
    location: 'Shimla, Himachal Pradesh',
    availableSlots: [
      { date: 'Tomorrow', slots: ['9:30 AM', '11:00 AM', '2:30 PM', '4:00 PM'] },
      { date: 'Day After Tomorrow', slots: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'] },
      { date: 'In 3 Days', slots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] }
    ],
    testimonials: [
      {
        name: 'Vikram Singh',
        location: 'Himachal Pradesh',
        rating: 5,
        comment: 'Dr. Sharma\'s advice on high-density apple planting has transformed my orchard. My yield has doubled in just two years.'
      },
      {
        name: 'Neha Gupta',
        location: 'Uttarakhand',
        rating: 4,
        comment: 'Her expertise in protected cultivation helped me set up a successful polyhouse for growing off-season vegetables.'
      },
      {
        name: 'Rajinder Thakur',
        location: 'Himachal Pradesh',
        rating: 5,
        comment: 'Dr. Sharma provided excellent guidance on post-harvest handling that has significantly reduced my losses and improved the shelf life of my produce.'
      }
    ]
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
    consultationFee: '₹250 for 15 minutes',
    education: [
      'Ph.D. in Agricultural Economics, Indian Agricultural Research Institute',
      'M.Sc. in Agricultural Economics, Banaras Hindu University',
      'B.Sc. in Agriculture, Chandra Shekhar Azad University'
    ],
    expertise: [
      'Farm financial planning',
      'Market analysis and crop selection',
      'Cost-benefit analysis',
      'Risk management strategies',
      'Agricultural policy analysis'
    ],
    location: 'Lucknow, Uttar Pradesh',
    availableSlots: [
      { date: 'Today', slots: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'] },
      { date: 'Tomorrow', slots: ['9:30 AM', '11:00 AM', '2:30 PM', '4:00 PM'] },
      { date: 'Day After Tomorrow', slots: ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'] }
    ],
    testimonials: [
      {
        name: 'Dinesh Kumar',
        location: 'Uttar Pradesh',
        rating: 5,
        comment: 'Dr. Yadav\'s market analysis helped me choose the right crops for the season. My farm income has increased by 40% after following his advice.'
      },
      {
        name: 'Rakesh Sharma',
        location: 'Bihar',
        rating: 5,
        comment: 'His financial planning advice has transformed my farm from a loss-making venture to a profitable business.'
      },
      {
        name: 'Manoj Tiwari',
        location: 'Madhya Pradesh',
        rating: 4,
        comment: 'Dr. Yadav provided valuable insights on risk management strategies that have helped me navigate market fluctuations more effectively.'
      }
    ]
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
    consultationFee: '₹200 for 15 minutes',
    education: [
      'Ph.D. in Irrigation Engineering, Indian Institute of Technology',
      'M.Tech. in Water Resources Engineering, National Institute of Technology',
      'B.Tech. in Agricultural Engineering, Punjab Agricultural University'
    ],
    expertise: [
      'Drip irrigation design',
      'Sprinkler irrigation systems',
      'Water conservation techniques',
      'Irrigation scheduling',
      'Rainwater harvesting'
    ],
    location: 'Jaipur, Rajasthan',
    availableSlots: [
      { date: 'In 3 Days', slots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] },
      { date: 'In 4 Days', slots: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'] },
      { date: 'In 5 Days', slots: ['9:30 AM', '11:00 AM', '2:30 PM', '4:00 PM'] }
    ],
    testimonials: [
      {
        name: 'Prakash Sharma',
        location: 'Rajasthan',
        rating: 5,
        comment: 'Dr. Gupta designed a drip irrigation system for my farm that has reduced my water usage by 60% while improving crop yield.'
      },
      {
        name: 'Sunita Devi',
        location: 'Haryana',
        rating: 4,
        comment: 'Her irrigation scheduling advice has helped me optimize water use on my farm, saving both water and electricity costs.'
      },
      {
        name: 'Mahendra Singh',
        location: 'Gujarat',
        rating: 5,
        comment: 'Dr. Gupta\'s rainwater harvesting design has made my farm self-sufficient in water even in the dry season.'
      }
    ]
  }
];

export default function ExpertDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const expert = experts.find(expert => expert.id === unwrappedParams.id);

  // State for comment input
  const [comment, setComment] = useState('');

  // State for selected slot
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // State for dialogs
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  // Set document title dynamically
  useEffect(() => {
    if (expert) {
      document.title = `${expert.name} - Expert Profile | BhuDhan Krishi`;
    }
  }, [expert]);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    toast.success('Comment sent successfully!');
    setComment('');
  };

  // Handle booking appointment
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error('Please select a date and time slot');
      return;
    }

    toast.success(`Appointment booked with ${expert?.name} on ${selectedDate} at ${selectedSlot}`);
    setBookingDialogOpen(false);
    setSelectedDate('');
    setSelectedSlot('');
  };

  // Handle starting a chat
  const handleStartChat = () => {
    toast.success(`Chat started with ${expert?.name}`);
    setMessageDialogOpen(false);
  };

  // Handle voice call
  const handleVoiceCall = () => {
    toast.success(`Voice call initiated with ${expert?.name}`);
    setCallDialogOpen(false);
  };

  // Handle video call
  const handleVideoCall = () => {
    toast.success(`Video call initiated with ${expert?.name}`);
    setVideoDialogOpen(false);
  };

  if (!expert) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center">
          <Link href="/expert-connect">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Experts
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Expert Not Found</h1>
            <p>The expert you are looking for does not exist or has been removed.</p>
            <Link href="/expert-connect">
              <Button className="mt-4">View All Experts</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <Link href="/expert-connect">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Experts
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl">{expert.name}</CardTitle>
                  <p className="text-muted-foreground">{expert.title} • {expert.specialization}</p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center">
                  <Badge variant="outline" className="flex items-center mr-2">
                    <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {expert.rating} ({expert.reviews} reviews)
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                    {expert.availability}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{expert.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {expert.expertise.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  <ul className="space-y-2">
                    {expert.education.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Tabs defaultValue="testimonials">
                  <TabsList>
                    <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                  </TabsList>
                  <TabsContent value="testimonials" className="mt-4">
                    <div className="space-y-4">
                      {expert.testimonials.map((testimonial, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                              </div>
                              <div className="flex items-center">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">{testimonial.comment}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="availability" className="mt-4">
                    <div className="space-y-4">
                      {expert.availableSlots.map((day, index) => (
                        <div key={index}>
                          <h4 className="font-semibold mb-2">{day.date}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {day.slots.map((slot, slotIndex) => (
                              <Button key={slotIndex} variant="outline" className="text-sm">
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book a Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="font-semibold">{expert.consultationFee}</p>
                <p className="text-sm text-muted-foreground">Consultation Fee</p>
              </div>

              <div className="space-y-2">
                <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book a Consultation with {expert.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Select Date</Label>
                        <RadioGroup value={selectedDate} onValueChange={setSelectedDate}>
                          {expert.availableSlots.map((day, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem value={day.date} id={`date-${index}`} />
                              <Label htmlFor={`date-${index}`}>{day.date}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {selectedDate && (
                        <div className="space-y-2">
                          <Label>Select Time Slot</Label>
                          <RadioGroup value={selectedSlot} onValueChange={setSelectedSlot}>
                            <div className="grid grid-cols-2 gap-2">
                              {expert.availableSlots
                                .find(day => day.date === selectedDate)?.slots
                                .map((slot, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={slot} id={`slot-${index}`} />
                                    <Label htmlFor={`slot-${index}`}>{slot}</Label>
                                  </div>
                                ))}
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm">Consultation Fee: {expert.consultationFee}</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleBookAppointment}>Confirm Booking</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="grid grid-cols-3 gap-2">
                  <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" title="Send Message">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Message {expert.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Textarea
                          placeholder="Type your message here..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleStartChat}>Send Message</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={callDialogOpen} onOpenChange={setCallDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" title="Voice Call">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Call {expert.name}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 text-center">
                        <p className="mb-4">Start a voice call with {expert.name}?</p>
                        <p className="text-sm text-muted-foreground">Call rate: {expert.consultationFee}</p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCallDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleVoiceCall}>Start Call</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" title="Video Call">
                        <Video className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Video Call with {expert.name}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 text-center">
                        <p className="mb-4">Start a video call with {expert.name}?</p>
                        <p className="text-sm text-muted-foreground">Call rate: {expert.consultationFee}</p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setVideoDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleVideoCall}>Start Video Call</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="mr-2 h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{expert.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Languages className="mr-2 h-5 w-5" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {expert.languages.map((language, index) => (
                  <Badge key={index} variant="outline">{language}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Briefcase className="mr-2 h-5 w-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{expert.experience}</p>
            </CardContent>
          </Card>

          {/* Comment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Leave a Comment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Write your comment or question here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleCommentSubmit} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
