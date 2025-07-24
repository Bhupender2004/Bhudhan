'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Cloud, BarChart3, LineChart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function YieldPredictionPage() {
  const [cropType, setCropType] = useState('wheat');
  const [region, setRegion] = useState('north');
  const [soilType, setSoilType] = useState('loamy');
  const [irrigationType, setIrrigationType] = useState('drip');
  const [seedVariety, setSeedVariety] = useState('hd2967');
  const [farmSize, setFarmSize] = useState(5);
  const [fertilizer, setFertilizer] = useState(50);
  const [pesticide, setPesticide] = useState(30);
  const [showResults, setShowResults] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to generate and download PDF report
  const generatePDF = async () => {
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
      doc.setTextColor(33, 150, 83); // Green color
      doc.text('BhuDhan Krishi - Yield Prediction Report', 105, 15, { align: 'center' });

      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${currentDate}`, 105, 22, { align: 'center' });

      // Farm details table
      autoTable(doc, {
        startY: 40,
        head: [['Parameter', 'Value']],
        body: [
          ['Crop Type', cropType.charAt(0).toUpperCase() + cropType.slice(1)],
          ['Region', region.charAt(0).toUpperCase() + region.slice(1)],
          ['Soil Type', soilType.charAt(0).toUpperCase() + soilType.slice(1)],
          ['Irrigation Type', irrigationType.charAt(0).toUpperCase() + irrigationType.slice(1)],
          ['Seed Variety', seedVariety.toUpperCase()],
          ['Farm Size', `${farmSize} hectares`],
          ['Fertilizer Usage', `${fertilizer}%`],
          ['Pesticide Usage', `${pesticide}%`],
        ],
        theme: 'grid',
        headStyles: { fillColor: [33, 150, 83] },
      });

      // Add prediction results
      doc.setFontSize(14);
      doc.setTextColor(0);
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number } };
      doc.text('Yield Prediction Results', 14, docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 15 : 50); }

      // Prediction results table
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number } };
      autoTable(doc, {
        startY: docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 20 : 70,
        head: [['Metric', 'Value']],
        body: [
          ['Expected Yield', `${predictionResults[cropType as keyof typeof predictionResults].expectedYield} t/ha`],
          ['Yield Range', `${predictionResults[cropType as keyof typeof predictionResults].yieldRange[0]} - ${predictionResults[cropType as keyof typeof predictionResults].yieldRange[1]} t/ha`],
          ['Total Production', `${(predictionResults[cropType as keyof typeof predictionResults].expectedYield * farmSize).toFixed(1)} tonnes`],
          ['Confidence Level', `${predictionResults[cropType as keyof typeof predictionResults].confidenceLevel}%`],
        ],
        theme: 'grid',
        headStyles: { fillColor: [33, 150, 83] },
      }); }

      // Add key factors
      doc.setFontSize(14);
      doc.setTextColor(0);
      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number } };
      doc.text('Key Factors Affecting Yield', 14, docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 15 : 50); }

      // Key factors table
      const factorsData = predictionResults[cropType as keyof typeof predictionResults].factors.map(factor => [
        factor.name,
        factor.impact,
        factor.recommendation
      ]);

      { const docWithAutoTable = doc as unknown as { lastAutoTable?: { finalY?: number } };
      autoTable(doc, {
        startY: docWithAutoTable.lastAutoTable?.finalY ? docWithAutoTable.lastAutoTable.finalY + 20 : 90,
        head: [['Factor', 'Impact', 'Recommendation']],
        body: factorsData,
        theme: 'grid',
        headStyles: { fillColor: [33, 150, 83] },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 30 },
          2: { cellWidth: 'auto' },
        },
      }); }

      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('BhuDhan Krishi - Your Digital AI Farmer', 105, doc.internal.pageSize.height - 10, { align: 'center' });
      }

      // Save the PDF
      doc.save(`BhuDhan_Yield_Prediction_${cropType}_${currentDate.replace(/\//g, '-')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Sample historical data for charts

  // Sample prediction results
  const predictionResults = {
    wheat: {
      expectedYield: 4.5,
      yieldRange: [4.2, 4.8],
      confidenceLevel: 85,
      factors: [
        { name: 'Weather Conditions', impact: 'High', recommendation: 'Monitor rainfall patterns and prepare for irrigation if needed' },
        { name: 'Soil Health', impact: 'Medium', recommendation: 'Consider adding organic matter to improve soil structure' },
        { name: 'Pest Pressure', impact: 'Low', recommendation: 'Regular monitoring for aphids and rust disease' }
      ]
    },
    rice: {
      expectedYield: 4.8,
      yieldRange: [4.5, 5.1],
      confidenceLevel: 82,
      factors: [
        { name: 'Water Management', impact: 'High', recommendation: 'Maintain proper water levels during critical growth stages' },
        { name: 'Fertilizer Application', impact: 'Medium', recommendation: 'Split nitrogen application for better efficiency' },
        { name: 'Disease Pressure', impact: 'Medium', recommendation: 'Monitor for blast disease, especially in humid conditions' }
      ]
    },
    maize: {
      expectedYield: 4.3,
      yieldRange: [4.0, 4.6],
      confidenceLevel: 80,
      factors: [
        { name: 'Rainfall Distribution', impact: 'High', recommendation: 'Ensure adequate moisture during silking and grain filling stages' },
        { name: 'Nitrogen Management', impact: 'High', recommendation: 'Apply nitrogen in split doses for better utilization' },
        { name: 'Weed Control', impact: 'Medium', recommendation: 'Early weed management is critical for yield optimization' }
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
    setIrrigationType('drip');
    setSeedVariety('hd2967');
    setFarmSize(5);
    setFertilizer(50);
    setPesticide(30);
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
        <h1 className="text-3xl font-bold tracking-tight">Yield Prediction</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>
                Enter your farm details for yield prediction
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
                      <SelectItem value="rainfed">Rainfed (No Irrigation)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seed-variety">Seed Variety</Label>
                  <Select value={seedVariety} onValueChange={setSeedVariety}>
                    <SelectTrigger id="seed-variety">
                      <SelectValue placeholder="Select seed variety" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropType === 'wheat' && (
                        <>
                          <SelectItem value="hd2967">HD-2967</SelectItem>
                          <SelectItem value="pbw550">PBW-550</SelectItem>
                          <SelectItem value="dbw17">DBW-17</SelectItem>
                        </>
                      )}
                      {cropType === 'rice' && (
                        <>
                          <SelectItem value="pusa1509">Pusa Basmati 1509</SelectItem>
                          <SelectItem value="ir36">IR-36</SelectItem>
                          <SelectItem value="mtu7029">MTU-7029</SelectItem>
                        </>
                      )}
                      {cropType === 'maize' && (
                        <>
                          <SelectItem value="dhm117">DHM-117</SelectItem>
                          <SelectItem value="hqpm1">HQPM-1</SelectItem>
                          <SelectItem value="vivek9">Vivek Hybrid-9</SelectItem>
                        </>
                      )}
                      {cropType === 'cotton' && (
                        <>
                          <SelectItem value="bt1">Bt Cotton Hybrid</SelectItem>
                          <SelectItem value="dch32">DCH-32</SelectItem>
                          <SelectItem value="lra5166">LRA-5166</SelectItem>
                        </>
                      )}
                      {cropType === 'sugarcane' && (
                        <>
                          <SelectItem value="co86032">Co-86032</SelectItem>
                          <SelectItem value="co0238">Co-0238</SelectItem>
                          <SelectItem value="coc671">CoC-671</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm-size">Farm Size (Hectares): {farmSize}</Label>
                  <Slider
                    id="farm-size"
                    min={1}
                    max={50}
                    step={1}
                    value={[farmSize]}
                    onValueChange={(value) => setFarmSize(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fertilizer">Fertilizer Application (%): {fertilizer}</Label>
                  <Slider
                    id="fertilizer"
                    min={0}
                    max={100}
                    step={5}
                    value={[fertilizer]}
                    onValueChange={(value) => setFertilizer(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pesticide">Pesticide Application (%): {pesticide}</Label>
                  <Slider
                    id="pesticide"
                    min={0}
                    max={100}
                    step={5}
                    value={[pesticide]}
                    onValueChange={(value) => setPesticide(value[0])}
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
              <Cloud className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Yield Prediction</h2>
              <p className="text-center text-muted-foreground mb-6">
                Enter your farm details and click Generate Prediction to see yield forecasts based on our AI model.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <BarChart3 className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-center">Historical yield analysis</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <LineChart className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-center">Future yield projections</p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Yield Prediction Results</CardTitle>
                    <Button variant="outline" size="sm" onClick={resetForm}>
                      New Prediction
                    </Button>
                  </div>
                  <CardDescription>
                    Based on your inputs and historical data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2 text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Expected Yield</p>
                      <p className="text-3xl font-bold text-primary">
                        {predictionResults[cropType as keyof typeof predictionResults].expectedYield}
                        <span className="text-base font-normal"> t/ha</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Range: {predictionResults[cropType as keyof typeof predictionResults].yieldRange[0]} - {predictionResults[cropType as keyof typeof predictionResults].yieldRange[1]} t/ha
                      </p>
                    </div>

                    <div className="space-y-2 text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Production</p>
                      <p className="text-3xl font-bold text-primary">
                        {(predictionResults[cropType as keyof typeof predictionResults].expectedYield * farmSize).toFixed(1)}
                        <span className="text-base font-normal"> tonnes</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        For {farmSize} hectares of land
                      </p>
                    </div>

                    <div className="space-y-2 text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Confidence Level</p>
                      <p className="text-3xl font-bold text-primary">
                        {predictionResults[cropType as keyof typeof predictionResults].confidenceLevel}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Based on model accuracy
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Key Factors Affecting Yield</h3>
                    <div className="space-y-3">
                      {predictionResults[cropType as keyof typeof predictionResults].factors.map((factor, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{factor.name}</p>
                            <p className="text-xs text-muted-foreground">Impact: {factor.impact}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm">{factor.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={generatePDF}
                    disabled={!isClient}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Historical Yield Comparison</CardTitle>
                  <CardDescription>
                    Your predicted yield compared to historical data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      [Chart visualization would appear here showing historical yield data and the current prediction]
                    </p>
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
