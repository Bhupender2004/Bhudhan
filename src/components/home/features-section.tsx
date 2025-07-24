'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ShoppingBag,
  Tractor,
  CloudSun,
  MessageSquare,
  Calendar,
  Brain,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '@/lib/context/language-context';
import { getSupportedLanguages } from '@/lib/api/translate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  image: string;
}

export default function FeaturesSection() {
  const { t, currentLanguage, setLanguage } = useLanguage();
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  const features: FeatureProps[] = [
    {
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      title: t('marketplaceFeatureTitle'),
      description: t('marketplaceFeatureDesc'),
      details: [
        t('marketplaceDetail1'),
        t('marketplaceDetail2'),
        t('marketplaceDetail3'),
        t('marketplaceDetail4')
      ],
      image: "https://placehold.co/600x400/e2f0d9/1d6f42?text=Marketplace"
    },
    {
      icon: <Tractor className="h-10 w-10 text-primary" />,
      title: t('equipmentFeatureTitle'),
      description: t('equipmentFeatureDesc'),
      details: [
        t('equipmentDetail1'),
        t('equipmentDetail2'),
        t('equipmentDetail3'),
        t('equipmentDetail4')
      ],
      image: "https://placehold.co/600x400/e2f0d9/1d6f42?text=Equipment"
    },
    {
      icon: <CloudSun className="h-10 w-10 text-primary" />,
      title: t('weatherFeatureTitle'),
      description: t('weatherFeatureDesc'),
      details: [
        t('weatherDetail1'),
        t('weatherDetail2'),
        t('weatherDetail3'),
        t('weatherDetail4')
      ],
      image: "https://placehold.co/600x400/e2f0d9/1d6f42?text=Weather"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: t('expertConnectFeatureTitle'),
      description: t('expertConnectFeatureDesc'),
      details: [
        t('expertConnectDetail1'),
        t('expertConnectDetail2'),
        t('expertConnectDetail3'),
        t('expertConnectDetail4')
      ],
      image: "https://placehold.co/600x400/e2f0d9/1d6f42?text=Expert+Connect"
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: t('aiToolsFeatureTitle'),
      description: t('aiToolsFeatureDesc'),
      details: [
        t('aiToolsDetail1'),
        t('aiToolsDetail2'),
        t('aiToolsDetail3'),
        t('aiToolsDetail4')
      ],
      image: "https://placehold.co/600x400/e2f0d9/1d6f42?text=AI+Tools"
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: t('cropCalendarFeatureTitle'),
      description: t('cropCalendarFeatureDesc'),
      details: [
        t('cropCalendarDetail1'),
        t('cropCalendarDetail2'),
        t('cropCalendarDetail3'),
        t('cropCalendarDetail4')
      ],
      image: "https://placehold.co/600x400/e2f0d9/1d6f42?text=Crop+Calendar"
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-green-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-green-800 dark:text-green-200">{t('keyFeaturesTitle')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('keyFeaturesDescription')}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
            {getSupportedLanguages().map((lang) => (
              <button
                key={lang.code}
                data-language={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentLanguage === lang.code
                    ? 'bg-white dark:bg-green-800 shadow-sm text-green-800 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-300'
                }`}
              >
                {lang.code === 'en' ? 'English' :
                 lang.code === 'hi' ? 'हिन्दी' :
                 lang.code === 'pa' ? 'ਪੰਜਾਬੀ' :
                 lang.code === 'ta' ? 'தமிழ்' :
                 lang.code === 'te' ? 'తెలుగు' : lang.name}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mb-8">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="marketplace">{t('marketplace')}</TabsTrigger>
            <TabsTrigger value="equipment">{t('equipment')}</TabsTrigger>
            <TabsTrigger value="weather">{t('weather')}</TabsTrigger>
            <TabsTrigger value="expert">{t('expertConnect')}</TabsTrigger>
            <TabsTrigger value="ai">{t('aiTools')}</TabsTrigger>
            <TabsTrigger value="calendar">{t('cropCalendar')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg border-green-100 dark:border-green-900">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpand(index)}
                        className="h-8 w-8"
                      >
                        {expandedFeature === index ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>

                    {expandedFeature === index && (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        <div className="relative h-48 w-full rounded-md overflow-hidden">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <ul className="space-y-2 list-disc pl-5">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-300">{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/e2f0d9/1d6f42?text=Marketplace"
                  alt="Marketplace"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">{t('marketplaceFeatureTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('marketplaceFeatureDesc')}</p>
                <ul className="space-y-2 list-disc pl-5">
                  {features[0].details.map((detail, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">{detail}</li>
                  ))}
                </ul>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">{t('benefitsForFarmers')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('marketplaceBenefits')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/e2f0d9/1d6f42?text=Equipment"
                  alt="Equipment"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">{t('equipmentFeatureTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('equipmentFeatureDesc')}</p>
                <ul className="space-y-2 list-disc pl-5">
                  {features[1].details.map((detail, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">{detail}</li>
                  ))}
                </ul>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">{t('benefitsForFarmers')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('equipmentBenefits')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/e2f0d9/1d6f42?text=Weather"
                  alt="Weather"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">{t('weatherFeatureTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('weatherFeatureDesc')}</p>
                <ul className="space-y-2 list-disc pl-5">
                  {features[2].details.map((detail, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">{detail}</li>
                  ))}
                </ul>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">{t('benefitsForFarmers')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('weatherBenefits')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expert" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/e2f0d9/1d6f42?text=Expert+Connect"
                  alt="Expert Connect"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">{t('expertConnectFeatureTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('expertConnectFeatureDesc')}</p>
                <ul className="space-y-2 list-disc pl-5">
                  {features[3].details.map((detail, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">{detail}</li>
                  ))}
                </ul>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">{t('benefitsForFarmers')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('expertConnectBenefits')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/e2f0d9/1d6f42?text=AI+Tools"
                  alt="AI Tools"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">{t('aiToolsFeatureTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('aiToolsFeatureDesc')}</p>
                <ul className="space-y-2 list-disc pl-5">
                  {features[4].details.map((detail, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">{detail}</li>
                  ))}
                </ul>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">{t('benefitsForFarmers')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('aiToolsBenefits')}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
                <Image
                  src="https://placehold.co/800x600/e2f0d9/1d6f42?text=Crop+Calendar"
                  alt="Crop Calendar"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">{t('cropCalendarFeatureTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('cropCalendarFeatureDesc')}</p>
                <ul className="space-y-2 list-disc pl-5">
                  {features[5].details.map((detail, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">{detail}</li>
                  ))}
                </ul>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">{t('benefitsForFarmers')}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{t('cropCalendarBenefits')}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
