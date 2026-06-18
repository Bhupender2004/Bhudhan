'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, ExternalLink, FileText, Users, CheckCircle, AlertCircle, Landmark, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
    launchedIn: '2019',
    link: 'https://pmkisan.gov.in/',
    details: `
      <p>The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from the Government of India. The scheme was launched on February 24, 2019.</p>

      <p>Under the scheme, income support of ₹6,000 per year is provided to all land holding farmer families across the country in three equal installments of ₹2,000 each every four months. The fund is directly transferred to the bank accounts of the beneficiaries.</p>

      <p>Definition of family for the scheme is husband, wife and minor children. The State Government and UT administration will identify the farmer families which are eligible for support as per scheme guidelines.</p>

      <p>The fund is directly transferred to the bank accounts of the beneficiaries. For enrollment, the farmer is required to approach the local revenue officer/Patwari/village officer/Gram Sevak or any other designated officer/agency.</p>
    `
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
    launchedIn: '1998',
    link: 'https://www.nabard.org/content.aspx?id=591',
    details: `
      <p>The Kisan Credit Card (KCC) scheme was introduced in 1998 to provide adequate and timely credit support from the banking system to the farmers for their cultivation needs.</p>

      <p>The scheme aims to provide credit to farmers for agricultural needs like purchase of seeds, fertilizers, pesticides, and other production needs. It also covers expenses related to animal husbandry and fisheries.</p>

      <p>Features of the KCC scheme include:</p>
      <ul>
        <li>Short-term credit limits for crops and working capital for animal husbandry and fisheries</li>
        <li>Long-term credit limit for investment in agriculture and allied activities</li>
        <li>Interest subvention of 2% per annum for short-term crop loans up to ₹3 lakh</li>
        <li>Additional 3% interest subvention for prompt repayment</li>
        <li>Flexible repayment options aligned with crop cycles</li>
        <li>Personal accident insurance cover of ₹50,000 for death and ₹25,000 for disability</li>
      </ul>

      <p>The credit limit is determined based on the scale of finance for the crop plus 30% for other expenses, multiplied by the area of the crop cultivated. For term loans, the credit limit is based on the proposed investment.</p>
    `
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
    launchedIn: '2016',
    link: 'https://pmfby.gov.in/',
    details: `
      <p>The Pradhan Mantri Fasal Bima Yojana (PMFBY) was launched in 2016 to provide comprehensive insurance coverage to farmers against crop loss due to non-preventable natural risks.</p>

      <p>The scheme aims to:</p>
      <ul>
        <li>Provide financial support to farmers suffering crop loss/damage arising out of unforeseen events</li>
        <li>Stabilize the income of farmers to ensure their continuance in farming</li>
        <li>Encourage farmers to adopt innovative and modern agricultural practices</li>
        <li>Ensure flow of credit to the agriculture sector</li>
      </ul>

      <p>Coverage under PMFBY:</p>
      <ul>
        <li>Yield Losses (standing crops): Comprehensive risk insurance for crop cycle from sowing to harvesting against preventable risks like drought, dry spells, flood, inundation, pests and diseases, landslides, natural fire, lightning, storm, hailstorm, cyclone, typhoon, tempest, hurricane, tornado</li>
        <li>Post-Harvest Losses: Coverage for up to two weeks from harvesting against specific perils like cyclone, cyclonic rains, and unseasonal rains</li>
        <li>Localized Calamities: Loss/damage to notified crops due to hailstorm, landslide, and inundation affecting isolated farms</li>
      </ul>

      <p>Premium rates under PMFBY are capped at:</p>
      <ul>
        <li>2% for Kharif crops</li>
        <li>1.5% for Rabi crops</li>
        <li>5% for annual commercial and horticultural crops</li>
      </ul>

      <p>The difference between the actuarial premium rate and the rate of insurance payable by farmers is shared equally by the Central and State Governments.</p>
    `
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
    link: 'https://soilhealth.dac.gov.in/',
    details: `
      <p>The Soil Health Card (SHC) scheme was launched in February 2015 to assess the soil nutrient status and provide farmers with soil health cards every two years.</p>

      <p>The scheme aims to:</p>
      <ul>
        <li>Provide information to farmers on soil nutrient status of their soil</li>
        <li>Provide advice on appropriate dosage of nutrients for improving soil health and fertility</li>
        <li>Promote balanced and integrated use of plant nutrients</li>
        <li>Improve soil health and fertility for sustainable farming</li>
      </ul>

      <p>The Soil Health Card contains:</p>
      <ul>
        <li>Status of soil with respect to 12 parameters: N, P, K (Macro-nutrients); S (Secondary nutrient); Zn, Fe, Cu, Mn, Bo (Micro-nutrients); and pH, EC, OC (Physical parameters)</li>
        <li>Recommendations on appropriate dosage of fertilizers and soil amendments required for the farm</li>
        <li>Advice on soil test based nutrient management for 100+ crops</li>
      </ul>

      <p>The scheme operates through a cycle of soil sample collection, testing in soil labs, and generation and distribution of soil health cards. The government has established a network of soil testing labs across the country to support this initiative.</p>

      <p>Farmers can use the information provided in the soil health card to make informed decisions about the type and quantity of fertilizers to use, which can lead to improved soil health, higher yields, and reduced input costs.</p>
    `
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
    link: 'https://nmsa.dac.gov.in/',
    details: `
      <p>The National Mission for Sustainable Agriculture (NMSA) was launched in 2014-15 as one of the eight Missions under the National Action Plan on Climate Change (NAPCC).</p>

      <p>The mission aims to promote sustainable agriculture through a series of adaptation measures focusing on:</p>
      <ul>
        <li>Improved water use efficiency</li>
        <li>Nutrient management</li>
        <li>Livelihood diversification</li>
        <li>Climate change adaptation</li>
      </ul>

      <p>NMSA has the following major components:</p>
      <ul>
        <li>Rainfed Area Development (RAD): Promoting integrated farming systems for enhancing productivity and minimizing risks associated with climatic variability</li>
        <li>Soil Health Management (SHM): Promoting soil test based balanced use of fertilizers and soil amendments</li>
        <li>Sub-Mission on Agroforestry (SMAF): Encouraging tree plantation on farm land</li>
        <li>Paramparagat Krishi Vikas Yojana (PKVY): Promoting organic farming</li>
        <li>Sub-Mission on Climate Change and Sustainable Agriculture: Monitoring, Modeling and Networking (SMCCSAM-MN)</li>
      </ul>

      <p>The mission provides financial assistance to farmers for:</p>
      <ul>
        <li>Adoption of organic farming practices</li>
        <li>Installation of micro-irrigation systems</li>
        <li>Implementation of integrated farming systems</li>
        <li>Soil health management practices</li>
        <li>Agroforestry initiatives</li>
      </ul>

      <p>The mission is implemented through a participatory approach involving farmers, Krishi Vigyan Kendras, and other stakeholders.</p>
    `
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
    link: 'https://agriinfra.dac.gov.in/',
    details: `
      <p>The Agriculture Infrastructure Fund (AIF) is a central sector scheme launched in July 2020 as part of the Atmanirbhar Bharat economic package. The scheme aims to provide medium to long-term debt financing for investment in viable projects relating to post-harvest management infrastructure and community farming assets.</p>

      <p>The scheme has a corpus of ₹1 lakh crore to be provided over 4 years (2020-21 to 2023-24).</p>

      <p>Eligible beneficiaries under the scheme include:</p>
      <ul>
        <li>Farmers (individual and groups)</li>
        <li>Farmer Producer Organizations (FPOs)</li>
        <li>Primary Agricultural Credit Societies (PACS)</li>
        <li>Marketing Cooperative Societies</li>
        <li>Self Help Groups (SHGs)</li>
        <li>Joint Liability Groups (JLGs)</li>
        <li>Multipurpose Cooperative Societies</li>
        <li>Agri-entrepreneurs</li>
        <li>Start-ups</li>
        <li>Central/State agency or Local Body sponsored Public-Private Partnership Projects</li>
      </ul>

      <p>The scheme provides the following benefits:</p>
      <ul>
        <li>Interest subvention of 3% per annum, limited to ₹2 crore per project</li>
        <li>Credit guarantee coverage under Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) for loans up to ₹2 crore</li>
        <li>Convergence with other government schemes</li>
        <li>Facility for multiple loans for different projects</li>
      </ul>

      <p>Eligible projects under the scheme include:</p>
      <ul>
        <li>Post-harvest management projects (e.g., supply chain services, warehouses, silos, pack houses, assaying units)</li>
        <li>Building community farming assets (e.g., organic inputs production, bio-stimulant production units)</li>
        <li>Projects identified for providing supply chain infrastructure for clusters of crops including export clusters</li>
        <li>Projects promoted by Central/State/Local Governments or their agencies under PPP for building community farming assets or post-harvest management projects</li>
      </ul>
    `
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
    link: 'https://pmksy.gov.in/',
    details: `
      <p>The Pradhan Mantri Krishi Sinchai Yojana (PMKSY) was launched in July 2015 with the motto of 'Har Khet Ko Paani' (water to every field) and 'Per Drop More Crop'.</p>

      <p>The scheme aims to:</p>
      <ul>
        <li>Expand cultivable area under assured irrigation</li>
        <li>Improve on-farm water use efficiency to reduce wastage of water</li>
        <li>Enhance the adoption of precision-irrigation and other water-saving technologies</li>
        <li>Enhance recharge of aquifers and introduce sustainable water conservation practices</li>
      </ul>

      <p>PMKSY has the following major components:</p>
      <ul>
        <li>Accelerated Irrigation Benefit Programme (AIBP): Focuses on faster completion of ongoing Major and Medium Irrigation projects</li>
        <li>Har Khet Ko Pani (HKKP): Focuses on source augmentation, distribution, ground water development, lift irrigation, diversion of water from water plenty to water scarce areas</li>
        <li>Per Drop More Crop (PDMC): Focuses on micro-irrigation systems like drip and sprinkler irrigation to improve water use efficiency</li>
        <li>Watershed Development: Focuses on ridge area treatment, drainage line treatment, soil and moisture conservation, rainwater harvesting</li>
      </ul>

      <p>Under the Per Drop More Crop component, the scheme provides:</p>
      <ul>
        <li>Subsidy up to 55% for small and marginal farmers and 45% for other farmers for micro-irrigation systems</li>
        <li>Financial assistance for water lifting devices, water harvesting structures, and secondary storage structures</li>
        <li>Support for extension activities, training, and capacity building</li>
      </ul>

      <p>The scheme is implemented by the Ministry of Agriculture and Farmers Welfare in coordination with the Ministry of Jal Shakti and Ministry of Rural Development.</p>
    `
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
    link: 'https://dahd.nic.in/schemes/national-livestock-mission',
    details: `
      <p>The National Livestock Mission (NLM) was launched in 2014-15 to ensure quantitative and qualitative improvement in livestock production systems and capacity building of all stakeholders.</p>

      <p>The mission aims to:</p>
      <ul>
        <li>Sustainable development of the livestock sector</li>
        <li>Improve availability of quality feed and fodder</li>
        <li>Risk mitigation and extension</li>
        <li>Skill development and technology transfer</li>
        <li>Improve productivity of livestock</li>
      </ul>

      <p>The mission has the following sub-missions:</p>
      <ul>
        <li>Sub-Mission on Livestock Development: Focuses on productivity enhancement, entrepreneurship development, and strengthening of infrastructure for livestock farming</li>
        <li>Sub-Mission on Pig Development in North-Eastern Region: Focuses on development of pig farming in the North-Eastern states</li>
        <li>Sub-Mission on Feed and Fodder Development: Focuses on increasing availability of quality feed and fodder</li>
        <li>Sub-Mission on Skill Development, Technology Transfer and Extension: Focuses on capacity building of farmers and extension workers</li>
      </ul>

      <p>The mission provides financial assistance for:</p>
      <ul>
        <li>Establishment of fodder seed production units</li>
        <li>Fodder development programs</li>
        <li>Conservation of threatened breeds</li>
        <li>Establishment of rural slaughterhouses</li>
        <li>Salvaging and rearing of male buffalo calves</li>
        <li>Risk management and insurance</li>
        <li>Skill development and training</li>
      </ul>

      <p>The mission is implemented by the Department of Animal Husbandry, Dairying and Fisheries (DAHDF) under the Ministry of Agriculture and Farmers Welfare.</p>
    `
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SchemeDetailPage({ params }: PageProps) {
  // Fix for React.use() or await params in Client Components
  const [scheme, setScheme] = React.useState<typeof schemes[0] | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;
      const found = schemes.find(s => s.id === id);
      setScheme(found || null);
      setLoading(false);
    };
    fetchParams();
  }, [params]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-primary/20 mb-4" />
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );

  if (!scheme) {
    return (
      <div className="container mx-auto py-20 px-4">
        <Card className="max-w-md mx-auto glass-card">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Scheme Not Found</h1>
            <p className="text-muted-foreground mb-8">The scheme you are looking for does not exist or has been removed from our database.</p>
            <Link href="/schemes">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Schemes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Subsidy': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Loan': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Insurance': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Subsidy': return <CheckCircle2 className="h-5 w-5" />;
      case 'Loan': return <Landmark className="h-5 w-5" />;
      case 'Insurance': return <ShieldCheck className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20">
      {/* Header / Hero */}
      <div className="relative overflow-hidden bg-slate-900 pt-16 pb-12 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/schemes-hero.png" 
            alt="Scheme Background" 
            className="w-full h-full object-cover opacity-20 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Link 
            href="/schemes" 
            className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors group font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Schemes
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-md px-3 py-1">
                  {scheme.category}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {scheme.title}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
                {scheme.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold backdrop-blur-md h-12 px-6"
                asChild
              >
                <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass-card overflow-hidden border-slate-200/60 dark:border-slate-800/60">
                <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Detailed Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-li:my-2"
                       dangerouslySetInnerHTML={{ __html: scheme.details }} />
                  
                  <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-primary">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold">Ready to benefit?</h4>
                        <p className="text-sm opacity-80">Apply through the official government portal.</p>
                      </div>
                    </div>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 group">
                        Apply Now
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center font-bold">
                    <Calendar className="mr-2.5 h-4 w-4 text-primary" />
                    Deadline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-xl font-bold ${scheme.lastDate === 'Ongoing' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                    {scheme.lastDate}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center font-bold">
                    <Users className="mr-2.5 h-4 w-4 text-primary" />
                    Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {scheme.eligibility}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center font-bold">
                    <ShieldCheck className="mr-2.5 h-4 w-4 text-primary" />
                    Main Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {scheme.benefits}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center font-bold">
                    <FileText className="mr-2.5 h-4 w-4 text-primary" />
                    Documents Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scheme.documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="mt-1.5 h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20 shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center font-bold text-primary">
                    <AlertCircle className="mr-2.5 h-4 w-4" />
                    How to Apply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-primary/80">
                    {scheme.applicationProcess}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
