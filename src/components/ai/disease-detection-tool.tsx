'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2, 
  Upload, 
  Check, 
  AlertCircle, 
  Camera, 
  ScanSearch, 
  Rotate3d, 
  Sun, 
  ZoomIn, 
  Trash2, 
  Info,
  ShieldCheck,
  Zap,
  Leaf
} from 'lucide-react';
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
      // Mock result (simulating API response)
      await new Promise(resolve => setTimeout(resolve, 3000));

      setResult({
        disease: 'Late Blight',
        confidence: 92.5,
        description: 'Late blight is a plant disease caused by the oomycete pathogen Phytophthora infestans. It primarily affects potatoes and tomatoes, causing significant crop losses worldwide.',
        treatment: 'Apply fungicides containing copper or chlorothalonil as soon as symptoms are detected. Remove and destroy infected plant parts. In severe cases, remove entire plants to prevent spread.',
        prevention: 'Plant resistant varieties. Ensure good air circulation by proper spacing. Avoid overhead irrigation. Practice crop rotation. Apply preventive fungicides during humid weather conditions.'
      });

      toast.success('Disease detection completed successfully');
    } catch {
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
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-green-800">Crop Health Diagnosis</h2>
        <p className="text-muted-foreground text-lg">
          Powered by AI to help you identify and treat plant diseases early.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden border-none shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader className="bg-green-50/50 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Camera className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <CardTitle className="text-xl text-green-900">Upload Plant Image</CardTitle>
                  <CardDescription>
                    Highest accuracy with sharp, well-lit photos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div
                {...getRootProps()}
                className={`group relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center ${
                  isDragActive 
                    ? 'border-green-500 bg-green-50/50 scale-[1.01]' 
                    : 'border-muted-foreground/20 hover:border-green-400 hover:bg-green-50/10'
                }`}
              >
                <input {...getInputProps()} />
                
                <AnimatePresence mode="wait">
                  {image ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative h-72 w-full max-w-md overflow-hidden rounded-xl shadow-2xl"
                    >
                      <Image
                        src={image}
                        alt="Uploaded plant"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                          Click or drag to change image
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 rounded-full h-8 w-8 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetTool();
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-8"
                    >
                      <div className="mb-4 p-4 bg-green-50 rounded-full text-green-600 group-hover:scale-110 transition-transform">
                        <Upload className="h-10 w-10" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {isDragActive ? 'Drop your photo here' : 'Select a leaf or plant part photo'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                        Drag and drop your image here, or click to browse files
                      </p>
                      <div className="flex gap-4 text-xs font-medium text-muted-foreground mt-2">
                        <span className="bg-muted px-2 py-1 rounded">JPG / PNG</span>
                        <span className="bg-muted px-2 py-1 rounded">MAX 5MB</span>
                        <span className="bg-muted px-2 py-1 rounded">WEBP</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-between gap-4 p-4 border-t">
              <Button 
                variant="ghost" 
                onClick={resetTool} 
                disabled={!image || isAnalyzing}
                className="hover:bg-red-50 hover:text-red-600 font-medium"
              >
                Reset Progress
              </Button>
              <Button 
                onClick={analyzeImage} 
                disabled={!image || isAnalyzing}
                className={`relative px-8 h-12 rounded-xl transition-all ${
                  !image || isAnalyzing 
                    ? 'bg-muted text-muted-foreground' 
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 hover:shadow-green-300'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing DNA...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 fill-current" />
                    <span className="font-bold">Start AI Analysis</span>
                  </div>
                )}
              </Button>
            </CardFooter>
          </Card>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="border-none shadow-2xl overflow-hidden ring-1 ring-green-100">
                  <header className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                          <Check className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-green-100 text-sm font-medium uppercase tracking-wider">Analysis Complete</p>
                          <h2 className="text-2xl font-bold">{result.disease} Detected</h2>
                        </div>
                      </div>
                      <div className="bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-md font-bold text-lg">
                        {result.confidence.toFixed(1)}% <span className="text-sm font-normal text-green-100">Match</span>
                      </div>
                    </div>
                  </header>
                  
                  <CardContent className="p-0">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="w-full h-14 grid grid-cols-3 rounded-none bg-muted/20">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-green-700 h-full font-semibold">
                          <Info className="h-4 w-4 mr-2" />
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="treatment" className="data-[state=active]:bg-white data-[state=active]:text-green-700 h-full font-semibold">
                          <Zap className="h-4 w-4 mr-2" />
                          Treatment
                        </TabsTrigger>
                        <TabsTrigger value="prevention" className="data-[state=active]:bg-white data-[state=active]:text-green-700 h-full font-semibold">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Prevention
                        </TabsTrigger>
                      </TabsList>

                      <div className="p-6">
                        <TabsContent value="overview" className="mt-0 space-y-6">
                          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100/50">
                            <h3 className="text-amber-900 font-bold flex items-center gap-2 mb-2">
                              <Leaf className="h-4 w-4" />
                              Disease Description
                            </h3>
                            <p className="text-amber-800 leading-relaxed leading-relaxed">{result.description}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Severity</h4>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  result.confidence > 80 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                  {result.confidence > 80 ? 'CRITICAL' : 'MODERATE'}
                                </span>
                              </div>
                              <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden shadow-inner mb-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.confidence}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={`h-full rounded-full ${result.confidence > 80 ? 'bg-red-500' : 'bg-orange-500'}`}
                                />
                              </div>
                              <p className="text-xs text-slate-500">Based on leaf discoloration patterns</p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Spread Risk</h4>
                                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">HIGH RISK</span>
                              </div>
                              <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden shadow-inner mb-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: "85%" }}
                                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                  className="h-full bg-red-400 rounded-full"
                                />
                              </div>
                              <p className="text-xs text-slate-500">Fast transmission in current weather</p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="treatment" className="mt-0">
                          <div className="rounded-2xl bg-blue-50/70 border border-blue-100 p-6">
                            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                              <Zap className="h-5 w-5 fill-blue-500 text-blue-500" />
                              Immediate Actions
                            </h3>
                            <p className="text-blue-800 mb-6 bg-white/40 p-4 rounded-xl border border-blue-200/50 italic">
                              "{result.treatment}"
                            </p>

                            <div className="space-y-4">
                              <h4 className="font-bold text-blue-900 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                step-by-step application
                              </h4>
                              <div className="grid gap-3">
                                {[
                                  "Remove and destroy all infected plant parts immediately",
                                  "Apply recommended fungicide according to package instructions",
                                  "Ensure proper ventilation around plants",
                                  "Monitor plants regularly for new symptoms",
                                  "Avoid overhead watering to prevent spread"
                                ].map((step, i) => (
                                  <div key={i} className="flex gap-3 text-sm text-blue-800 bg-white/30 p-3 rounded-lg border border-blue-100/30">
                                    <span className="font-bold text-blue-400">0{i + 1}</span>
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 rounded-xl bg-amber-50/50 p-4 text-xs font-medium text-amber-900 border border-amber-200/50">
                              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                              <p>AI diagnosis is an advisory tool. For commercial operations, please cross-verify with a local agricultural extension officer.</p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="prevention" className="mt-0">
                          <div className="rounded-2xl bg-green-50/70 border border-green-100 p-6">
                            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                              <ShieldCheck className="h-5 w-5 fill-green-500 text-green-500" />
                              Long-term Protection
                            </h3>
                            <p className="text-green-800 mb-6 bg-white/40 p-4 rounded-xl border border-green-200/50">
                              {result.prevention}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-3">
                              {[
                                "Practice crop rotation (3-4 year cycle)",
                                "Use disease-resistant varieties",
                                "Maintain proper plant spacing",
                                "Apply preventive fungicides",
                                "Keep garden clean of plant debris",
                                "Use drip irrigation"
                              ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-white/50 rounded-xl border border-green-100 text-sm text-green-800">
                                  <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-200" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Info className="h-5 w-5 text-green-400" />
                Tips for Best Accuracy
              </CardTitle>
              <CardDescription className="text-slate-400">
                AI works best when you provide high-quality data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid gap-3">
                <TipItem 
                  icon={Camera} 
                  title="Lighting" 
                  desc="Take photos in bright, natural light. Avoid flash." 
                />
                <TipItem 
                  icon={ScanSearch} 
                  title="Context" 
                  desc="Include both healthy and diseased area." 
                />
                <TipItem 
                  icon={Rotate3d} 
                  title="Multi-Angle" 
                  desc="Different angles help identify hidden pests." 
                />
                <TipItem 
                  icon={Sun} 
                  title="No Glare" 
                  desc="Avoid harsh shadows or blurry reflections." 
                />
                <TipItem 
                  icon={ZoomIn} 
                  title="Focus" 
                  desc="Take close-ups of specific leaf symptoms." 
                />
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
            <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Privacy Note
            </h4>
            <p className="text-xs text-green-800 leading-relaxed">
              Your uploaded images are processed locally for analysis and are not permanently stored on our public servers without consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TipItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
      <div className="shrink-0 p-2 bg-green-500/20 rounded-lg h-fit">
        <Icon className="h-5 w-5 text-green-400" />
      </div>
      <div>
        <h5 className="font-bold text-sm text-white mb-0.5">{title}</h5>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

