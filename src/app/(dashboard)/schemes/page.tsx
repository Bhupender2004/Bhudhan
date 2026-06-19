'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ExternalLink, ArrowRight, CheckCircle2, ShieldCheck, Landmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Mock schemes data (in a real app, this would come from an API)
const schemes = [
  {
    id: '1',
    title: 'PM Kisan Samman Nidhi',
    description: 'Income support of ₹6,000 per year in three equal installments to all land holding farmer families.',
    category: 'Subsidy',
    eligibility: 'All land holding farmers with cultivable land.',
    benefits: '₹6,000 per year in three equal installments of ₹2,000 each.',
    applicationProcess: 'Apply online through the PM-KISAN portal or visit your nearest Common Service Center.',
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
    lastDate: '30 June 2025',
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: '2',
    title: 'Kisan Credit Card Scheme',
    description: 'Provides farmers with affordable credit for their agricultural needs.',
    category: 'Loan',
    eligibility: 'All farmers, sharecroppers, tenant farmers, and self-help groups.',
    benefits: 'Credit limit up to ₹3 lakh with interest subvention of 2% and additional 3% for timely repayment.',
    applicationProcess: 'Apply at your nearest bank branch or through online banking portals.',
    documents: ['Identity Proof', 'Address Proof', 'Land Records', 'Passport Size Photographs'],
    lastDate: 'Ongoing',
    link: 'https://www.nabard.org/content.aspx?id=591'
  },
  {
    id: '3',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to provide financial support to farmers in case of crop failure due to natural calamities.',
    category: 'Insurance',
    eligibility: 'All farmers growing notified crops in notified areas.',
    benefits: 'Comprehensive risk coverage for pre-sowing to post-harvest losses due to natural calamities.',
    applicationProcess: 'Apply through banks at the time of taking crop loans or through insurance companies.',
    documents: ['Bank Account Details', 'Land Records', 'Sowing Certificate'],
    lastDate: '15 July 2025',
    link: 'https://pmfby.gov.in/'
  },
  {
    id: '4',
    title: 'Soil Health Card Scheme',
    description: 'Provides information on soil health and recommends appropriate dosage of nutrients for improving soil health and fertility.',
    category: 'Subsidy',
    eligibility: 'All farmers across India.',
    benefits: 'Free soil testing and recommendations for nutrients and fertilizers.',
    applicationProcess: 'Apply at your nearest Krishi Vigyan Kendra or agriculture department office.',
    documents: ['Identity Proof', 'Land Records'],
    lastDate: 'Ongoing',
    link: 'https://soilhealth.dac.gov.in/'
  },
  {
    id: '5',
    title: 'National Mission for Sustainable Agriculture',
    description: 'Promotes sustainable agriculture through water use efficiency, nutrient management, and livelihood diversification.',
    category: 'Subsidy',
    eligibility: 'Farmers adopting sustainable agricultural practices.',
    benefits: 'Financial assistance for adopting sustainable farming practices, micro-irrigation, and organic farming.',
    applicationProcess: 'Apply through your district agriculture office.',
    documents: ['Identity Proof', 'Land Records', 'Bank Account Details'],
    lastDate: 'Ongoing',
    link: 'https://nmsa.dac.gov.in/'
  },
  {
    id: '6',
    title: 'Agriculture Infrastructure Fund',
    description: 'Financing facility for investment in agriculture infrastructure projects at farm-gate and aggregation points.',
    category: 'Loan',
    eligibility: 'Farmers, FPOs, PACS, Marketing Cooperative Societies, and Entrepreneurs.',
    benefits: 'Loans with interest subvention of 3% per annum up to ₹2 crore, credit guarantee coverage for loans up to ₹2 crore.',
    applicationProcess: 'Apply through participating lending institutions or online portal.',
    documents: ['Project Report', 'Identity Proof', 'Address Proof', 'Bank Account Details'],
    lastDate: 'Ongoing',
    link: 'https://agriinfra.dac.gov.in/'
  },
  {
    id: '7',
    title: 'PM Krishi Sinchai Yojana',
    description: 'Ensures access to means of irrigation to all agricultural farms to produce "per drop more crop".',
    category: 'Subsidy',
    eligibility: 'All farmers seeking irrigation facilities.',
    benefits: 'Subsidy up to 55% for small and marginal farmers and 45% for other farmers for micro-irrigation systems.',
    applicationProcess: 'Apply through your district agriculture office or online portal.',
    documents: ['Land Records', 'Bank Account Details', 'Identity Proof'],
    lastDate: 'Ongoing',
    link: 'https://pmksy.gov.in/'
  },
  {
    id: '8',
    title: 'National Livestock Mission',
    description: 'Sustainable development of the livestock sector, focusing on improving availability of quality feed and fodder.',
    category: 'Subsidy',
    eligibility: 'Farmers engaged in livestock farming.',
    benefits: 'Financial assistance for entrepreneurship development, skill development, and infrastructure for livestock farming.',
    applicationProcess: 'Apply through your district animal husbandry department.',
    documents: ['Identity Proof', 'Address Proof', 'Bank Account Details', 'Project Proposal (if applicable)'],
    lastDate: 'Ongoing',
    link: 'https://dahd.nic.in/schemes/national-livestock-mission'
  }
];

// Group schemes by category
const groupedSchemes = schemes.reduce((acc, scheme) => {
  const category = scheme.category.toLowerCase();
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(scheme);
  return acc;
}, {} as Record<string, typeof schemes>);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function SchemesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 pt-20 pb-24 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-emerald-50/50 to-teal-50/80 dark:from-slate-900 dark:via-emerald-950/40 dark:to-slate-900" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 dark:opacity-100"></div>
          <div className="absolute top-0 left-1/4 rounded-full bg-emerald-400/20 dark:bg-emerald-500/20 blur-[120px] w-[500px] h-[500px] pointer-events-none" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <Badge className="mb-6 bg-primary text-white border-none px-4 py-1.5 text-sm font-semibold shadow-lg shadow-primary/20">
                Official Government Initiatives
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white">
                Empowering Indian <br />
                <span className="text-primary">Agriculture</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-0 max-w-2xl font-medium">
                Access curated government schemes, subsidies, and financial support designed to boost your farming productivity and secure your family's future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ position: 'relative' }}
              className="lg:col-span-5 flex justify-center items-center h-[300px] lg:h-[350px] w-full"
            >
              <div style={{ position: 'relative' }} className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 shadow-emerald-500/10">
                <Image 
                  src="/images/farmer_with_cash.png" 
                  alt="Happy Indian farmer holding cash notes in crop field" 
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <TabsList className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">All Schemes</TabsTrigger>
              <TabsTrigger value="subsidy" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Subsidies</TabsTrigger>
              <TabsTrigger value="loan" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Loans</TabsTrigger>
              <TabsTrigger value="insurance" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Insurance</TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-muted-foreground flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{schemes.length} Active Schemes Available</span>
            </div>
          </div>

          <TabsContent value="all" className="mt-0 outline-none">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {schemes.map((scheme) => (
                <motion.div key={scheme.id} variants={item}>
                  <SchemeCard scheme={scheme} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {Object.entries(groupedSchemes).map(([category, categorySchemes]) => (
            <TabsContent key={category} value={category.toLowerCase()} className="mt-0 outline-none">
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {categorySchemes.map((scheme) => (
                  <motion.div key={scheme.id} variants={item}>
                    <SchemeCard scheme={scheme} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function SchemeCard({ scheme }: { scheme: typeof schemes[0] }) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Subsidy': return <CheckCircle2 className="h-4 w-4" />;
      case 'Loan': return <Landmark className="h-4 w-4" />;
      case 'Insurance': return <ShieldCheck className="h-4 w-4" />;
      default: return null;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Subsidy': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Loan': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Insurance': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <Card className="group h-full flex flex-col overflow-hidden border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 card-hover-glow">
      <CardHeader className="pb-4 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <Badge className={`flex items-center gap-1.5 px-2.5 py-0.5 font-medium border ${getBadgeColor(scheme.category)}`}>
            {getCategoryIcon(scheme.category)}
            {scheme.category}
          </Badge>
          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Landmark className="h-4 w-4 text-slate-400" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors mb-2">
          {scheme.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed line-clamp-3">
          {scheme.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow pb-6 relative z-10">
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center text-sm font-medium">
            <Calendar className="h-4 w-4 mr-2.5 text-primary" />
            <span className="text-slate-500 dark:text-slate-400 mr-2">Last Date:</span>
            <span className={`${scheme.lastDate === 'Ongoing' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
              {scheme.lastDate}
            </span>
          </div>
          
          <div className="flex items-start">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0 mr-2.5" />
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic">
              "{scheme.benefits}"
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-6 px-6 gap-3 relative z-10">
        <Button variant="outline" className="flex-1 h-11 font-medium border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 group/btn" asChild>
          <Link href={`/schemes/${scheme.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
          </Link>
        </Button>
        <Button className="flex-1 h-11 font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" asChild>
          <a href={scheme.link} target="_blank" rel="noopener noreferrer">
            Apply Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
