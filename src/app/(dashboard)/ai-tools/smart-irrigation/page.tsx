'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Droplet, Cloud, Sun, CloudRain, Wind, Calendar, Clock, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function SmartIrrigationPage() {
  // State for form inputs
  const [cropType, setCropType] = useState('wheat');
  const [region, setRegion] = useState('north');
  const [soilType, setSoilType] = useState('loamy');
  const [fieldSize, setFieldSize] = useState(12); // Default 12 acres
  const [cropStage, setCropStage] = useState('vegetative');
  const [irrigationSystem, setIrrigationSystem] = useState('drip');
  const [waterSource, setWaterSource] = useState('groundwater');
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Weather data (would come from API in a real implementation)
  const weatherData = {
    current: {
      temperature: 32,
      humidity: 65,
      windSpeed: 8,
      precipitation: 0,
      condition: 'Sunny',
    },
    forecast: [
      { day: 'Today', temp: 32, condition: 'Sunny', precipitation: 0 },
      { day: 'Tomorrow', temp: 30, condition: 'Partly Cloudy', precipitation: 10 },
      { day: 'Day 3', temp: 28, condition: 'Cloudy', precipitation: 30 },
      { day: 'Day 4', temp: 27, condition: 'Light Rain', precipitation: 60 },
      { day: 'Day 5', temp: 29, condition: 'Partly Cloudy', precipitation: 20 },
    ]
  };

  // Sample irrigation recommendations
  const irrigationRecommendations = {
    wheat: {
      schedule: [
        { day: 'Today', time: '06:00 AM', duration: 45, status: 'Scheduled' },
        { day: 'Tomorrow', time: 'Not Required', duration: 0, status: 'Skipped' },
        { day: 'Day 3', time: '06:00 AM', duration: 30, status: 'Scheduled' },
        { day: 'Day 5', time: '06:00 AM', duration: 45, status: 'Scheduled' },
        { day: 'Day 7', time: '06:00 AM', duration: 30, status: 'Scheduled' },
      ],
      waterUsage: {
        recommended: 25, // mm per week
        current: 22,
        savings: 15, // % saved compared to traditional
      },
      soilMoisture: {
        current: 65, // %
        optimal: '60-70%',
        status: 'Optimal',
      },
      recommendations: [
        'Reduce irrigation duration by 10% due to forecasted rain on Day 4',
        'Consider early morning irrigation to minimize evaporation',
        'Monitor soil moisture closely during the upcoming hot days',
        'Adjust irrigation schedule if unexpected rainfall occurs',
      ]
    },
    rice: {
      schedule: [
        { day: 'Today', time: '07:00 AM', duration: 60, status: 'Scheduled' },
        { day: 'Tomorrow', time: '07:00 AM', duration: 60, status: 'Scheduled' },
        { day: 'Day 3', time: '07:00 AM', duration: 45, status: 'Scheduled' },
        { day: 'Day 4', time: 'Not Required', duration: 0, status: 'Skipped' },
        { day: 'Day 5', time: '07:00 AM', duration: 45, status: 'Scheduled' },
      ],
      waterUsage: {
        recommended: 50, // mm per week
        current: 45,
        savings: 10, // % saved compared to traditional
      },
      soilMoisture: {
        current: 85, // %
        optimal: '80-90%',
        status: 'Optimal',
      },
      recommendations: [
        'Maintain standing water of 2-3 cm during the current growth stage',
        'Skip irrigation on Day 4 due to forecasted rainfall',
        'Consider alternate wetting and drying technique to save water',
        'Monitor water level daily during the critical flowering stage',
      ]
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const resetForm = () => {
    setCropType('wheat');
    setRegion('north');
    setSoilType('loamy');
    setFieldSize(5);
    setCropStage('vegetative');
    setIrrigationSystem('drip');
    setWaterSource('groundwater');
    setAutoSchedule(true);
    setShowResults(false);
  };

  // Function to generate and download comprehensive irrigation report PDF
  const generateReportPDF = async () => {
    if (!isClient) return; // Safety check for SSR

    try {
      // Dynamically import jsPDF and jspdf-autotable
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
      const autoTableModule = await import('jspdf-autotable');
      const autoTable = autoTableModule.default || autoTableModule;

      // Create a new PDF document
      const doc = new jsPDF();
      const currentDate = new Date().toLocaleDateString();

      // Add title and header
      doc.setFontSize(20);
      doc.setTextColor(0, 102, 204); // Blue color
      doc.text('BhuDhan Krishi - Irrigation Report', 105, 15, { align: 'center' });

      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${currentDate}`, 105, 22, { align: 'center' });

      // Add farm information
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text('Farm Information', 14, 35);

      // Farm details table
      autoTable(doc, {
        startY: 40,
        head: [['Parameter', 'Value']],
        body: [
          ['Crop Type', cropType.charAt(0).toUpperCase() + cropType.slice(1)],
          ['Region', region.charAt(0).toUpperCase() + region.slice(1)],
          ['Soil Type', soilType.charAt(0).toUpperCase() + soilType.slice(1)],
          ['Field Size', `${fieldSize} acres`],
          ['Crop Stage', cropStage.charAt(0).toUpperCase() + cropStage.slice(1)],
          ['Irrigation System', irrigationSystem.charAt(0).toUpperCase() + irrigationSystem.slice(1)],
          ['Water Source', waterSource.charAt(0).toUpperCase() + waterSource.slice(1)],
        ],
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204] },
      });

      // Add irrigation schedule
      doc.setFontSize(14);
      doc.setTextColor(0);
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      doc.text('Irrigation Schedule', 14, docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 15 : 50); }

      // Schedule table
      const scheduleData = irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].schedule.map(item => [
        item.day,
        item.time,
        item.duration > 0 ? `${item.duration} minutes` : '-',
        item.status
      ]);

      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      autoTable(doc, {
        startY: docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 20 : 70,
        head: [['Day', 'Time', 'Duration', 'Status']],
        body: scheduleData,
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204] },
      }); }

      // Add water usage analytics
      doc.setFontSize(14);
      doc.setTextColor(0);
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      doc.text('Water Usage Analytics', 14, docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 15 : 50); }

      // Water usage table
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      autoTable(doc, {
        startY: docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 20 : 90,
        head: [['Metric', 'Value']],
        body: [
          ['Recommended Water', `${irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].waterUsage.recommended} mm/week`],
          ['Current Usage', `${irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].waterUsage.current} mm/week`],
          ['Water Savings', `${irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].waterUsage.savings}%`],
          ['Soil Moisture', `${irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.current}%`],
          ['Optimal Range', irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.optimal],
          ['Moisture Status', irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.status],
        ],
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204] },
      }); }

      // Add recommendations
      doc.setFontSize(14);
      doc.setTextColor(0);
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      doc.text('Recommendations', 14, docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 15 : 50); }

      // Recommendations table
      const recommendationsData = irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].recommendations.map(rec => [
        rec
      ]);

      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      autoTable(doc, {
        startY: docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 20 : 110,
        head: [['Irrigation Recommendations']],
        body: recommendationsData,
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204] },
      }); }

      // Add weather forecast
      doc.setFontSize(14);
      doc.setTextColor(0);
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      doc.text('Weather Forecast', 14, docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 15 : 50); }

      // Weather forecast table
      const forecastData = weatherData.forecast.map(day => [
        day.day,
        `${day.temp}°C`,
        day.condition,
        `${day.precipitation}%`
      ]);

      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      autoTable(doc, {
        startY: docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 20 : 130,
        head: [['Day', 'Temperature', 'Condition', 'Precipitation']],
        body: forecastData,
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204] },
      }); }

      // Add water conservation tips
      doc.setFontSize(14);
      doc.setTextColor(0);
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      doc.text('Water Conservation Tips', 14, docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 15 : 50); }

      // Water conservation tips table
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number }; internal?: unknown };
      autoTable(doc, {
        startY: docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 20 : 150,
        head: [['Tips for Water Conservation']],
        body: [
          ['Apply mulch around plants to reduce evaporation'],
          ['Regularly check for leaks in your irrigation system'],
          ['Consider installing soil moisture sensors for precise irrigation'],
          ['Harvest rainwater to supplement your irrigation needs'],
        ],
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204] },
      }); }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800';
      case 'Skipped':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get moisture status color
  const getMoistureStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal':
        return 'text-green-600';
      case 'Low':
        return 'text-amber-600';
      case 'Critical':
        return 'text-red-600';
      case 'Excess':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
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
                Enter field details to get personalized irrigation recommendations
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
                  <Label htmlFor="region">Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger id="region">
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

                <div className="space-y-2">
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="silt">Silty</SelectItem>
                      <SelectItem value="black">Black Cotton Soil</SelectItem>
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
                      <SelectItem value="germination">Germination</SelectItem>
                      <SelectItem value="vegetative">Vegetative</SelectItem>
                      <SelectItem value="flowering">Flowering</SelectItem>
                      <SelectItem value="fruiting">Fruiting/Grain Filling</SelectItem>
                      <SelectItem value="maturity">Maturity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="field-size">Field Size (acres)</Label>
                    <span className="text-sm text-muted-foreground">{fieldSize} acres</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex-grow">
                      <Slider
                        id="field-size"
                        min={0.5}
                        max={100}
                        step={0.5}
                        value={[fieldSize]}
                        onValueChange={(value) => setFieldSize(value[0])}
                      />
                    </div>
                    <div className="w-20">
                      <Input
                        type="number"
                        min={0.5}
                        max={1000}
                        step={0.5}
                        value={fieldSize}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0.5 && value <= 1000) {
                            setFieldSize(value);
                          }
                        }}
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigation-system">Irrigation System</Label>
                  <Select value={irrigationSystem} onValueChange={setIrrigationSystem}>
                    <SelectTrigger id="irrigation-system">
                      <SelectValue placeholder="Select irrigation system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                      <SelectItem value="flood">Flood Irrigation</SelectItem>
                      <SelectItem value="furrow">Furrow Irrigation</SelectItem>
                      <SelectItem value="manual">Manual Irrigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-source">Water Source</Label>
                  <Select value={waterSource} onValueChange={setWaterSource}>
                    <SelectTrigger id="water-source">
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groundwater">Groundwater/Well</SelectItem>
                      <SelectItem value="canal">Canal</SelectItem>
                      <SelectItem value="reservoir">Reservoir/Dam</SelectItem>
                      <SelectItem value="rainwater">Rainwater Harvesting</SelectItem>
                      <SelectItem value="river">River/Stream</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-schedule" className="cursor-pointer">Enable Auto-Scheduling</Label>
                  <Switch
                    id="auto-schedule"
                    checked={autoSchedule}
                    onCheckedChange={setAutoSchedule}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Generate Irrigation Plan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {!showResults ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Weather</CardTitle>
                  <CardDescription>
                    Weather conditions affect irrigation needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center">
                        <Sun className="h-8 w-8 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{weatherData.current.temperature}°C</p>
                        <p className="text-muted-foreground">{weatherData.current.condition}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Droplet className="h-5 w-5 text-blue-500 mb-1" />
                        <p className="text-sm font-medium">{weatherData.current.humidity}%</p>
                        <p className="text-xs text-muted-foreground">Humidity</p>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Wind className="h-5 w-5 text-cyan-500 mb-1" />
                        <p className="text-sm font-medium">{weatherData.current.windSpeed} km/h</p>
                        <p className="text-xs text-muted-foreground">Wind</p>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <CloudRain className="h-5 w-5 text-indigo-500 mb-1" />
                        <p className="text-sm font-medium">{weatherData.current.precipitation}%</p>
                        <p className="text-xs text-muted-foreground">Rain</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5-Day Forecast</CardTitle>
                  <CardDescription>
                    Plan irrigation based on upcoming weather
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="flex flex-col items-center p-2 rounded-lg border">
                        <p className="text-sm font-medium">{day.day}</p>
                        <div className="my-2">
                          {day.condition === 'Sunny' && <Sun className="h-6 w-6 text-amber-500" />}
                          {day.condition === 'Partly Cloudy' && <Cloud className="h-6 w-6 text-gray-500" />}
                          {day.condition === 'Cloudy' && <Cloud className="h-6 w-6 text-gray-500" />}
                          {day.condition === 'Light Rain' && <CloudRain className="h-6 w-6 text-blue-500" />}
                        </div>
                        <p className="text-sm">{day.temp}°C</p>
                        <p className="text-xs text-muted-foreground">{day.precipitation}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Smart Irrigation Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium text-green-800">Water Savings</h3>
                      </div>
                      <p className="text-sm text-green-700">Save up to 30% water compared to traditional irrigation methods</p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium text-blue-800">Yield Increase</h3>
                      </div>
                      <p className="text-sm text-blue-700">Improve crop yields by 15-25% with optimal water management</p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-amber-600" />
                        <h3 className="font-medium text-amber-800">Time Saving</h3>
                      </div>
                      <p className="text-sm text-amber-700">Reduce labor hours by automating irrigation scheduling</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Irrigation Schedule</CardTitle>
                    <Button variant="outline" size="sm" onClick={resetForm}>
                      New Plan
                    </Button>
                  </div>
                  <CardDescription>
                    Optimized for {cropType} in {region} region with {soilType} soil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="schedule">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="schedule">Schedule</TabsTrigger>
                      <TabsTrigger value="analytics">Water Analytics</TabsTrigger>
                      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="schedule" className="pt-4">
                      <div className="space-y-4">
                        <div className="rounded-md border">
                          <div className="grid grid-cols-4 bg-muted p-3 rounded-t-md">
                            <div className="font-medium">Day</div>
                            <div className="font-medium">Time</div>
                            <div className="font-medium">Duration</div>
                            <div className="font-medium">Status</div>
                          </div>
                          <div className="divide-y">
                            {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].schedule.map((item, index) => (
                              <div key={index} className="grid grid-cols-4 p-3">
                                <div>{item.day}</div>
                                <div>{item.time}</div>
                                <div>{item.duration > 0 ? `${item.duration} minutes` : '-'}</div>
                                <div>
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <h3 className="font-medium text-blue-800">Best Irrigation Time</h3>
                          </div>
                          <p className="text-sm text-blue-700">
                            Early morning (5-8 AM) is recommended for {cropType} during {cropStage} stage to minimize evaporation and fungal diseases.
                          </p>
                        </div>

                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                      </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="pt-4">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2 p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Recommended Water</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].waterUsage.recommended}
                              <span className="text-base font-normal"> mm/week</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Based on crop water requirements
                            </p>
                          </div>

                          <div className="space-y-2 p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Current Usage</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].waterUsage.current}
                              <span className="text-base font-normal"> mm/week</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Actual water applied
                            </p>
                          </div>

                          <div className="space-y-2 p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Water Savings</p>
                            <p className="text-2xl font-bold text-green-600">
                              {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].waterUsage.savings}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Compared to traditional methods
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Soil Moisture Status</h3>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Current Moisture Level</span>
                                <span className={getMoistureStatusColor(irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.status)}>
                                  {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.status}
                                </span>
                              </div>
                              <Progress
                                value={irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.current}
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>0%</span>
                                <span>Optimal Range: {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.optimal}</span>
                                <span>100%</span>
                              </div>
                            </div>

                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                              <p className="text-sm text-amber-700">
                                Soil moisture is currently at {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].soilMoisture.current}%, which is within the optimal range for {cropType} during {cropStage} stage. Maintain this level for best results.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="h-[200px] flex items-center justify-center border rounded-lg">
                          <p className="text-muted-foreground text-center">
                            [Water usage trend chart would appear here]
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations" className="pt-4">
                      <div className="space-y-4">
                        <ul className="space-y-3">
                          {irrigationRecommendations[cropType as keyof typeof irrigationRecommendations].recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Droplet className="h-3 w-3" />
                              </div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>

                        <Card className="bg-muted/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Water Conservation Tips</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <div className="h-4 w-4 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs">✓</span>
                                </div>
                                <span>Apply mulch around plants to reduce evaporation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-4 w-4 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs">✓</span>
                                </div>
                                <span>Regularly check for leaks in your irrigation system</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-4 w-4 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs">✓</span>
                                </div>
                                <span>Consider installing soil moisture sensors for precise irrigation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-4 w-4 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs">✓</span>
                                </div>
                                <span>Harvest rainwater to supplement your irrigation needs</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-end p-6 border-t border-slate-100 dark:border-slate-800/80">
                  <Button
                    onClick={generateReportPDF}
                    disabled={!isClient}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-green-200 dark:shadow-none transition-all flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-semibold border-none"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Report (PDF)</span>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
