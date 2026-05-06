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

import { motion, AnimatePresence } from 'framer-motion';

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
    <section id="features" className="relative z-50 py-12 sm:py-20 md:py-24 bg-white dark:bg-gray-900 border-t border-green-100 dark:border-green-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 rounded-full mb-4">
            <span className="text-green-700 dark:text-green-300 font-bold text-xs tracking-wider uppercase">KEY FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-green-900 dark:text-green-50 tracking-tight">
            <span className="text-shimmer">{t('keyFeaturesTitle')}</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('keyFeaturesDescription')}
          </p>
        </div>

        <div className="flex flex-col space-y-8 mb-12">
          {/* Language Selector - Clean & Minimal */}
          <div className="flex flex-wrap justify-center items-center gap-2 p-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 w-fit mx-auto shadow-sm">
            {getSupportedLanguages().map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage(lang.code)}
                className={`text-xs sm:text-sm font-medium transition-all rounded-xl ${
                  currentLanguage === lang.code
                    ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700'
                }`}
              >
                {lang.name}
              </Button>
            ))}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-green-50 dark:bg-green-900/20 p-1 rounded-2xl border border-green-100 dark:border-green-900/50">
                <TabsTrigger
                  value="overview"
                  className="px-8 py-2.5 text-sm sm:text-base font-bold rounded-xl transition-all data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-green-800 dark:text-green-200"
                >
                  {t('overview')}
                </TabsTrigger>
                {/* Space for future tabs like 'Benefits' */}
              </TabsList>
            </div>

        <TabsContent value="overview" className="relative z-50 space-y-2 sm:space-y-3 mt-1 sm:mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`group bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col ${expandedFeature === index ? 'ring-2 ring-green-500/20 shadow-xl' : ''}`}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    setExpandedFeature(index);
                  }
                }}
                onMouseLeave={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    setExpandedFeature(null);
                  }
                }}
              >
                <CardHeader className="p-6 pb-2 cursor-pointer md:cursor-default" onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    toggleExpand(index);
                  }
                }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-2xl text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                      className="text-gray-400 hover:text-green-600 dark:text-gray-500 dark:hover:text-green-400 rounded-full"
                    >
                      {expandedFeature === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </CardHeader>
                <AnimatePresence>
                  {expandedFeature === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <CardContent className="p-6 pt-0 mt-auto">
                        <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                          <div className="relative h-[160px] w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <ul className="space-y-2">
                            {feature.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
