'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageSquare, Share2, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/language-context';

// Define types for event and story
interface CommunityEvent {
  id: number;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  organizer?: string;
  description?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  [key: string]: unknown;
}

interface Story {
  id: number;
  title: string;
  content?: string;
  author?: string;
  date?: string;
  likes?: number;
  comments?: number;
  [key: string]: unknown;
}

export default function FarmerSuccessStoriesPage() {
  useLanguage();
  const [, setActiveTab] = useState('success-stories');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isSubmitEventDialogOpen, setIsSubmitEventDialogOpen] = useState(false);
  const [isStoryDialogOpen, setIsStoryDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [likedStories, setLikedStories] = useState<number[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    phone: '',
    email: '',
    attendees: 1,
    comments: ''
  });
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  // Handle input changes for the new discussion form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDiscussion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes for the new discussion form
  const handleSelectChange = (value: string, name: string) => {
    setNewDiscussion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle event registration form input changes
  const handleRegistrationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: name === 'attendees' ? parseInt(value) || 1 : value
    }));
  };

  // Handle event registration form submission
  const handleEventRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Event registration:', { event: selectedEvent, registration: registrationForm });

    // Reset the form
    setRegistrationForm({
      name: '',
      phone: '',
      email: '',
      attendees: 1,
      comments: ''
    });

    // Close the dialog
    setIsEventDialogOpen(false);

    // Show a success message (in a real app)
    alert(`Registration successful! You've registered for "${selectedEvent?.title}". We'll contact you with more details.`);
  };

  // Open event registration dialog
  const openEventRegistration = (event: CommunityEvent) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  // Open success story details dialog
  const openStoryDetails = (story: Story) => {
    setSelectedStory(story);
    setIsStoryDialogOpen(true);
  };

  // Handle liking a story
  const handleLikeStory = (storyId: number, event?: React.MouseEvent) => {
    // Prevent event propagation if called from a button inside a card
    if (event) {
      event.stopPropagation();
    }

    if (likedStories.includes(storyId)) {
      // Unlike the story
      setLikedStories(likedStories.filter(id => id !== storyId));

      // Update the story likes count in the state

      // In a real app, you would send this to the backend
      console.log(`Unliked story ${storyId}`);
    } else {
      // Like the story
      setLikedStories([...likedStories, storyId]);

      // Update the story likes count in the state

      // In a real app, you would send this to the backend
      console.log(`Liked story ${storyId}`);
    }
  };

  // Open comment dialog
  const openCommentDialog = (story: Story, event?: React.MouseEvent) => {
    // Prevent event propagation if called from a button inside a card
    if (event) {
      event.stopPropagation();
    }

    setSelectedStory(story);
    setCommentText('');
    setIsCommentDialogOpen(true);
  };

  // Handle submitting a comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim() || !selectedStory) return;

    // Update the story comments count in the state

    // In a real app, you would send this to the backend
    console.log(`Added comment to story ${selectedStory.id}: ${commentText}`);

    // Reset form and close dialog
    setCommentText('');
    setIsCommentDialogOpen(false);

    // Show success message
    alert('Comment added successfully!');
  };

  // Open share dialog
  const openShareDialog = (story: Story, event?: React.MouseEvent) => {
    // Prevent event propagation if called from a button inside a card
    if (event) {
      event.stopPropagation();
    }

    setSelectedStory(story);
    setIsShareDialogOpen(true);
  };

  // Handle sharing a story
  const handleShareStory = (platform: string) => {
    if (!selectedStory) return;

    // Update the story shares count in the state

    // In a real app, you would integrate with social media APIs
    console.log(`Shared story ${selectedStory.id} on ${platform}`);

    // Close dialog
    setIsShareDialogOpen(false);

    // Show success message
    alert(`Story shared on ${platform}!`);
  };

  // Handle event form input changes
  const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle event form submission
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Event submission:', eventForm);

    // Reset the form
    setEventForm({
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      description: '',
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    });

    // Close the dialog
    setIsSubmitEventDialogOpen(false);

    // Show a success message (in a real app)
    alert('Event submitted successfully! Our team will review it and get back to you soon.');
  };

  // Handle discussion form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('New discussion:', newDiscussion);

    // Add the new discussion to the list (in a real app, this would come from the backend)

    // Reset the form
    setNewDiscussion({
      title: '',
      content: '',
      category: '',
      tags: ''
    });

    // Close the dialog
    setIsDialogOpen(false);

    // Show a success message (in a real app)
    alert('Discussion created successfully!');
  };

  // Sample success stories data
  const successStories = [
    {
      id: 1,
      farmer: {
        name: 'Rajesh Kumar',
        location: 'Haryana',
        avatar: '/avatars/farmer1.png',
        fallback: 'RK'
      },
      title: 'Doubled Rice Yield with Smart Irrigation',
      content: 'I used to struggle with inconsistent rice yields due to improper irrigation. After joining BhuDhan, I learned about precision irrigation techniques and installed soil moisture sensors. This year, I\'ve doubled my yield while using 30% less water! The weather alerts also helped me plan my irrigation schedule better.',
      crops: ['Rice', 'Wheat'],
      likes: 245,
      comments: 42,
      shares: 18,
      date: '2 months ago',
      featured: true
    },
    {
      id: 2,
      farmer: {
        name: 'Lakshmi Devi',
        location: 'Tamil Nadu',
        avatar: '/avatars/farmer2.png',
        fallback: 'LD'
      },
      title: 'Organic Farming Success with Community Support',
      content: 'Switching to organic farming was challenging until I connected with other farmers through BhuDhan. I learned natural pest control methods and organic fertilizer preparation. Now my vegetables fetch 40% higher prices in the market, and I\'ve reduced my input costs significantly. The expert advice on crop rotation has been invaluable.',
      crops: ['Vegetables', 'Pulses'],
      likes: 189,
      comments: 37,
      shares: 23,
      date: '3 months ago',
      featured: true
    },
    {
      id: 3,
      farmer: {
        name: 'Gurpreet Singh',
        location: 'Punjab',
        avatar: '/avatars/farmer3.png',
        fallback: 'GS'
      },
      title: 'Modern Equipment Transformed My Farm',
      content: 'I was hesitant to invest in modern equipment due to high costs. Through BhuDhan\'s equipment sharing feature, I was able to use a tractor and harvester at affordable rates. This has reduced my harvesting time by 70% and labor costs by 50%. I\'ve also connected with other farmers to share equipment costs for future seasons.',
      crops: ['Wheat', 'Maize'],
      likes: 156,
      comments: 28,
      shares: 14,
      date: '1 month ago',
      featured: false
    },
    {
      id: 4,
      farmer: {
        name: 'Anita Patel',
        location: 'Gujarat',
        avatar: '/avatars/farmer4.png',
        fallback: 'AP'
      },
      title: 'Disease Management Success Story',
      content: 'Last year, my cotton crop was devastated by bollworm. This year, I used BhuDhan\'s disease detection tool to identify early signs of infestation and received immediate treatment recommendations. I was able to control the pest before it caused significant damage. My cotton yield increased by 35% compared to last year.',
      crops: ['Cotton', 'Groundnut'],
      likes: 132,
      comments: 19,
      shares: 8,
      date: '2 weeks ago',
      featured: false
    },
    {
      id: 5,
      farmer: {
        name: 'Manoj Verma',
        location: 'Madhya Pradesh',
        avatar: '/avatars/farmer5.png',
        fallback: 'MV'
      },
      title: 'Direct Market Access Changed Everything',
      content: 'For years, I sold my produce to middlemen at low prices. After joining BhuDhan\'s marketplace, I can now sell directly to consumers and retailers. My income has increased by 60%, and I\'ve established regular customers who value the quality of my organic produce. The digital payment system has also made transactions much easier.',
      crops: ['Soybean', 'Vegetables'],
      likes: 201,
      comments: 31,
      shares: 27,
      date: '3 weeks ago',
      featured: true
    },
  ];

  // Sample discussion topics
  const discussionTopics = [
    {
      id: 1,
      title: 'Best practices for water conservation during summer',
      author: 'Ramesh Sharma',
      replies: 28,
      views: 342,
      lastActive: '2 hours ago',
      tags: ['Water Management', 'Summer Crops']
    },
    {
      id: 2,
      title: 'Organic alternatives to chemical pesticides',
      author: 'Sunita Rao',
      replies: 45,
      views: 512,
      lastActive: '1 day ago',
      tags: ['Organic Farming', 'Pest Control']
    },
    {
      id: 3,
      title: 'Government subsidy for solar pumps - eligibility criteria',
      author: 'Prakash Joshi',
      replies: 36,
      views: 428,
      lastActive: '3 days ago',
      tags: ['Government Schemes', 'Solar Energy']
    },
    {
      id: 4,
      title: 'How to prepare for early monsoon this year?',
      author: 'Kavita Nair',
      replies: 19,
      views: 276,
      lastActive: '5 hours ago',
      tags: ['Monsoon Preparation', 'Weather']
    },
    {
      id: 5,
      title: 'Market rates for wheat in different mandis',
      author: 'Harjinder Singh',
      replies: 32,
      views: 389,
      lastActive: '12 hours ago',
      tags: ['Market Prices', 'Wheat']
    },
  ];

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Organic Farming Workshop',
      date: 'June 15, 2023',
      location: 'Krishi Vigyan Kendra, Rewari',
      organizer: 'Agricultural Extension Department',
      description: 'Learn organic farming techniques, composting methods, and natural pest control strategies from experts.'
    },
    {
      id: 2,
      title: 'Agricultural Equipment Exhibition',
      date: 'July 10-12, 2023',
      location: 'Exhibition Ground, Haryana',
      organizer: 'Farm Machinery Manufacturers Association',
      description: 'Explore the latest agricultural equipment, tools, and technologies from leading manufacturers.'
    },
    {
      id: 3,
      title: 'Farmer-Scientist Interaction Program',
      date: 'June 25, 2023',
      location: 'Community Hall, Rewari',
      organizer: 'Indian Council of Agricultural Research',
      description: 'Direct interaction with agricultural scientists to discuss crop-specific challenges and solutions.'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Event Registration Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <form onSubmit={handleEventRegistration}>
            <DialogHeader>
              <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
              <DialogDescription>
                {selectedEvent?.date} at {selectedEvent?.location}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={registrationForm.name}
                  onChange={handleRegistrationInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={registrationForm.phone}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={registrationForm.email}
                    onChange={handleRegistrationInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="attendees">Number of Attendees</Label>
                <Input
                  id="attendees"
                  name="attendees"
                  type="number"
                  min="1"
                  max="10"
                  value={registrationForm.attendees}
                  onChange={handleRegistrationInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  placeholder="Any specific questions or requirements?"
                  value={registrationForm.comments}
                  onChange={handleRegistrationInputChange}
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEventDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Confirm Registration</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Story Details Dialog */}
      <Dialog open={isStoryDialogOpen} onOpenChange={setIsStoryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedStory && (
            (() => {
              const farmer = typeof selectedStory.farmer === 'object' && selectedStory.farmer !== null ? selectedStory.farmer as { fallback?: string; name?: string; location?: string } : {};
              const crops = Array.isArray(selectedStory.crops) ? selectedStory.crops as string[] : [];
              return (
                <div className="space-y-4">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar>
                        <AvatarFallback>{farmer.fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <DialogTitle className="text-left">{farmer.name}</DialogTitle>
                        <div className="text-xs text-muted-foreground">{farmer.location} • {selectedStory.date}</div>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{selectedStory.title}</h3>

                    <div className="flex flex-wrap gap-2">
                      {crops.map((crop: string) => (
                        <Badge key={crop} variant="outline" className="bg-primary/5">{crop}</Badge>
                      ))}
                    </div>

                    <div className="text-sm space-y-4">
                      {selectedStory.content ? selectedStory.content.split('\n').map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                      )) : null}
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Impact</h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">+</div>
                          <span>Increased yield by approximately 40% compared to traditional methods</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">+</div>
                          <span>Reduced water usage by 30% through precision irrigation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">+</div>
                          <span>Improved income stability through direct market access</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <DialogFooter className="flex justify-between border-t pt-4">
                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 ${likedStories.includes(selectedStory.id) ? 'text-primary' : 'text-muted-foreground'}`}
                        onClick={() => handleLikeStory(selectedStory.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{selectedStory.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-muted-foreground"
                        onClick={() => openCommentDialog(selectedStory)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{selectedStory.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-muted-foreground"
                        onClick={() => openShareDialog(selectedStory)}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>{typeof selectedStory.shares === 'number' ? selectedStory.shares : ''}</span>
                      </Button>
                    </div>
                    <Button variant="outline" onClick={() => setIsStoryDialogOpen(false)}>Close</Button>
                  </DialogFooter>
                </div>
              );
            })()
          )}
        </DialogContent>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedStory && (
            <div>
              <DialogHeader>
                <DialogTitle>Add a Comment</DialogTitle>
                <DialogDescription>
                  Share your thoughts on {selectedStory.title}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCommentSubmit} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="comment">Your Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Write your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={!commentText.trim()}>Post Comment</Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          {selectedStory && (
            <div>
              <DialogHeader>
                <DialogTitle>Share This Story</DialogTitle>
                <DialogDescription>
                  Choose a platform to share {selectedStory.title}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 justify-center py-6"
                  onClick={() => handleShareStory('WhatsApp')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                  <span>WhatsApp</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 justify-center py-6"
                  onClick={() => handleShareStory('Facebook')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span>Facebook</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 justify-center py-6"
                  onClick={() => handleShareStory('Twitter')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  <span>Twitter</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 justify-center py-6"
                  onClick={() => handleShareStory('Email')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>Email</span>
                </Button>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>Cancel</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Submit Event Dialog */}
      <Dialog open={isSubmitEventDialogOpen} onOpenChange={setIsSubmitEventDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <form onSubmit={handleEventSubmit}>
            <DialogHeader>
              <DialogTitle>Submit Your Event</DialogTitle>
              <DialogDescription>
                Share your agricultural event with the farming community
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  name="title"
                  placeholder="Enter a descriptive title for your event"
                  value={eventForm.title}
                  onChange={handleEventFormChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    name="date"
                    type="date"
                    value={eventForm.date}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input
                    id="event-time"
                    name="time"
                    type="time"
                    value={eventForm.time}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  name="location"
                  placeholder="Enter the venue address or online meeting link"
                  value={eventForm.location}
                  onChange={handleEventFormChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-organizer">Organizer/Organization</Label>
                <Input
                  id="event-organizer"
                  name="organizer"
                  placeholder="Enter the name of the organizing person or entity"
                  value={eventForm.organizer}
                  onChange={handleEventFormChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-description">Event Description</Label>
                <Textarea
                  id="event-description"
                  name="description"
                  placeholder="Describe the event, topics covered, and what attendees can expect"
                  value={eventForm.description}
                  onChange={handleEventFormChange}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Contact Information</Label>
                <div className="grid gap-4">
                  <Input
                    id="contact-name"
                    name="contactName"
                    placeholder="Contact Person's Name"
                    value={eventForm.contactName}
                    onChange={handleEventFormChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="contact-email"
                      name="contactEmail"
                      type="email"
                      placeholder="Contact Email"
                      value={eventForm.contactEmail}
                      onChange={handleEventFormChange}
                      required
                    />
                    <Input
                      id="contact-phone"
                      name="contactPhone"
                      placeholder="Contact Phone"
                      value={eventForm.contactPhone}
                      onChange={handleEventFormChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsSubmitEventDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Submit Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Farmer Community</h1>
        <p className="text-muted-foreground">
          Connect with fellow farmers, share experiences, and learn from success stories
        </p>
      </div>

      <Tabs defaultValue="success-stories" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>

        <TabsContent value="success-stories" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {successStories.filter(story => story.featured).map(story => (
              <Card key={story.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{story.farmer.fallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{story.farmer.name}</div>
                      <div className="text-xs text-muted-foreground">{story.farmer.location} • {story.date}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <h3 className="mb-2 text-lg font-semibold">{story.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{story.content}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {story.crops.map(crop => (
                      <Badge key={crop} variant="outline" className="bg-primary/5">{crop}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 ${likedStories.includes(story.id) ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={(e) => handleLikeStory(story.id, e)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{story.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground"
                      onClick={(e) => openCommentDialog(story, e)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{story.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground"
                      onClick={(e) => openShareDialog(story, e)}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>{story.shares}</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() => openStoryDetails(story)}
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8">More Success Stories</h2>
          <div className="space-y-4">
            {successStories.filter(story => !story.featured).map(story => (
              <Card key={story.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{story.farmer.fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{story.farmer.name}</div>
                        <div className="text-xs text-muted-foreground">{story.farmer.location} • {story.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {story.crops.map(crop => (
                        <Badge key={crop} variant="outline" className="bg-primary/5">{crop}</Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <h3 className="mb-1 text-base font-semibold">{story.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{story.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 ${likedStories.includes(story.id) ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={(e) => handleLikeStory(story.id, e)}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">{story.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground"
                      onClick={(e) => openCommentDialog(story, e)}
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span className="text-xs">{story.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground"
                      onClick={(e) => openShareDialog(story, e)}
                    >
                      <Share2 className="h-3 w-3" />
                      <span className="text-xs">{story.shares}</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary text-xs"
                    onClick={() => openStoryDetails(story)}
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">View All Success Stories</Button>
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Discussions</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Start New Discussion</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle>Create New Discussion</DialogTitle>
                        <DialogDescription>
                          Share your questions, ideas, or experiences with the farming community.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Enter a descriptive title"
                            value={newDiscussion.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newDiscussion.category}
                            onValueChange={(value) => handleSelectChange(value, 'category')}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="crop-management">Crop Management</SelectItem>
                              <SelectItem value="pest-control">Pest Control</SelectItem>
                              <SelectItem value="irrigation">Irrigation</SelectItem>
                              <SelectItem value="soil-health">Soil Health</SelectItem>
                              <SelectItem value="market-prices">Market Prices</SelectItem>
                              <SelectItem value="equipment">Farming Equipment</SelectItem>
                              <SelectItem value="general">General Discussion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            name="content"
                            placeholder="Describe your topic in detail"
                            value={newDiscussion.content}
                            onChange={handleInputChange}
                            className="min-h-[120px]"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            name="tags"
                            placeholder="e.g., wheat, irrigation, organic"
                            value={newDiscussion.tags}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Post Discussion</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Join conversations with farmers across India
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-6">Topic</div>
                  <div className="col-span-2 text-center">Replies</div>
                  <div className="col-span-2 text-center">Views</div>
                  <div className="col-span-2 text-center">Last Activity</div>
                </div>

                {discussionTopics.map(topic => (
                  <div key={topic.id} className="grid grid-cols-12 border-b p-3 text-sm">
                    <div className="col-span-6">
                      <div className="font-medium hover:text-primary cursor-pointer">{topic.title}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {topic.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Started by {topic.author}</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">{topic.replies}</div>
                    <div className="col-span-2 flex items-center justify-center">{topic.views}</div>
                    <div className="col-span-2 flex items-center justify-center text-xs">{topic.lastActive}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 124 discussions</div>
              <Button variant="outline" size="sm">
                View More
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
                <CardDescription>
                  Browse discussions by topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Organic Farming</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Water Management</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Pest Control</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Market Prices</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Government Schemes</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Crop Rotation</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Soil Health</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Seeds</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Equipment</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Weather</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Irrigation</Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 cursor-pointer">Fertilizers</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>
                  Help us maintain a helpful and respectful community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Be respectful and supportive of fellow farmers</p>
                <p>• Share accurate and verified information</p>
                <p>• Avoid promotional content and spam</p>
                <p>• Use appropriate language and tone</p>
                <p>• Report inappropriate content to moderators</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map(event => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {event.date} • {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <p className="mt-3 text-sm font-medium">Organized by: {event.organizer}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    onClick={() => openEventRegistration(event)}
                  >
                    Register Interest
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit Your Event</CardTitle>
              <CardDescription>
                Hosting an agricultural event? Let the community know!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                If you are organizing a workshop, training session, or any agricultural event,
                you can submit it to be featured in our community calendar. Events are reviewed
                by our team before being published.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => setIsSubmitEventDialogOpen(true)}
              >
                Submit Event
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
