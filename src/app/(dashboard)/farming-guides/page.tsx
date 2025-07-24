'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/context/language-context';

export default function SeasonalCropCalendarsPage() {
  useLanguage();
  const [region, setRegion] = useState('north');

  // Sample crop calendar data
  const cropCalendars = {
    north: [
      {
        season: 'Kharif (Monsoon)',
        months: 'June to October',
        crops: [
          { name: 'Rice (Paddy)', sowingTime: 'June-July', harvestTime: 'October-November', tips: 'Prepare nursery beds 15 days before transplanting. Maintain 2-3 cm water level in fields.' },
          { name: 'Maize', sowingTime: 'June-July', harvestTime: 'September-October', tips: 'Sow seeds at a depth of 4-5 cm with spacing of 60x20 cm. First irrigation after 20-25 days of sowing.' },
          { name: 'Cotton', sowingTime: 'May-June', harvestTime: 'November-December', tips: 'Sow seeds at a depth of 4-5 cm. Apply first irrigation 3-4 weeks after sowing.' },
          { name: 'Soybean', sowingTime: 'June-July', harvestTime: 'October', tips: 'Treat seeds with Rhizobium culture. Maintain proper drainage to avoid waterlogging.' },
        ]
      },
      {
        season: 'Rabi (Winter)',
        months: 'October to March',
        crops: [
          { name: 'Wheat', sowingTime: 'October-November', harvestTime: 'March-April', tips: 'Sow seeds at a depth of 5-6 cm with row spacing of 22-23 cm. First irrigation 20-25 days after sowing.' },
          { name: 'Mustard', sowingTime: 'October', harvestTime: 'February', tips: 'Sow seeds at a depth of 2-3 cm with row spacing of 45 cm. First irrigation 30-35 days after sowing.' },
          { name: 'Chickpea (Gram)', sowingTime: 'October-November', harvestTime: 'March', tips: 'Treat seeds with Rhizobium culture. Avoid excessive irrigation as it may cause vegetative growth.' },
          { name: 'Barley', sowingTime: 'October-November', harvestTime: 'March-April', tips: 'Sow seeds at a depth of 5 cm with row spacing of 22-23 cm. Requires less water than wheat.' },
        ]
      },
      {
        season: 'Zaid (Summer)',
        months: 'March to June',
        crops: [
          { name: 'Moong Bean', sowingTime: 'March-April', harvestTime: 'May-June', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
          { name: 'Watermelon', sowingTime: 'February-March', harvestTime: 'May-June', tips: 'Sow seeds at a depth of 2-3 cm. Maintain soil moisture during fruit development.' },
          { name: 'Cucumber', sowingTime: 'February-March', harvestTime: 'April-May', tips: 'Sow seeds at a depth of 2-3 cm. Regular irrigation is essential for good yield.' },
          { name: 'Bottle Gourd', sowingTime: 'February-March', harvestTime: 'May-June', tips: 'Sow 2-3 seeds per hill at a depth of 2-3 cm. Provide support for climbing.' },
        ]
      }
    ],
    south: [
      {
        season: 'Kharif (Monsoon)',
        months: 'June to October',
        crops: [
          { name: 'Rice (Paddy)', sowingTime: 'June-July', harvestTime: 'October-November', tips: 'Prepare nursery beds 15 days before transplanting. Maintain 2-3 cm water level in fields.' },
          { name: 'Groundnut', sowingTime: 'June-July', harvestTime: 'October-November', tips: 'Sow seeds at a depth of 4-5 cm. Avoid irrigation during flowering stage.' },
          { name: 'Turmeric', sowingTime: 'May-June', harvestTime: 'January-March', tips: 'Plant rhizomes at a depth of 4-5 cm. Requires regular irrigation during dry spells.' },
          { name: 'Red Gram (Arhar)', sowingTime: 'June-July', harvestTime: 'December-January', tips: 'Sow seeds at a depth of 4-5 cm with row spacing of 60-75 cm. Avoid waterlogging.' },
        ]
      },
      {
        season: 'Rabi (Winter)',
        months: 'October to March',
        crops: [
          { name: 'Rice (Second Crop)', sowingTime: 'September-October', harvestTime: 'January-February', tips: 'Prepare nursery beds 15 days before transplanting. Maintain 2-3 cm water level in fields.' },
          { name: 'Black Gram', sowingTime: 'October', harvestTime: 'January', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
          { name: 'Sesame', sowingTime: 'January-February', harvestTime: 'April-May', tips: 'Sow seeds at a depth of 2-3 cm. Avoid waterlogging as it affects growth.' },
          { name: 'Sunflower', sowingTime: 'October-November', harvestTime: 'February-March', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 60 cm. Requires 4-5 irrigations.' },
        ]
      },
      {
        season: 'Summer',
        months: 'March to June',
        crops: [
          { name: 'Green Gram', sowingTime: 'February-March', harvestTime: 'April-May', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
          { name: 'Gourds (Various)', sowingTime: 'January-February', harvestTime: 'April-May', tips: 'Sow seeds at a depth of 2-3 cm. Provide support for climbing. Regular irrigation is essential.' },
          { name: 'Okra (Bhindi)', sowingTime: 'February-March', harvestTime: 'April-June', tips: 'Sow seeds at a depth of 2-3 cm with row spacing of 45 cm. Requires regular irrigation.' },
          { name: 'Cowpea', sowingTime: 'February-March', harvestTime: 'April-May', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 45 cm. Requires 3-4 irrigations.' },
        ]
      }
    ],
    east: [
      {
        season: 'Kharif (Monsoon)',
        months: 'June to October',
        crops: [
          { name: 'Rice (Paddy)', sowingTime: 'June-July', harvestTime: 'October-November', tips: 'Prepare nursery beds 15 days before transplanting. Maintain 2-3 cm water level in fields.' },
          { name: 'Jute', sowingTime: 'March-April', harvestTime: 'July-August', tips: 'Sow seeds at a depth of 2-3 cm. Requires regular irrigation for good fiber quality.' },
          { name: 'Maize', sowingTime: 'June-July', harvestTime: 'September-October', tips: 'Sow seeds at a depth of 4-5 cm with spacing of 60x20 cm. First irrigation after 20-25 days of sowing.' },
          { name: 'Black Gram', sowingTime: 'June-July', harvestTime: 'September-October', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
        ]
      },
      {
        season: 'Rabi (Winter)',
        months: 'October to March',
        crops: [
          { name: 'Wheat', sowingTime: 'November', harvestTime: 'March-April', tips: 'Sow seeds at a depth of 5-6 cm with row spacing of 22-23 cm. First irrigation 20-25 days after sowing.' },
          { name: 'Mustard', sowingTime: 'October', harvestTime: 'February', tips: 'Sow seeds at a depth of 2-3 cm with row spacing of 45 cm. First irrigation 30-35 days after sowing.' },
          { name: 'Potato', sowingTime: 'October-November', harvestTime: 'January-February', tips: 'Plant tubers at a depth of 5-6 cm. Requires regular irrigation for good tuber development.' },
          { name: 'Lentil', sowingTime: 'October-November', harvestTime: 'February-March', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
        ]
      },
      {
        season: 'Pre-Kharif',
        months: 'March to June',
        crops: [
          { name: 'Aus Rice', sowingTime: 'March-April', harvestTime: 'June-July', tips: 'Direct seeding is preferred. Requires irrigation during dry spells.' },
          { name: 'Jute', sowingTime: 'March-April', harvestTime: 'July-August', tips: 'Sow seeds at a depth of 2-3 cm. Requires regular irrigation for good fiber quality.' },
          { name: 'Green Gram', sowingTime: 'March', harvestTime: 'May', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
          { name: 'Sesame', sowingTime: 'February-March', harvestTime: 'May-June', tips: 'Sow seeds at a depth of 2-3 cm. Avoid waterlogging as it affects growth.' },
        ]
      }
    ],
    west: [
      {
        season: 'Kharif (Monsoon)',
        months: 'June to October',
        crops: [
          { name: 'Cotton', sowingTime: 'May-June', harvestTime: 'November-December', tips: 'Sow seeds at a depth of 4-5 cm. Apply first irrigation 3-4 weeks after sowing.' },
          { name: 'Groundnut', sowingTime: 'June-July', harvestTime: 'October-November', tips: 'Sow seeds at a depth of 4-5 cm. Avoid irrigation during flowering stage.' },
          { name: 'Bajra (Pearl Millet)', sowingTime: 'June-July', harvestTime: 'September-October', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 45 cm. Drought-resistant crop.' },
          { name: 'Soybean', sowingTime: 'June-July', harvestTime: 'October', tips: 'Treat seeds with Rhizobium culture. Maintain proper drainage to avoid waterlogging.' },
        ]
      },
      {
        season: 'Rabi (Winter)',
        months: 'October to March',
        crops: [
          { name: 'Wheat', sowingTime: 'November', harvestTime: 'March-April', tips: 'Sow seeds at a depth of 5-6 cm with row spacing of 22-23 cm. First irrigation 20-25 days after sowing.' },
          { name: 'Cumin', sowingTime: 'October-November', harvestTime: 'February-March', tips: 'Sow seeds at a depth of 2-3 cm. Light and frequent irrigation is recommended.' },
          { name: 'Chickpea (Gram)', sowingTime: 'October-November', harvestTime: 'February-March', tips: 'Treat seeds with Rhizobium culture. Avoid excessive irrigation as it may cause vegetative growth.' },
          { name: 'Mustard', sowingTime: 'October', harvestTime: 'February', tips: 'Sow seeds at a depth of 2-3 cm with row spacing of 45 cm. First irrigation 30-35 days after sowing.' },
        ]
      },
      {
        season: 'Summer',
        months: 'March to June',
        crops: [
          { name: 'Groundnut (Summer)', sowingTime: 'January-February', harvestTime: 'May-June', tips: 'Sow seeds at a depth of 4-5 cm. Requires regular irrigation.' },
          { name: 'Green Gram', sowingTime: 'March', harvestTime: 'May', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
          { name: 'Sesame', sowingTime: 'February-March', harvestTime: 'May-June', tips: 'Sow seeds at a depth of 2-3 cm. Avoid waterlogging as it affects growth.' },
          { name: 'Fodder Crops', sowingTime: 'February-March', harvestTime: 'April-May', tips: 'Sow seeds at a depth of 2-3 cm. Regular irrigation is essential for good yield.' },
        ]
      }
    ],
    central: [
      {
        season: 'Kharif (Monsoon)',
        months: 'June to October',
        crops: [
          { name: 'Soybean', sowingTime: 'June-July', harvestTime: 'October', tips: 'Treat seeds with Rhizobium culture. Maintain proper drainage to avoid waterlogging.' },
          { name: 'Cotton', sowingTime: 'May-June', harvestTime: 'November-December', tips: 'Sow seeds at a depth of 4-5 cm. Apply first irrigation 3-4 weeks after sowing.' },
          { name: 'Rice (Paddy)', sowingTime: 'June-July', harvestTime: 'October-November', tips: 'Prepare nursery beds 15 days before transplanting. Maintain 2-3 cm water level in fields.' },
          { name: 'Pigeon Pea (Arhar)', sowingTime: 'June-July', harvestTime: 'December-January', tips: 'Sow seeds at a depth of 4-5 cm with row spacing of 60-75 cm. Avoid waterlogging.' },
        ]
      },
      {
        season: 'Rabi (Winter)',
        months: 'October to March',
        crops: [
          { name: 'Wheat', sowingTime: 'October-November', harvestTime: 'March-April', tips: 'Sow seeds at a depth of 5-6 cm with row spacing of 22-23 cm. First irrigation 20-25 days after sowing.' },
          { name: 'Chickpea (Gram)', sowingTime: 'October-November', harvestTime: 'February-March', tips: 'Treat seeds with Rhizobium culture. Avoid excessive irrigation as it may cause vegetative growth.' },
          { name: 'Linseed', sowingTime: 'October-November', harvestTime: 'February-March', tips: 'Sow seeds at a depth of 2-3 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
          { name: 'Mustard', sowingTime: 'October', harvestTime: 'February', tips: 'Sow seeds at a depth of 2-3 cm with row spacing of 45 cm. First irrigation 30-35 days after sowing.' },
        ]
      },
      {
        season: 'Summer',
        months: 'March to June',
        crops: [
          { name: 'Moong Bean', sowingTime: 'March-April', harvestTime: 'May-June', tips: 'Sow seeds at a depth of 3-4 cm with row spacing of 30 cm. Requires 2-3 irrigations.' },
          { name: 'Sesame', sowingTime: 'February-March', harvestTime: 'May-June', tips: 'Sow seeds at a depth of 2-3 cm. Avoid waterlogging as it affects growth.' },
          { name: 'Vegetables', sowingTime: 'February-March', harvestTime: 'April-June', tips: 'Different vegetables have specific requirements. Regular irrigation is essential.' },
          { name: 'Fodder Crops', sowingTime: 'February-March', harvestTime: 'April-May', tips: 'Sow seeds at a depth of 2-3 cm. Regular irrigation is essential for good yield.' },
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seasonal Crop Calendars</h1>
        <p className="text-muted-foreground">
          Region-specific planting and harvesting schedules to optimize your farming activities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Your Region</CardTitle>
          <CardDescription>
            Crop calendars are tailored to different regions of India
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
                <SelectItem value="central">Central India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {region === 'north' && 'North Indian'}
            {region === 'south' && 'South Indian'}
            {region === 'east' && 'East Indian'}
            {region === 'west' && 'West Indian'}
            {region === 'central' && 'Central Indian'} 
            Crop Calendar
          </CardTitle>
          <CardDescription>
            Optimal planting and harvesting times for your region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={cropCalendars[region as keyof typeof cropCalendars][0].season.toLowerCase().replace(/\s+\(.+\)/, '')}>
            <TabsList className="grid w-full grid-cols-3">
              {cropCalendars[region as keyof typeof cropCalendars].map(season => (
                <TabsTrigger 
                  key={season.season} 
                  value={season.season.toLowerCase().replace(/\s+\(.+\)/, '')}
                >
                  {season.season}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {cropCalendars[region as keyof typeof cropCalendars].map(season => (
              <TabsContent 
                key={season.season} 
                value={season.season.toLowerCase().replace(/\s+\(.+\)/, '')}
                className="mt-6"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-medium">{season.season} Season ({season.months})</h3>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 border-b bg-muted/50 p-3 font-medium">
                    <div>Crop</div>
                    <div>Sowing Time</div>
                    <div>Harvest Time</div>
                    <div>Farming Tips</div>
                  </div>
                  
                  {season.crops.map((crop, index) => (
                    <div 
                      key={crop.name} 
                      className={`grid grid-cols-4 p-3 ${index !== season.crops.length - 1 ? 'border-b' : ''}`}
                    >
                      <div className="font-medium">{crop.name}</div>
                      <div>{crop.sowingTime}</div>
                      <div>{crop.harvestTime}</div>
                      <div className="text-sm text-muted-foreground">{crop.tips}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Crop Rotation Recommendations</CardTitle>
          <CardDescription>
            Improve soil health and reduce pest problems with these crop rotation strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-2 border-b bg-muted/50 p-3 font-medium">
              <div>Rotation Pattern</div>
              <div>Benefits</div>
            </div>
            
            <div className="grid grid-cols-2 border-b p-3">
              <div className="font-medium">Cereals → Pulses → Vegetables</div>
              <div className="text-sm text-muted-foreground">
                Pulses fix nitrogen in soil after cereals deplete it. Vegetables then benefit from improved soil fertility.
              </div>
            </div>
            
            <div className="grid grid-cols-2 border-b p-3">
              <div className="font-medium">Rice → Wheat → Green Manure</div>
              <div className="text-sm text-muted-foreground">
                Common in rice-wheat systems. Green manure crop helps restore soil fertility and organic matter.
              </div>
            </div>
            
            <div className="grid grid-cols-2 border-b p-3">
              <div className="font-medium">Cotton → Chickpea → Sorghum</div>
              <div className="text-sm text-muted-foreground">
                Helps break pest cycles in cotton. Chickpea improves soil nitrogen, and sorghum has different nutrient requirements.
              </div>
            </div>
            
            <div className="grid grid-cols-2 p-3">
              <div className="font-medium">Maize → Potato → Legume</div>
              <div className="text-sm text-muted-foreground">
                Different rooting depths help utilize nutrients from various soil layers. Legume restores nitrogen.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
