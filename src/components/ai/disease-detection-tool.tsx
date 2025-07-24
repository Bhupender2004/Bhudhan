'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Upload, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/lib/utils/toast';

interface DetectionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  prevention: string;
}

export default function DiseaseDetectionTool() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
      setResult(null);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const analyzeImage = async () => {
    if (!image) return;

    setIsAnalyzing(true);

    try {
      // In a production app, we would use TensorFlow.js for image analysis
      // and/or OpenAI's API for detailed information
      // import { analyzeCropDisease } from '@/lib/api/openai';

      // 1. First, we would analyze the image with a TensorFlow model
      // const tfModel = await tf.loadGraphModel('/models/plant_disease/model.json');
      // const tensor = tf.browser.fromPixels(imageRef.current)
      //   .resizeNearestNeighbor([224, 224])
      //   .toFloat()
      //   .expandDims();
      // const prediction = await tfModel.predict(tensor);
      // const diseaseClass = getDiseaseFromPrediction(prediction);

      // 2. Then get detailed information using OpenAI
      // const diseaseInfo = await analyzeCropDisease('tomato', diseaseClass);

      // For demo purposes, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock result (simulating API response)
      setResult({
        disease: 'Late Blight',
        confidence: 92.5,
        description: 'Late blight is a plant disease caused by the oomycete pathogen Phytophthora infestans. It primarily affects potatoes and tomatoes, causing significant crop losses worldwide.',
        treatment: 'Apply fungicides containing copper or chlorothalonil as soon as symptoms are detected. Remove and destroy infected plant parts. In severe cases, remove entire plants to prevent spread.',
        prevention: 'Plant resistant varieties. Ensure good air circulation by proper spacing. Avoid overhead irrigation. Practice crop rotation. Apply preventive fungicides during humid weather conditions.'
      });

      toast.success('Disease detection completed successfully');
    } catch (error) {
      // Disease detection error occurred
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetTool = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Plant Image</CardTitle>
          <CardDescription>
            Upload a clear image of the affected plant part (leaf, stem, fruit, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
            }`}
          >
            <input {...getInputProps()} />
            {image ? (
              <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-md">
                <Image
                  src={image}
                  alt="Uploaded plant"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="mb-1 text-sm font-medium">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, WEBP (max 5MB)
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetTool} disabled={!image || isAnalyzing}>
            Reset
          </Button>
          <Button onClick={analyzeImage} disabled={!image || isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Image'
            )}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              Detection Result
            </CardTitle>
            <CardDescription>
              Analysis completed with {result.confidence.toFixed(1)}% confidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-4">
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 text-lg font-medium text-amber-900">
                    {result.disease}
                  </h3>
                  <p className="text-sm text-amber-800">{result.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-100 p-4">
                    <h4 className="mb-1 font-medium">Severity</h4>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {result.confidence > 80 ? 'High' : result.confidence > 50 ? 'Medium' : 'Low'} severity
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-100 p-4">
                    <h4 className="mb-1 font-medium">Spread Risk</h4>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-orange-500"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      High risk of spreading to other plants
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="treatment" className="mt-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 text-lg font-medium text-blue-900">
                    Recommended Treatment
                  </h3>
                  <p className="text-sm text-blue-800">{result.treatment}</p>

                  <div className="mt-4">
                    <h4 className="mb-2 font-medium text-blue-900">Treatment Steps</h4>
                    <ol className="ml-4 list-decimal space-y-2 text-sm text-blue-800">
                      <li>Remove and destroy all infected plant parts immediately</li>
                      <li>Apply recommended fungicide according to package instructions</li>
                      <li>Ensure proper ventilation around plants</li>
                      <li>Monitor plants regularly for new symptoms</li>
                      <li>Avoid overhead watering to prevent spread</li>
                    </ol>
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-md bg-blue-100 p-2 text-sm text-blue-900">
                    <AlertCircle className="h-4 w-4" />
                    <span>Always follow safety instructions when applying treatments</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prevention" className="mt-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <h3 className="mb-2 text-lg font-medium text-green-900">
                    Prevention Measures
                  </h3>
                  <p className="text-sm text-green-800">{result.prevention}</p>

                  <div className="mt-4">
                    <h4 className="mb-2 font-medium text-green-900">Long-term Prevention</h4>
                    <ul className="ml-4 list-disc space-y-2 text-sm text-green-800">
                      <li>Practice crop rotation (3-4 year cycle)</li>
                      <li>Use disease-resistant varieties when available</li>
                      <li>Maintain proper plant spacing for good air circulation</li>
                      <li>Apply preventive fungicides during high-risk periods</li>
                      <li>Keep garden clean of plant debris and weeds</li>
                      <li>Use drip irrigation instead of overhead watering</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tips for Better Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="ml-6 list-disc space-y-2 text-sm">
            <li>Take clear, well-lit photos of the affected plant parts</li>
            <li>Include both healthy and diseased parts in the same image for comparison</li>
            <li>Take multiple photos from different angles for more accurate diagnosis</li>
            <li>Avoid shadows or glare that might obscure symptoms</li>
            <li>For best results, take close-up images that clearly show the symptoms</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
