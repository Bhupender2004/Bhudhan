'use client';

import { useState } from 'react';
import { CalendarIcon, Filter, X, LayoutGrid, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

// Metadata is moved to layout.tsx for client components

// Define the CropData type
interface CropData {
  id: number;
  crop: string;
  season: string;
  sowingTime: string;
  harvestTime: string;
  region: string;
  soilType: string;
  waterRequirement: string;
  fertilizers: string;
  pesticides: string;
  expectedYield: string;
}

// Mock crop calendar data
const cropCalendarData: CropData[] = [
  {
    id: 1,
    crop: 'Wheat',
    season: 'Rabi',
    sowingTime: 'October-November',
    harvestTime: 'March-April',
    region: 'North India',
    soilType: 'Loamy, Clay Loam',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Urea',
    pesticides: 'Fungicides for rust',
    expectedYield: '4-5 tons/hectare'
  },
  {
    id: 2,
    crop: 'Rice',
    season: 'Kharif',
    sowingTime: 'June-July',
    harvestTime: 'October-November',
    region: 'All India',
    soilType: 'Clay, Clay Loam',
    waterRequirement: 'High',
    fertilizers: 'NPK, Urea, Zinc',
    pesticides: 'Insecticides for stem borer',
    expectedYield: '3-4 tons/hectare'
  },
  {
    id: 3,
    crop: 'Maize',
    season: 'Kharif/Rabi',
    sowingTime: 'Kharif: June-July, Rabi: October-November',
    harvestTime: 'Kharif: September-October, Rabi: February-March',
    region: 'All India',
    soilType: 'Loamy, Sandy Loam',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Urea',
    pesticides: 'Insecticides for stem borer',
    expectedYield: '2.5-3.5 tons/hectare'
  },
  {
    id: 4,
    crop: 'Cotton',
    season: 'Kharif',
    sowingTime: 'April-May',
    harvestTime: 'October-November',
    region: 'Central & South India',
    soilType: 'Black Cotton Soil, Alluvial',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Urea, Micronutrients',
    pesticides: 'Insecticides for bollworm',
    expectedYield: '15-20 quintals/hectare'
  },
  {
    id: 5,
    crop: 'Sugarcane',
    season: 'Year-round',
    sowingTime: 'October-February',
    harvestTime: '12-18 months after planting',
    region: 'North & South India',
    soilType: 'Loamy, Clay Loam',
    waterRequirement: 'High',
    fertilizers: 'NPK, Urea, Organic Manure',
    pesticides: 'Insecticides for borers',
    expectedYield: '70-80 tons/hectare'
  },
  {
    id: 6,
    crop: 'Potato',
    season: 'Rabi',
    sowingTime: 'October-November',
    harvestTime: 'January-February',
    region: 'North India',
    soilType: 'Sandy Loam, Loamy',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Organic Manure',
    pesticides: 'Fungicides for late blight',
    expectedYield: '20-25 tons/hectare'
  },
  {
    id: 7,
    crop: 'Mustard',
    season: 'Rabi',
    sowingTime: 'October',
    harvestTime: 'February-March',
    region: 'North & Central India',
    soilType: 'Loamy, Sandy Loam',
    waterRequirement: 'Low',
    fertilizers: 'NPK, Sulfur',
    pesticides: 'Insecticides for aphids',
    expectedYield: '1-1.5 tons/hectare'
  },
  {
    id: 8,
    crop: 'Groundnut',
    season: 'Kharif/Rabi',
    sowingTime: 'Kharif: June-July, Rabi: November-December',
    harvestTime: 'Kharif: October, Rabi: March-April',
    region: 'South & West India',
    soilType: 'Sandy Loam, Red Soil',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Calcium, Gypsum',
    pesticides: 'Fungicides for leaf spot',
    expectedYield: '1.5-2 tons/hectare'
  }
];

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const getMonthIndex = (monthStr: string) => {
  const m = monthStr.toLowerCase().substring(0, 3);
  return months.findIndex(month => month.toLowerCase() === m);
};

const isCropActiveInMonth = (crop: CropData, monthIndex: number) => {
  // Parsing logic for sowing and harvest times
  const sowingParts = crop.sowingTime.split(/[-–,]/).map(s => s.trim());
  const harvestParts = crop.harvestTime.split(/[-–,]/).map(s => s.trim());
  
  if (sowingParts.length === 0 || harvestParts.length === 0) return false;

  const startMonth = getMonthIndex(sowingParts[0]);
  const endMonth = getMonthIndex(harvestParts[harvestParts.length - 1]);

  if (startMonth === -1 || endMonth === -1) {
      if (crop.season.toLowerCase().includes('year-round')) return true;
      return false;
  }

  if (startMonth <= endMonth) {
    return monthIndex >= startMonth && monthIndex <= endMonth;
  } else {
    return monthIndex >= startMonth || monthIndex <= endMonth;
  }
};

const MonthlyCalendarView = ({ crops }: { crops: CropData[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Crop Cycle</CardTitle>
        <CardDescription>Visual representation of sowing and harvesting periods</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] bg-background sticky left-0 z-10">Crop</TableHead>
                {months.map(m => (
                  <TableHead key={m} className="text-center px-1 min-w-[50px]">{m}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map(crop => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium bg-background sticky left-0 z-10 border-r">{crop.crop}</TableCell>
                  {months.map((_, i) => {
                    const isActive = isCropActiveInMonth(crop, i);
                    return (
                      <TableCell key={i} className="p-1 border-x h-12">
                        <div 
                          className={`h-full w-full rounded-sm transition-all ${isActive ? 'bg-green-500 shadow-sm' : 'bg-muted/30'}`}
                          title={isActive ? `${crop.crop} is active in ${months[i]}` : ''}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-green-500 rounded-sm shadow-sm" />
            <span className="text-muted-foreground">Active Period (Sowing to Harvest)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-muted/30 rounded-sm" />
            <span className="text-muted-foreground">Dormant Period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CropCalendarPage() {
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const openCropDetails = (crop: CropData) => {
    setSelectedCrop(crop);
    setIsDialogOpen(true);
  };

  const filterCrops = (crops: CropData[], season: string) => {
    let filteredCrops = crops;

    // Filter by season if not 'all'
    if (season !== 'all') {
      filteredCrops = filteredCrops.filter(crop =>
        crop.season.toLowerCase().includes(season.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredCrops = filteredCrops.filter(crop =>
        crop.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      filteredCrops = filteredCrops.filter(crop =>
        crop.region.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    }

    return filteredCrops;
  };
  return (
    <div className="space-y-6 px-4 md:px-10">
      <div className="flex items-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Crop Calendar</h1>
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-muted-foreground">
            Plan your farming activities with our seasonal crop calendar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'calendar' ? 'default' : 'outline'} 
            size="sm" 
            className="h-8 gap-1"
            onClick={() => setViewMode(viewMode === 'grid' ? 'calendar' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <>
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>View by Month</span>
              </>
            ) : (
              <>
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid View</span>
              </>
            )}
          </Button>

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Crops</SheetTitle>
                <SheetDescription>
                  Refine your crop search by name, region, or season.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search crops..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Region</label>
                  <Select
                    value={selectedRegion}
                    onValueChange={setSelectedRegion}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="north">North India</SelectItem>
                      <SelectItem value="south">South India</SelectItem>
                      <SelectItem value="east">East India</SelectItem>
                      <SelectItem value="west">West India</SelectItem>
                      <SelectItem value="central">Central India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4 flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedRegion('all');
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between overflow-x-auto pb-2 sm:overflow-visible">
          <TabsList>
            <TabsTrigger value="all">All Crops</TabsTrigger>
            <TabsTrigger value="kharif">Kharif</TabsTrigger>
            <TabsTrigger value="rabi">Rabi</TabsTrigger>
            <TabsTrigger value="zaid">Zaid</TabsTrigger>
          </TabsList>
          <div className="hidden items-center gap-2 md:flex">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                className="h-8 w-[150px] pl-8 lg:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
                <SelectItem value="central">Central India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterCrops(cropCalendarData, 'all').map((crop) => (
                <Card key={crop.id} className="overflow-hidden border-t-4 border-t-green-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{crop.crop}</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCropDetails(crop)}
                      >
                        Details
                      </Button>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">{crop.season}</Badge>
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3" />
                        {crop.region}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-muted-foreground">Sowing</div>
                        <div className="col-span-2 font-medium">{crop.sowingTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-muted-foreground">Harvest</div>
                        <div className="col-span-2 font-medium">{crop.harvestTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-muted-foreground">Soil</div>
                        <div className="col-span-2 line-clamp-1">{crop.soilType}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 pt-1 border-t">
                        <div className="text-muted-foreground">Water</div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="font-normal text-[10px]">{crop.waterRequirement}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <MonthlyCalendarView crops={filterCrops(cropCalendarData, 'all')} />
          )}
        </TabsContent>

        <TabsContent value="kharif" className="mt-4">
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterCrops(cropCalendarData, 'kharif').map((crop) => (
                  <Card key={crop.id} className="overflow-hidden border-t-4 border-t-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{crop.crop}</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openCropDetails(crop)}
                        >
                          Details
                        </Button>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-normal">{crop.season}</Badge>
                        <span className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          {crop.region}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Sowing</div>
                          <div className="col-span-2 font-medium">{crop.sowingTime}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Harvest</div>
                          <div className="col-span-2 font-medium">{crop.harvestTime}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Soil</div>
                          <div className="col-span-2 line-clamp-1">{crop.soilType}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <MonthlyCalendarView crops={filterCrops(cropCalendarData, 'kharif')} />
          )}
        </TabsContent>

        <TabsContent value="rabi" className="mt-4">
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterCrops(cropCalendarData, 'rabi').map((crop) => (
                  <Card key={crop.id} className="overflow-hidden border-t-4 border-t-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{crop.crop}</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openCropDetails(crop)}
                        >
                          Details
                        </Button>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-normal">{crop.season}</Badge>
                        <span className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          {crop.region}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Sowing</div>
                          <div className="col-span-2 font-medium">{crop.sowingTime}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Harvest</div>
                          <div className="col-span-2 font-medium">{crop.harvestTime}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Soil</div>
                          <div className="col-span-2 line-clamp-1">{crop.soilType}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <MonthlyCalendarView crops={filterCrops(cropCalendarData, 'rabi')} />
          )}
        </TabsContent>

        <TabsContent value="zaid" className="mt-4">
          {filterCrops(cropCalendarData, 'zaid').length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterCrops(cropCalendarData, 'zaid').map((crop) => (
                  <Card key={crop.id} className="overflow-hidden border-t-4 border-t-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{crop.crop}</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openCropDetails(crop)}
                        >
                          Details
                        </Button>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-normal">{crop.season}</Badge>
                        <span className="flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          {crop.region}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Sowing</div>
                          <div className="col-span-2 font-medium">{crop.sowingTime}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">Harvest</div>
                          <div className="col-span-2 font-medium">{crop.harvestTime}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <MonthlyCalendarView crops={filterCrops(cropCalendarData, 'zaid')} />
            )
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  No Zaid crops found in the current dataset.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Zaid crops are grown between Rabi and Kharif seasons.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Crop Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedCrop && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedCrop.crop}</DialogTitle>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
                <DialogDescription>
                  Season: <span className="font-medium">{selectedCrop.season}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Growing Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Growing Information</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-1/3">Sowing Time</TableCell>
                        <TableCell>{selectedCrop.sowingTime}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Harvest Time</TableCell>
                        <TableCell>{selectedCrop.harvestTime}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Region</TableCell>
                        <TableCell>{selectedCrop.region}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Soil Type</TableCell>
                        <TableCell>{selectedCrop.soilType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Water Requirement</TableCell>
                        <TableCell>{selectedCrop.waterRequirement}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fertilizers</TableCell>
                        <TableCell>{selectedCrop.fertilizers}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Pesticides</TableCell>
                        <TableCell>{selectedCrop.pesticides}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Expected Yield</TableCell>
                        <TableCell>{selectedCrop.expectedYield}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
