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
  image: "/digital-marketplace.jpg"
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
  image: "/Agriculture-Equipment.jpg"
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
  image: "/Weather Intelligence.jpeg"
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
  image: "/Expert Connect.jpeg"
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
  image: "/AI-Powered Tools.jpeg"
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
  image: "/Crop Calendar.png"
    }
  ];

  return (
    <section id="features" className="relative z-50 mt-4 sm:mt-5 py-4 sm:py-5 md:py-7 bg-white dark:bg-gray-900 border-t-4 border-green-500">
      <div className="container mx-auto px-1 sm:px-2 lg:px-3">
        <div className="text-center mb-3 sm:mb-5">
          <div className="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900 rounded-full mb-1">
            <span className="text-green-800 dark:text-green-200 font-semibold text-[10px]">KEY FEATURES</span>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-green-800 dark:text-green-200">{t('keyFeaturesTitle')}</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-snug">
            {t('keyFeaturesDescription')}
          </p>
        </div>

        <div className="relative z-50 mb-3 sm:mb-4 bg-white dark:bg-gray-900 p-1 rounded-xl shadow-lg border-2 border-green-200 dark:border-green-700">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {getSupportedLanguages().map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage(lang.code)}
                className={`text-[10px] sm:text-xs px-2 py-1 transition-all duration-200 ${
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
          <div className="relative z-50 mb-4 sm:mb-6 bg-white dark:bg-gray-900 p-1 rounded-xl shadow-lg border-2 border-green-200 dark:border-green-700">
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
              <TabsList
                className="flex w-max min-w-full gap-1 sm:gap-2 bg-green-50 dark:bg-green-900/50 rounded-lg p-1"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <TabsTrigger
                  value="overview"
                  className="flex-shrink-0 text-[11px] sm:text-base md:text-lg px-3 py-1.5 sm:px-6 sm:py-2 font-semibold rounded-full transition-all duration-200 shadow-none data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-100 dark:hover:bg-green-800 text-green-800 dark:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 max-w-full md:max-w-[320px] mx-auto text-center"
                >
                  {t('overview')}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

        <TabsContent value="overview" className="relative z-50 space-y-2 sm:space-y-3 mt-1 sm:mt-2">
          <div className="grid gap-2 sm:gap-3 md:gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-xl border-2 border-green-200 dark:border-green-700 rounded-2xl overflow-hidden">
                <CardHeader className="pb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm sm:text-lg font-bold text-green-800 dark:text-green-200">
                        {feature.title}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1 text-xs sm:text-base">
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
                    <div className="grid md:grid-cols-2 gap-2 items-center">
                      <div className="relative flex items-center justify-center h-[90px] sm:h-[120px] w-full rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill={false}
                          width={160}
                          height={90}
                          className="object-contain w-auto h-full max-h-[90px] sm:max-h-[120px] rounded-lg"
                          sizes="(max-width: 640px) 90vw, 160px"
                        />
                      </div>
                      <div className="space-y-1">
                        <ul className="space-y-0.5 list-disc pl-3">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-300 text-xs sm:text-base">
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
