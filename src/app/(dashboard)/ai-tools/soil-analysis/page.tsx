'use client';

import { useState } from 'react';
import { ArrowLeft, FlaskConical, FileText, Download, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function SoilAnalysisPage() {
  const [analysisMethod, setAnalysisMethod] = useState('image');
  const [region, setRegion] = useState('north');
  const [cropType, setCropType] = useState('wheat');
  const [, setSoilSample] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample soil analysis results
  const soilAnalysisResults = {
    nutrients: {
      nitrogen: 42,
      phosphorus: 35,
      potassium: 68,
      sulfur: 12,
      calcium: 85,
      magnesium: 55,
      zinc: 8,
      iron: 15,
      manganese: 10,
      copper: 5,
      boron: 3
    },
    properties: {
      ph: 6.8,
      organicMatter: 2.5,
      cec: 18.5,
      texture: 'Clay Loam',
      waterHolding: 'Medium to High',
      drainage: 'Moderate'
    },
    recommendations: {
      fertilizer: [
        { name: 'Nitrogen (N)', amount: '80-100 kg/ha', notes: 'Apply in split doses' },
        { name: 'Phosphorus (P2O5)', amount: '40-60 kg/ha', notes: 'Apply at sowing' },
        { name: 'Potassium (K2O)', amount: '20-30 kg/ha', notes: 'Apply at sowing' },
        { name: 'Zinc Sulfate', amount: '25 kg/ha', notes: 'Apply every 2-3 years' }
      ],
      crops: [
        { name: 'Wheat', suitability: 'High', varieties: 'HD-2967, PBW-550, DBW-17' },
        { name: 'Rice', suitability: 'Medium', varieties: 'Pusa Basmati-1, IR-36, MTU-7029' },
        { name: 'Maize', suitability: 'High', varieties: 'DHM-117, HQPM-1, Vivek-9' },
        { name: 'Pulses', suitability: 'Medium', varieties: 'Pusa-256, IPL-316, KPM-522' }
      ],
      soilHealth: [
        'Add organic matter to improve soil structure',
        'Practice crop rotation to maintain soil fertility',
        'Consider green manuring with legumes',
        'Apply gypsum to improve soil structure if needed',
        'Maintain proper drainage to prevent waterlogging'
      ]
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUploaded(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const resetForm = () => {
    setAnalysisMethod('image');
    setRegion('north');
    setCropType('wheat');
    setSoilSample('');
    setImageUploaded(false);
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
        <h1 className="text-3xl font-bold tracking-tight">Soil Analysis</h1>
      </div>

      <Tabs defaultValue="analyze" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analyze">Analyze Soil</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Soil Analysis</CardTitle>
                  <CardDescription>
                    Upload soil image or enter lab results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="analysis-method">Analysis Method</Label>
                      <Select value={analysisMethod} onValueChange={setAnalysisMethod}>
                        <SelectTrigger id="analysis-method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Soil Image Analysis</SelectItem>
                          <SelectItem value="manual">Manual Data Entry</SelectItem>
                          <SelectItem value="lab">Lab Report Upload</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {analysisMethod === 'image' && (
                      <div className="space-y-2">
                        <Label htmlFor="soil-image">Upload Soil Image</Label>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Input
                            id="soil-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For best results, take a clear image of the soil in natural light
                        </p>
                      </div>
                    )}

                    {analysisMethod === 'manual' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nitrogen">Nitrogen (ppm)</Label>
                            <Input id="nitrogen" type="number" placeholder="e.g., 42" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phosphorus">Phosphorus (ppm)</Label>
                            <Input id="phosphorus" type="number" placeholder="e.g., 35" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="potassium">Potassium (ppm)</Label>
                            <Input id="potassium" type="number" placeholder="e.g., 68" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ph">pH</Label>
                            <Input id="ph" type="number" step="0.1" placeholder="e.g., 6.8" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organic-matter">Organic Matter (%)</Label>
                          <Input id="organic-matter" type="number" step="0.1" placeholder="e.g., 2.5" />
                        </div>
                      </div>
                    )}

                    {analysisMethod === 'lab' && (
                      <div className="space-y-2">
                        <Label htmlFor="lab-report">Upload Lab Report</Label>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Input
                            id="lab-report"
                            type="file"
                            accept=".pdf,.jpg,.png,.doc,.docx"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Upload your soil test lab report (PDF, Word, or image)
                        </p>
                      </div>
                    )}

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
                      <Label htmlFor="crop-type">Target Crop</Label>
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
                          <SelectItem value="pulses">Pulses</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={analysisMethod === 'image' && !imageUploaded}
                    >
                      Analyze Soil
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {!showResults ? (
                <Card className="h-full flex flex-col justify-center items-center p-6">
                  <FlaskConical className="h-16 w-16 text-amber-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Soil Analysis</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    Upload a soil image or enter soil test data to receive AI-powered soil analysis and recommendations.
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <PieChart className="h-8 w-8 text-primary mb-2" />
                      <p className="text-sm text-center">Nutrient analysis</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <FileText className="h-8 w-8 text-primary mb-2" />
                      <p className="text-sm text-center">Crop recommendations</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Soil Analysis Results</CardTitle>
                        <Button variant="outline" size="sm" onClick={resetForm}>
                          New Analysis
                        </Button>
                      </div>
                      <CardDescription>
                        Based on {analysisMethod === 'image' ? 'soil image analysis' :
                                  analysisMethod === 'manual' ? 'manual data entry' : 'lab report'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="nutrients">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
                          <TabsTrigger value="properties">Soil Properties</TabsTrigger>
                          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                        </TabsList>

                        <TabsContent value="nutrients" className="pt-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2 p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm text-muted-foreground">Nitrogen (N)</p>
                                <p className="text-2xl font-bold text-amber-500">
                                  {soilAnalysisResults.nutrients.nitrogen}
                                  <span className="text-base font-normal"> ppm</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {soilAnalysisResults.nutrients.nitrogen > 40 ? 'High' :
                                   soilAnalysisResults.nutrients.nitrogen > 20 ? 'Medium' : 'Low'}
                                </p>
                              </div>
                              <div className="space-y-2 p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm text-muted-foreground">Phosphorus (P)</p>
                                <p className="text-2xl font-bold text-amber-500">
                                  {soilAnalysisResults.nutrients.phosphorus}
                                  <span className="text-base font-normal"> ppm</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {soilAnalysisResults.nutrients.phosphorus > 30 ? 'High' :
                                   soilAnalysisResults.nutrients.phosphorus > 15 ? 'Medium' : 'Low'}
                                </p>
                              </div>
                              <div className="space-y-2 p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm text-muted-foreground">Potassium (K)</p>
                                <p className="text-2xl font-bold text-amber-500">
                                  {soilAnalysisResults.nutrients.potassium}
                                  <span className="text-base font-normal"> ppm</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {soilAnalysisResults.nutrients.potassium > 60 ? 'High' :
                                   soilAnalysisResults.nutrients.potassium > 30 ? 'Medium' : 'Low'}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-md border">
                              <div className="grid grid-cols-3 bg-muted p-3 rounded-t-md">
                                <div className="font-medium">Nutrient</div>
                                <div className="font-medium">Value</div>
                                <div className="font-medium">Status</div>
                              </div>
                              <div className="divide-y">
                                <div className="grid grid-cols-3 p-3">
                                  <div>Sulfur (S)</div>
                                  <div>{soilAnalysisResults.nutrients.sulfur} ppm</div>
                                  <div>{soilAnalysisResults.nutrients.sulfur > 10 ? 'Adequate' : 'Deficient'}</div>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                  <div>Calcium (Ca)</div>
                                  <div>{soilAnalysisResults.nutrients.calcium} ppm</div>
                                  <div>{soilAnalysisResults.nutrients.calcium > 70 ? 'High' : 'Medium'}</div>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                  <div>Magnesium (Mg)</div>
                                  <div>{soilAnalysisResults.nutrients.magnesium} ppm</div>
                                  <div>{soilAnalysisResults.nutrients.magnesium > 50 ? 'Adequate' : 'Low'}</div>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                  <div>Zinc (Zn)</div>
                                  <div>{soilAnalysisResults.nutrients.zinc} ppm</div>
                                  <div className="text-amber-500 font-medium">Deficient</div>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                  <div>Iron (Fe)</div>
                                  <div>{soilAnalysisResults.nutrients.iron} ppm</div>
                                  <div>Adequate</div>
                                </div>
                              </div>
                            </div>

                            <div className="h-[200px] flex items-center justify-center border rounded-lg">
                              <p className="text-muted-foreground text-center">
                                [Nutrient balance chart visualization would appear here]
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="properties" className="pt-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2 p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm text-muted-foreground">pH</p>
                                <p className="text-2xl font-bold text-amber-500">
                                  {soilAnalysisResults.properties.ph}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {soilAnalysisResults.properties.ph > 7.5 ? 'Alkaline' :
                                   soilAnalysisResults.properties.ph >= 6.5 ? 'Neutral' : 'Acidic'}
                                </p>
                              </div>
                              <div className="space-y-2 p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm text-muted-foreground">Organic Matter</p>
                                <p className="text-2xl font-bold text-amber-500">
                                  {soilAnalysisResults.properties.organicMatter}
                                  <span className="text-base font-normal">%</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {soilAnalysisResults.properties.organicMatter > 3 ? 'High' :
                                   soilAnalysisResults.properties.organicMatter > 1.5 ? 'Medium' : 'Low'}
                                </p>
                              </div>
                              <div className="space-y-2 p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm text-muted-foreground">CEC</p>
                                <p className="text-2xl font-bold text-amber-500">
                                  {soilAnalysisResults.properties.cec}
                                  <span className="text-base font-normal"> meq/100g</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {soilAnalysisResults.properties.cec > 20 ? 'High' :
                                   soilAnalysisResults.properties.cec > 10 ? 'Medium' : 'Low'}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-md border">
                              <div className="grid grid-cols-2 bg-muted p-3 rounded-t-md">
                                <div className="font-medium">Property</div>
                                <div className="font-medium">Value</div>
                              </div>
                              <div className="divide-y">
                                <div className="grid grid-cols-2 p-3">
                                  <div>Soil Texture</div>
                                  <div>{soilAnalysisResults.properties.texture}</div>
                                </div>
                                <div className="grid grid-cols-2 p-3">
                                  <div>Water Holding Capacity</div>
                                  <div>{soilAnalysisResults.properties.waterHolding}</div>
                                </div>
                                <div className="grid grid-cols-2 p-3">
                                  <div>Drainage</div>
                                  <div>{soilAnalysisResults.properties.drainage}</div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                              <h4 className="font-medium text-amber-800 mb-2">Soil Type Analysis</h4>
                              <p className="text-sm text-amber-700">
                                Your soil is classified as {soilAnalysisResults.properties.texture} with {soilAnalysisResults.properties.ph > 7.5 ? 'alkaline' :
                                soilAnalysisResults.properties.ph >= 6.5 ? 'neutral' : 'acidic'} pH. This soil type has {soilAnalysisResults.properties.waterHolding.toLowerCase()} water holding capacity and {soilAnalysisResults.properties.drainage.toLowerCase()} drainage.
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="recommendations" className="pt-4">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Fertilizer Recommendations</h3>
                              <div className="rounded-md border">
                                <div className="grid grid-cols-3 bg-muted p-3 rounded-t-md">
                                  <div className="font-medium">Nutrient</div>
                                  <div className="font-medium">Amount</div>
                                  <div className="font-medium">Notes</div>
                                </div>
                                <div className="divide-y">
                                  {soilAnalysisResults.recommendations.fertilizer.map((fert, index) => (
                                    <div key={index} className="grid grid-cols-3 p-3">
                                      <div>{fert.name}</div>
                                      <div>{fert.amount}</div>
                                      <div className="text-sm text-muted-foreground">{fert.notes}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold mb-3">Suitable Crops</h3>
                              <div className="grid grid-cols-2 gap-4">
                                {soilAnalysisResults.recommendations.crops.map((crop, index) => (
                                  <Card key={index} className={`border-l-4 ${
                                    crop.suitability === 'High' ? 'border-l-green-500' :
                                    crop.suitability === 'Medium' ? 'border-l-amber-500' :
                                    'border-l-red-500'
                                  }`}>
                                    <CardHeader className="pb-2">
                                      <div className="flex justify-between items-center">
                                        <CardTitle className="text-base">{crop.name}</CardTitle>
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          crop.suitability === 'High' ? 'bg-green-50 text-green-600' :
                                          crop.suitability === 'Medium' ? 'bg-amber-50 text-amber-600' :
                                          'bg-red-50 text-red-600'
                                        }`}>
                                          {crop.suitability} Suitability
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-sm">
                                        <span className="font-medium">Recommended Varieties:</span> {crop.varieties}
                                      </p>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold mb-3">Soil Health Improvement</h3>
                              <ul className="space-y-2">
                                {soilAnalysisResults.recommendations.soilHealth.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <FlaskConical className="h-3 w-3" />
                                    </div>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        <span>Download Report</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>
                Previous soil analysis reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted p-3 rounded-t-md">
                  <div className="font-medium">Date</div>
                  <div className="font-medium">Field/Location</div>
                  <div className="font-medium">Analysis Type</div>
                  <div className="font-medium">Key Findings</div>
                  <div className="font-medium">Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-5 p-3">
                    <div>15 May 2023</div>
                    <div>North Field</div>
                    <div>Image Analysis</div>
                    <div>Low Nitrogen, High K</div>
                    <div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-3">
                    <div>03 Mar 2023</div>
                    <div>South Field</div>
                    <div>Lab Report</div>
                    <div>Acidic pH, Low P</div>
                    <div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-3">
                    <div>12 Nov 2022</div>
                    <div>East Field</div>
                    <div>Manual Entry</div>
                    <div>Low Organic Matter</div>
                    <div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soil Health Trends</CardTitle>
              <CardDescription>
                Track changes in your soil health over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground text-center">
                  [Soil health trend chart visualization would appear here]
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
