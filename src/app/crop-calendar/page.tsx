'use client';

import { useState } from 'react';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

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

export default function CropCalendarPage() {
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Calendar</h1>
          <p className="text-muted-foreground">
            Plan your farming activities with our seasonal crop calendar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>View by Month</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Crops</TabsTrigger>
            <TabsTrigger value="kharif">Kharif</TabsTrigger>
            <TabsTrigger value="rabi">Rabi</TabsTrigger>
            <TabsTrigger value="zaid">Zaid</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search crops..."
              className="h-8 w-[150px] lg:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterCrops(cropCalendarData, 'all').map((crop) => (
              <Card key={crop.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{crop.crop}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openCropDetails(crop)}
                    >
                      Details
                    </Button>
                  </div>
                  <CardDescription>Season: {crop.season}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <div className="font-medium">Sowing Time</div>
                      <div className="col-span-2">{crop.sowingTime}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="font-medium">Harvest Time</div>
                      <div className="col-span-2">{crop.harvestTime}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="font-medium">Region</div>
                      <div className="col-span-2">{crop.region}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="font-medium">Soil Type</div>
                      <div className="col-span-2">{crop.soilType}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="font-medium">Water Need</div>
                      <div className="col-span-2">{crop.waterRequirement}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="font-medium">Expected Yield</div>
                      <div className="col-span-2">{crop.expectedYield}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kharif" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterCrops(cropCalendarData, 'kharif').map((crop) => (
                <Card key={crop.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{crop.crop}</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCropDetails(crop)}
                      >
                        Details
                      </Button>
                    </div>
                    <CardDescription>Season: {crop.season}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Sowing Time</div>
                        <div className="col-span-2">{crop.sowingTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Harvest Time</div>
                        <div className="col-span-2">{crop.harvestTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Region</div>
                        <div className="col-span-2">{crop.region}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Soil Type</div>
                        <div className="col-span-2">{crop.soilType}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Water Need</div>
                        <div className="col-span-2">{crop.waterRequirement}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Expected Yield</div>
                        <div className="col-span-2">{crop.expectedYield}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="rabi" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterCrops(cropCalendarData, 'rabi').map((crop) => (
                <Card key={crop.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{crop.crop}</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCropDetails(crop)}
                      >
                        Details
                      </Button>
                    </div>
                    <CardDescription>Season: {crop.season}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Sowing Time</div>
                        <div className="col-span-2">{crop.sowingTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Harvest Time</div>
                        <div className="col-span-2">{crop.harvestTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Region</div>
                        <div className="col-span-2">{crop.region}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Soil Type</div>
                        <div className="col-span-2">{crop.soilType}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Water Need</div>
                        <div className="col-span-2">{crop.waterRequirement}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Expected Yield</div>
                        <div className="col-span-2">{crop.expectedYield}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="zaid" className="mt-4">
          {filterCrops(cropCalendarData, 'zaid').length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterCrops(cropCalendarData, 'zaid').map((crop) => (
                <Card key={crop.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{crop.crop}</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCropDetails(crop)}
                      >
                        Details
                      </Button>
                    </div>
                    <CardDescription>Season: {crop.season}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Sowing Time</div>
                        <div className="col-span-2">{crop.sowingTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Harvest Time</div>
                        <div className="col-span-2">{crop.harvestTime}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Region</div>
                        <div className="col-span-2">{crop.region}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Soil Type</div>
                        <div className="col-span-2">{crop.soilType}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Water Need</div>
                        <div className="col-span-2">{crop.waterRequirement}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="font-medium">Expected Yield</div>
                        <div className="col-span-2">{crop.expectedYield}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
