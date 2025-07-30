'use client';

import React, { useState } from 'react';
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
    <section id="features" className="relative z-50 mt-8 sm:mt-12 py-16 sm:py-20 md:py-28 bg-white dark:bg-gray-900 border-t-4 border-green-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <span className="text-green-800 dark:text-green-200 font-semibold text-sm">KEY FEATURES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-green-800 dark:text-green-200">{t('keyFeaturesTitle')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('keyFeaturesDescription')}
          </p>
        </div>

        <div className="relative z-50 mb-8 sm:mb-12 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-lg border-2 border-green-200 dark:border-green-700">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {getSupportedLanguages().map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage(lang.code)}
                className={`text-xs sm:text-sm px-3 py-2 transition-all duration-200 ${
                  currentLanguage === lang.code
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <div className="relative z-50 mb-8 sm:mb-12 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-lg border-2 border-green-200 dark:border-green-700">
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
              <TabsList
                className="flex w-max min-w-full gap-2 sm:gap-3 bg-green-50 dark:bg-green-900/50 rounded-lg p-2"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <TabsTrigger value="overview" className="flex-shrink-0 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 font-medium rounded-md transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {t('overview')}
                </TabsTrigger>
                <TabsTrigger value="marketplace" className="flex-shrink-0 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 font-medium rounded-md transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {t('marketplace')}
                </TabsTrigger>
                <TabsTrigger value="equipment" className="flex-shrink-0 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 font-medium rounded-md transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {t('equipment')}
                </TabsTrigger>
                <TabsTrigger value="weather" className="flex-shrink-0 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 font-medium rounded-md transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {t('weather')}
                </TabsTrigger>
                <TabsTrigger value="expert" className="flex-shrink-0 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 font-medium rounded-md transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {t('expertConnect')}
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex-shrink-0 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 font-medium rounded-md transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {t('aiTools')}
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex-shrink-0 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 font-medium rounded-md transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {t('cropCalendar')}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview" className="relative z-50 space-y-8 sm:space-y-12 mt-6 sm:mt-8">
            <div className="grid gap-6 sm:gap-8 md:gap-12">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 shadow-xl border-2 border-green-200 dark:border-green-700 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-200">
                          {feature.title}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          {feature.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(index)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                      >
                        {expandedFeature === index ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                  </CardHeader>
                  {expandedFeature === index && (
                    <CardContent className="pt-0">
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="relative h-[250px] sm:h-[300px] w-full rounded-xl overflow-hidden">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="space-y-4">
                          <ul className="space-y-2 list-disc pl-5">
                            {feature.details.map((detail, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-300">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
