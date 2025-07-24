'use client';

import { useState } from 'react';
import { ArrowLeft, Droplet, Cloud, Calendar, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export default function IrrigationPage() {
  const [cropType, setCropType] = useState('wheat');
  const [soilType, setSoilType] = useState('loamy');
  const [irrigationType, setIrrigationType] = useState('drip');
  const [fieldSize, setFieldSize] = useState(5);
  const [cropStage, setCropStage] = useState('vegetative');
  const [soilMoisture, setSoilMoisture] = useState(40);
  const [weatherForecast, setWeatherForecast] = useState('clear');
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // Sample irrigation schedule
  const irrigationSchedule = {
    wheat: {
      schedule: [
        { day: 'Monday', time: '06:00 AM', duration: 45, waterAmount: 12 },
        { day: 'Thursday', time: '06:00 AM', duration: 45, waterAmount: 12 },
        { day: 'Saturday', time: '06:00 AM', duration: 30, waterAmount: 8 }
      ],
      weeklyWater: 32,
      recommendations: [
        'Adjust irrigation timing to early morning to reduce evaporation losses',
        'Consider mulching to retain soil moisture',
        'Monitor soil moisture levels regularly, especially during grain filling stage'
      ]
    },
    rice: {
      schedule: [
        { day: 'Monday', time: '07:00 AM', duration: 60, waterAmount: 20 },
        { day: 'Wednesday', time: '07:00 AM', duration: 60, waterAmount: 20 },
        { day: 'Friday', time: '07:00 AM', duration: 60, waterAmount: 20 },
        { day: 'Sunday', time: '07:00 AM', duration: 60, waterAmount: 20 }
      ],
      weeklyWater: 80,
      recommendations: [
        'Maintain standing water of 2-5 cm during critical growth stages',
        'Practice alternate wetting and drying to save water',
        'Ensure bunds are well-maintained to prevent water loss'
      ]
    },
    maize: {
      schedule: [
        { day: 'Tuesday', time: '06:30 AM', duration: 50, waterAmount: 15 },
        { day: 'Friday', time: '06:30 AM', duration: 50, waterAmount: 15 }
      ],
      weeklyWater: 30,
      recommendations: [
        'Ensure adequate moisture during tasseling and silking stages',
        'Avoid water stress during grain filling period',
        'Consider deficit irrigation during less critical growth stages'
      ]
    }
  };

  // Sample water usage data
  const waterUsageData = {
    wheat: {
      current: 32,
      optimal: 35,
      savings: 8.6,
      efficiency: 91
    },
    rice: {
      current: 80,
      optimal: 90,
      savings: 11.1,
      efficiency: 89
    },
    maize: {
      current: 30,
      optimal: 32,
      savings: 6.3,
      efficiency: 94
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const resetForm = () => {
    setCropType('wheat');
    setSoilType('loamy');
    setIrrigationType('drip');
    setFieldSize(5);
    setCropStage('vegetative');
    setSoilMoisture(40);
    setWeatherForecast('clear');
    setAutoSchedule(true);
    setShowResults(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/ai-tools">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">BhuDhan Irrigation</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Irrigation Parameters</CardTitle>
              <CardDescription>
                Enter your field details for irrigation recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger id="crop-type">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="maize">Maize</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="silt">Silty</SelectItem>
                      <SelectItem value="black">Black Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="irrigation-type">Irrigation Type</Label>
                  <Select value={irrigationType} onValueChange={setIrrigationType}>
                    <SelectTrigger id="irrigation-type">
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="flood">Flood Irrigation</SelectItem>
                      <SelectItem value="furrow">Furrow Irrigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="crop-stage">Crop Growth Stage</Label>
                  <Select value={cropStage} onValueChange={setCropStage}>
                    <SelectTrigger id="crop-stage">
                      <SelectValue placeholder="Select growth stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="germination">Germination/Seedling</SelectItem>
                      <SelectItem value="vegetative">Vegetative Growth</SelectItem>
                      <SelectItem value="flowering">Flowering/Reproductive</SelectItem>
                      <SelectItem value="maturity">Maturity/Ripening</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field-size">Field Size (Hectares): {fieldSize}</Label>
                  <Slider 
                    id="field-size"
                    min={1} 
                    max={50} 
                    step={1} 
                    value={[fieldSize]} 
                    onValueChange={(value) => setFieldSize(value[0])} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="soil-moisture">Current Soil Moisture (%): {soilMoisture}</Label>
                  <Slider 
                    id="soil-moisture"
                    min={0} 
                    max={100} 
                    step={5} 
                    value={[soilMoisture]} 
                    onValueChange={(value) => setSoilMoisture(value[0])} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weather-forecast">Weather Forecast</Label>
                  <Select value={weatherForecast} onValueChange={setWeatherForecast}>
                    <SelectTrigger id="weather-forecast">
                      <SelectValue placeholder="Select forecast" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clear">Clear/Sunny</SelectItem>
                      <SelectItem value="cloudy">Cloudy</SelectItem>
                      <SelectItem value="rain">Light Rain Expected</SelectItem>
                      <SelectItem value="heavy-rain">Heavy Rain Expected</SelectItem>
                      <SelectItem value="hot">Hot & Dry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-schedule">Auto-Schedule Irrigation</Label>
                  <Switch 
                    id="auto-schedule" 
                    checked={autoSchedule} 
                    onCheckedChange={setAutoSchedule} 
                  />
                </div>
                
                <Button type="submit" className="w-full">Generate Schedule</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {!showResults ? (
            <Card className="h-full flex flex-col justify-center items-center p-6">
              <Droplet className="h-16 w-16 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Smart Irrigation Management</h2>
              <p className="text-center text-muted-foreground mb-6">
                Enter your field details and click Generate Schedule to receive AI-powered irrigation recommendations.
              </p>
              <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Cloud className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm text-center">Weather-based adjustments</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm text-center">Optimized scheduling</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <BarChart3 className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm text-center">Water usage analytics</p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Irrigation Schedule</CardTitle>
                    <Button variant="outline" size="sm" onClick={resetForm}>
                      New Schedule
                    </Button>
                  </div>
                  <CardDescription>
                    Optimized for {cropType} in {soilType} soil using {irrigationType} irrigation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="schedule">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
                      <TabsTrigger value="analytics">Water Usage</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="schedule" className="pt-4">
                      <div className="rounded-md border">
                        <div className="grid grid-cols-4 bg-muted p-3 rounded-t-md">
                          <div className="font-medium">Day</div>
                          <div className="font-medium">Time</div>
                          <div className="font-medium">Duration (min)</div>
                          <div className="font-medium">Water (mm)</div>
                        </div>
                        <div className="divide-y">
                          {irrigationSchedule[cropType as keyof typeof irrigationSchedule].schedule.map((item, index) => (
                            <div key={index} className="grid grid-cols-4 p-3">
                              <div>{item.day}</div>
                              <div>{item.time}</div>
                              <div>{item.duration}</div>
                              <div>{item.waterAmount}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                        <ul className="space-y-2">
                          {irrigationSchedule[cropType as keyof typeof irrigationSchedule].recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Droplet className="h-3 w-3" />
                              </div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-6 p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Total Weekly Water</p>
                            <p className="text-2xl font-bold text-blue-500">
                              {irrigationSchedule[cropType as keyof typeof irrigationSchedule].weeklyWater} mm
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Total Volume</p>
                            <p className="text-2xl font-bold text-blue-500">
                              {(irrigationSchedule[cropType as keyof typeof irrigationSchedule].weeklyWater * fieldSize * 10).toFixed(0)} m³
                            </p>
                            <p className="text-xs text-muted-foreground">For {fieldSize} hectares</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analytics" className="pt-4">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2 p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Current Usage</p>
                          <p className="text-3xl font-bold text-blue-500">
                            {waterUsageData[cropType as keyof typeof waterUsageData].current} 
                            <span className="text-base font-normal"> mm/week</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            vs. Optimal: {waterUsageData[cropType as keyof typeof waterUsageData].optimal} mm/week
                          </p>
                        </div>
                        
                        <div className="space-y-2 p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Water Savings</p>
                          <p className="text-3xl font-bold text-green-500">
                            {waterUsageData[cropType as keyof typeof waterUsageData].savings}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Compared to conventional irrigation
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Efficiency Analysis</h3>
                        <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${waterUsageData[cropType as keyof typeof waterUsageData].efficiency}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">0%</span>
                          <span className="text-xs font-medium">
                            {waterUsageData[cropType as keyof typeof waterUsageData].efficiency}% Efficient
                          </span>
                          <span className="text-xs text-muted-foreground">100%</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 h-[200px] flex items-center justify-center border rounded-lg">
                        <p className="text-muted-foreground text-center">
                          [Water usage chart visualization would appear here]
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download Schedule</span>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weather Forecast</CardTitle>
                  <CardDescription>
                    7-day forecast for your location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex overflow-x-auto pb-2 gap-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={index} className="flex-shrink-0 w-24 text-center p-3 border rounded-lg">
                        <p className="font-medium">{day}</p>
                        <Cloud className="h-8 w-8 mx-auto my-2 text-blue-500" />
                        <p className="text-sm">28°C</p>
                        <p className="text-xs text-muted-foreground">10% rain</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
