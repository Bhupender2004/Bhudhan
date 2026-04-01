import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Government Schemes | BhuDhan Krishi',
  description: 'Agricultural schemes and subsidies for farmers in India',
};

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

export default function SchemesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <Link href="/dashboard">
          <Button variant="outline" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Government Schemes for Farmers</h1>
      </div>

      <div className="mb-8">
        <p className="text-muted-foreground">
          Explore various government schemes and subsidies available for farmers in India.
          These schemes aim to provide financial assistance, insurance coverage, and other benefits to support agricultural activities.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Schemes</TabsTrigger>
          <TabsTrigger value="subsidy">Subsidies</TabsTrigger>
          <TabsTrigger value="loan">Loans</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </TabsContent>

        {Object.entries(groupedSchemes).map(([category, categorySchemes]) => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categorySchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function SchemeCard({ scheme }: { scheme: typeof schemes[0] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{scheme.title}</CardTitle>
          <Badge variant={
            scheme.category === 'Subsidy' ? 'default' :
            scheme.category === 'Loan' ? 'secondary' :
            scheme.category === 'Insurance' ? 'outline' : 'default'
          }>
            {scheme.category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {scheme.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Last Date: <span className="font-medium">{scheme.lastDate}</span></span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            <span className="font-medium">Benefits:</span> {scheme.benefits}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/schemes/${scheme.id}`} className="w-full mr-2">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        <a href={scheme.link} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
