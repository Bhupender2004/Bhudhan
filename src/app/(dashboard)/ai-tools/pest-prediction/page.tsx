'use client';

import { useState } from 'react';
import { ArrowLeft, Bug, Search, Upload, AlertTriangle, Info, Download, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import Image from 'next/image';

export default function PestPredictionPage() {
  const [cropType, setCropType] = useState('wheat');
  const [region, setRegion] = useState('north');
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(65);
  const [rainfall, setRainfall] = useState(20);
  const [soilMoisture, setSoilMoisture] = useState(40);
  const [cropStage, setCropStage] = useState('vegetative');
  const [selectedTab, setSelectedTab] = useState('prediction');
  const [showResults, setShowResults] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Sample pest prediction data
  const pestPredictions = {
    wheat: [
      {
        pest: 'Aphids',
        risk: 'High',
        probability: 78,
        impact: 'Moderate',
        symptoms: 'Yellowing leaves, stunted growth, honeydew secretion',
        treatment: 'Neem oil spray, introduce ladybugs, insecticidal soap',
        preventiveMeasures: [
          'Regular monitoring of crop',
          'Maintain field hygiene',
          'Use resistant varieties',
          'Balanced fertilization'
        ]
      },
      {
        pest: 'Leaf Rust',
        risk: 'Medium',
        probability: 45,
        impact: 'Moderate to High',
        symptoms: 'Orange-brown pustules on leaves, premature leaf drying',
        treatment: 'Fungicide application (propiconazole or tebuconazole)',
        preventiveMeasures: [
          'Use resistant varieties',
          'Crop rotation',
          'Proper spacing for air circulation',
          'Timely sowing'
        ]
      },
      {
        pest: 'Armyworm',
        risk: 'Low',
        probability: 22,
        impact: 'High',
        symptoms: 'Irregular holes in leaves, skeletonized leaves',
        treatment: 'Bacillus thuringiensis (Bt) spray, chemical insecticides as last resort',
        preventiveMeasures: [
          'Deep plowing after harvest',
          'Early sowing',
          'Pheromone traps for monitoring',
          'Encourage natural enemies'
        ]
      }
    ],
    rice: [
      {
        pest: 'Brown Planthopper',
        risk: 'High',
        probability: 82,
        impact: 'High',
        symptoms: 'Yellowing and drying of plants in patches (hopper burn)',
        treatment: 'Buprofezin or pymetrozine application, drain fields temporarily',
        preventiveMeasures: [
          'Use resistant varieties',
          'Avoid excessive nitrogen',
          'Maintain field hygiene',
          'Alternate wetting and drying'
        ]
      },
      {
        pest: 'Rice Blast',
        risk: 'Medium',
        probability: 58,
        impact: 'High',
        symptoms: 'Diamond-shaped lesions on leaves, infected panicles',
        treatment: 'Triazole or strobilurin fungicides',
        preventiveMeasures: [
          'Use resistant varieties',
          'Balanced fertilization',
          'Proper spacing',
          'Silicon application'
        ]
      },
      {
        pest: 'Stem Borer',
        risk: 'Medium',
        probability: 48,
        impact: 'Moderate to High',
        symptoms: 'Dead hearts in vegetative stage, white heads in reproductive stage',
        treatment: 'Cartap hydrochloride or chlorantraniliprole application',
        preventiveMeasures: [
          'Destroy stubble after harvest',
          'Early planting',
          'Use of pheromone traps',
          'Balanced fertilization'
        ]
      }
    ],
    maize: [
      {
        pest: 'Fall Armyworm',
        risk: 'Very High',
        probability: 92,
        impact: 'Severe',
        symptoms: 'Ragged leaf feeding, frass in whorls, damaged tassels and ears',
        treatment: 'Spinetoram or emamectin benzoate application',
        preventiveMeasures: [
          'Early planting',
          'Regular scouting',
          'Pheromone traps',
          'Encourage natural enemies'
        ]
      },
      {
        pest: 'Corn Earworm',
        risk: 'Medium',
        probability: 55,
        impact: 'Moderate',
        symptoms: 'Feeding damage on ear tips, frass accumulation',
        treatment: 'Bt sprays, spinosad for organic management',
        preventiveMeasures: [
          'Early planting',
          'Use of Bt maize varieties',
          'Mineral oil application to silk',
          'Encourage beneficial insects'
        ]
      },
      {
        pest: 'Common Rust',
        risk: 'Low',
        probability: 30,
        impact: 'Low to Moderate',
        symptoms: 'Small, circular to elongate, cinnamon-brown pustules',
        treatment: 'Triazole or strobilurin fungicides',
        preventiveMeasures: [
          'Use resistant hybrids',
          'Crop rotation',
          'Proper field sanitation',
          'Balanced fertilization'
        ]
      }
    ]
  };

  // Sample image analysis results
  const imageAnalysisResult = {
    pest: 'Aphids',
    confidence: 92,
    severity: 'Moderate',
    affectedArea: '35% of crop',
    recommendations: [
      'Apply neem oil spray immediately',
      'Introduce ladybugs as natural predators',
      'Monitor daily for spread to unaffected areas',
      'Consider insecticidal soap for severe infestations'
    ],
    similarCases: 3,
    expectedSpread: 'Rapid if untreated, 5-7 days to severe infestation'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImagePreview(event.target.result);
          setImageUploaded(true);
          setSelectedTab('identification');
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const resetImageUpload = () => {
    setImageUploaded(false);
    setImagePreview(null);
  };

  const resetForm = () => {
    setCropType('wheat');
    setRegion('north');
    setTemperature(28);
    setHumidity(65);
    setRainfall(20);
    setSoilMoisture(40);
    setCropStage('vegetative');
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
        <h1 className="text-3xl font-bold tracking-tight">Pest Prediction</h1>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prediction">Pest Outbreak Prediction</TabsTrigger>
          <TabsTrigger value="identification">Pest Identification</TabsTrigger>
        </TabsList>

        <TabsContent value="prediction" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Parameters</CardTitle>
                  <CardDescription>
                    Enter field conditions to predict pest risks
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
                      <Label htmlFor="temperature">Temperature (°C): {temperature}</Label>
                      <Slider
                        id="temperature"
                        min={0}
                        max={50}
                        step={1}
                        value={[temperature]}
                        onValueChange={(value) => setTemperature(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="humidity">Humidity (%): {humidity}</Label>
                      <Slider
                        id="humidity"
                        min={0}
                        max={100}
                        step={5}
                        value={[humidity]}
                        onValueChange={(value) => setHumidity(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rainfall">Recent Rainfall (mm): {rainfall}</Label>
                      <Slider
                        id="rainfall"
                        min={0}
                        max={200}
                        step={5}
                        value={[rainfall]}
                        onValueChange={(value) => setRainfall(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soil-moisture">Soil Moisture (%): {soilMoisture}</Label>
                      <Slider
                        id="soil-moisture"
                        min={0}
                        max={100}
                        step={5}
                        value={[soilMoisture]}
                        onValueChange={(value) => setSoilMoisture(value[0])}
                      />
                    </div>

                    <Button type="submit" className="w-full">Generate Prediction</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {!showResults ? (
                <Card className="h-full flex flex-col justify-center items-center p-6">
                  <Bug className="h-16 w-16 text-red-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Pest Risk Assessment</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    Enter your field conditions and click Generate Prediction to receive AI-powered pest risk assessments.
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
                      <p className="text-sm text-center">Early warning system</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <Info className="h-8 w-8 text-blue-500 mb-2" />
                      <p className="text-sm text-center">Treatment recommendations</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Pest Risk Assessment</CardTitle>
                        <Button variant="outline" size="sm" onClick={resetForm}>
                          New Prediction
                        </Button>
                      </div>
                      <CardDescription>
                        Based on current conditions for {cropType} in {region} region
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {pestPredictions[cropType as keyof typeof pestPredictions].map((pest, index) => (
                          <Card key={index} className={`border-l-4 ${
                            pest.risk === 'Very High' ? 'border-l-red-600' :
                            pest.risk === 'High' ? 'border-l-red-500' :
                            pest.risk === 'Medium' ? 'border-l-amber-500' :
                            'border-l-green-500'
                          }`}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">{pest.pest}</CardTitle>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  pest.risk === 'Very High' ? 'bg-red-100 text-red-600' :
                                  pest.risk === 'High' ? 'bg-red-50 text-red-500' :
                                  pest.risk === 'Medium' ? 'bg-amber-50 text-amber-500' :
                                  'bg-green-50 text-green-500'
                                }`}>
                                  {pest.risk} Risk
                                </div>
                              </div>
                              <CardDescription>
                                Probability: {pest.probability}% | Impact: {pest.impact}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-medium mb-1">Symptoms</p>
                                  <p className="text-sm text-muted-foreground">{pest.symptoms}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">Recommended Treatment</p>
                                  <p className="text-sm text-muted-foreground">{pest.treatment}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">Preventive Measures</p>
                                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                                    {pest.preventiveMeasures.map((measure, i) => (
                                      <li key={i}>{measure}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
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

        <TabsContent value="identification" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Pest Identification</CardTitle>
                  <CardDescription>
                    Upload an image of the affected plant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">Upload Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </div>

                    {imagePreview ? (
                      <div className="relative">
                        <div className="aspect-video rounded-lg overflow-hidden border">
                          <Image
                            src={imagePreview}
                            alt="Uploaded plant"
                            className="w-full h-full object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={resetImageUpload}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                        <div className="mt-2 text-center text-sm text-green-600 font-medium">
                          Image uploaded successfully! Click Identify Pest to analyze.
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 border-2 border-dashed rounded-lg">
                        <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Take a clear, well-lit photo of the affected plant part
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="crop-type-id">Crop Type</Label>
                      <Select defaultValue="wheat">
                        <SelectTrigger id="crop-type-id">
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
                      <Label htmlFor="plant-part">Affected Plant Part</Label>
                      <Select defaultValue="leaf">
                        <SelectTrigger id="plant-part">
                          <SelectValue placeholder="Select plant part" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leaf">Leaf</SelectItem>
                          <SelectItem value="stem">Stem</SelectItem>
                          <SelectItem value="root">Root</SelectItem>
                          <SelectItem value="fruit">Fruit/Grain</SelectItem>
                          <SelectItem value="flower">Flower</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!imageUploaded}
                    >
                      Identify Pest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {!imageUploaded ? (
                <Card className="h-full flex flex-col justify-center items-center p-6">
                  <Search className="h-16 w-16 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Pest Identification</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    Upload an image of your affected crop to identify pests and diseases using our AI vision system.
                  </p>
                  <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                    <div className="flex items-center p-4 bg-muted rounded-lg">
                      <Upload className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <p className="font-medium">Upload a clear image</p>
                        <p className="text-sm text-muted-foreground">For best results, ensure good lighting and focus</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Analysis Results</CardTitle>
                      <Button variant="outline" size="sm" onClick={resetImageUpload}>
                        New Analysis
                      </Button>
                    </div>
                    <CardDescription>
                      Based on the uploaded image
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/2">
                        {imagePreview ? (
                          <div className="h-[200px] rounded-lg overflow-hidden border">
                            <Image
                              src={imagePreview}
                              alt="Analyzed plant"
                              className="w-full h-full object-cover"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        ) : (
                          <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground text-center">
                              [Uploaded image would appear here]
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="md:w-1/2 space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Identified as</p>
                          <p className="text-xl font-semibold">{imageAnalysisResult.pest}</p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Confidence</span>
                            <span className="font-medium">{imageAnalysisResult.confidence}%</span>
                          </div>
                          <Progress value={imageAnalysisResult.confidence} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Severity</p>
                            <p className="font-medium">{imageAnalysisResult.severity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Affected Area</p>
                            <p className="font-medium">{imageAnalysisResult.affectedArea}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Similar Cases</p>
                            <p className="font-medium">{imageAnalysisResult.similarCases} nearby farms</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Expected Spread</p>
                            <p className="font-medium">Rapid if untreated</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                      <ul className="space-y-2">
                        {imageAnalysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Bug className="h-3 w-3" />
                            </div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setImageUploaded(false)}>
                      Upload New Image
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
