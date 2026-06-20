'use client';

import { useState, useCallback, useEffect } from 'react';
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
  Leaf,
  Download
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
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadPDF = async () => {
    if (!result || !isClient) return;

    try {
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Colors
      const primaryColor = '#15803d'; // Forest Green
      const secondaryColor = '#0f172a'; // Slate-900 (Dark Slate)
      const lightBgColor = '#f8fafc'; // Slate-50
      const accentColor = '#b91c1c'; // Red-700 for Critical

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Vertical cursor
      let y = 25;

      // Header Banner
      doc.setFillColor(primaryColor);
      doc.rect(0, 0, pageWidth, 40, 'F');

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor('#ffffff');
      doc.text('BHUDHAN CROP DIAGNOSIS REPORT', margin, 20);

      // Subtitle / Date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor('#e2e8f0');
      const dateStr = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      doc.text(`Generated on: ${dateStr}`, margin, 30);

      y = 55;

      // Card for Main Result
      doc.setFillColor(lightBgColor);
      doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'F');
      
      // Analysis Complete badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryColor);
      doc.text('DIAGNOSIS RESULT:', margin + 8, y + 8);

      // Disease Name
      doc.setFontSize(18);
      doc.setTextColor(secondaryColor);
      doc.text(`${result.disease} Detected`, margin + 8, y + 18);

      // Match / Confidence
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#1e293b');
      doc.text(`Confidence Match: `, margin + 8, y + 26);
      doc.setFont('helvetica', 'normal');
      doc.text(`${result.confidence.toFixed(1)}%`, margin + 46, y + 26);

      // Severity & Spread Risk
      const severity = result.confidence > 80 ? 'CRITICAL' : 'MODERATE';
      doc.setFont('helvetica', 'bold');
      doc.text(`Severity: `, margin + 95, y + 26);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(severity === 'CRITICAL' ? accentColor : '#d97706');
      doc.text(severity, margin + 113, y + 26);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#1e293b');
      doc.text(`Spread Risk: `, margin + 140, y + 26);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(accentColor);
      doc.text('HIGH', margin + 165, y + 26);

      // Add Uploaded Image if available
      if (image) {
        try {
          const imgWidth = 60;
          const imgHeight = 45;
          const imgX = (pageWidth - imgWidth) / 2;
          const imgY = y + 36;
          
          doc.addImage(image, 'JPEG', imgX, imgY, imgWidth, imgHeight);
          
          // Draw a border around the image
          doc.setDrawColor('#cbd5e1');
          doc.setLineWidth(0.5);
          doc.rect(imgX, imgY, imgWidth, imgHeight);
          
          y += 55; // Adjust y to accommodate the image
        } catch (imgError) {
          console.warn('Could not add uploaded image to PDF:', imgError);
          y += 36; // standard spacer if image fails
        }
      } else {
        y += 36; // standard spacer if no image
      }

      y += 10;

      // Section Helper
      const addSectionHeader = (title: string) => {
        if (y > pageHeight - 30) {
          doc.addPage();
          y = 25;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text(title, margin, y);
        y += 4;
        doc.setDrawColor('#cbd5e1');
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 8;
      };

      // Wrap Text Helper
      const addWrappedText = (text: string, fontSize: number, style: 'normal' | 'bold' | 'italic' = 'normal', color: string = '#334155') => {
        doc.setFont('helvetica', style);
        doc.setFontSize(fontSize);
        doc.setTextColor(color);
        const lines = doc.splitTextToSize(text, contentWidth);
        lines.forEach((line: string) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 25;
          }
          doc.text(line, margin, y);
          y += 6;
        });
        y += 2; // extra spacing
      };

      // 1. Description
      addSectionHeader('Disease Description');
      addWrappedText(result.description, 11, 'normal', '#334155');

      // 2. Treatment
      addSectionHeader('Immediate Actions & Treatment');
      addWrappedText(result.treatment, 11, 'italic', '#1e3a8a'); // Dark blue for treatment text
      y += 2;

      // Steps
      const steps = [
        "Remove and destroy all infected plant parts immediately.",
        "Apply recommended fungicide containing copper or chlorothalonil according to package instructions.",
        "Ensure proper ventilation and spacing around plants to reduce humidity.",
        "Monitor plants regularly (especially early morning) for new symptoms.",
        "Avoid overhead watering to prevent spore dispersal."
      ];
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(secondaryColor);
      doc.text('Step-by-step Treatment Protocol:', margin, y);
      y += 8;

      steps.forEach((step, i) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 25;
        }
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor);
        doc.text(`0${i + 1}`, margin, y);
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#334155');
        const stepLines = doc.splitTextToSize(step, contentWidth - 12);
        stepLines.forEach((line: string) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 25;
          }
          doc.text(line, margin + 10, y);
          y += 6;
        });
        y += 2;
      });

      y += 4;

      // 3. Prevention
      addSectionHeader('Long-term Prevention & Protection');
      addWrappedText(result.prevention, 11, 'normal', '#334155');

      const preventionItems = [
        "Practice crop rotation (3-4 year cycle for solanaceous crops).",
        "Use certified disease-resistant crop varieties.",
        "Maintain proper plant spacing for air circulation.",
        "Apply preventive fungicides before humid/rainy weather sets in.",
        "Keep garden entirely clean of crop residue and plant debris.",
        "Utilize drip irrigation instead of overhead watering systems."
      ];

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(secondaryColor);
      doc.text('Best Preventive Practices:', margin, y);
      y += 8;

      preventionItems.forEach((item) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 25;
        }
        // Draw bullet point
        doc.setFillColor(primaryColor);
        doc.circle(margin + 2, y - 1.5, 1, 'F');
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#334155');
        const itemLines = doc.splitTextToSize(item, contentWidth - 10);
        itemLines.forEach((line: string) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 25;
          }
          doc.text(line, margin + 8, y);
          y += 6;
        });
        y += 2;
      });

      y += 6;

      // Disclaimer
      if (y > pageHeight - 35) {
        doc.addPage();
        y = 25;
      }
      doc.setFillColor('#fffbeb'); // Amber-50
      doc.setDrawColor('#fef3c7'); // Amber-100
      doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor('#92400e'); // Amber-800
      doc.text('ADVISORY NOTICE:', margin + 6, y + 7);
      
      doc.setFont('helvetica', 'normal');
      const disclaimerText = 'AI diagnosis is an advisory tool. For commercial operations, please cross-verify with a local agricultural extension officer or agronomist.';
      const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 12);
      let disclaimerY = y + 12;
      disclaimerLines.forEach((line: string) => {
        doc.text(line, margin + 6, disclaimerY);
        disclaimerY += 4.5;
      });

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor('#94a3b8');
        doc.text('BhuDhan - Where Intelligence Meets Agriculture', margin, pageHeight - 10);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 15, pageHeight - 10);
      }

      // Save Document
      doc.save(`BhuDhan_Diagnosis_Report_${result.disease.replace(/\s+/g, '_')}.pdf`);
      toast.success('Report downloaded successfully as PDF');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      toast.error('Failed to generate PDF report');
    }
  };

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
    <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-0">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-green-800 dark:text-green-400">Crop Health Diagnosis</h2>
        <p className="text-muted-foreground text-lg">
          Powered by AI to help you identify and treat plant diseases early.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden border-none shadow-xl bg-white dark:bg-slate-900/50 backdrop-blur-sm ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader className="bg-green-50/50 dark:bg-green-950/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Camera className="h-5 w-5 text-green-700 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-xl text-green-900 dark:text-green-100">Upload Plant Image</CardTitle>
                  <CardDescription className="dark:text-slate-400">
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
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20 scale-[1.01]' 
                    : 'border-muted-foreground/20 dark:border-slate-700 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50/10 dark:hover:bg-green-900/10'
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
                      <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                        <Upload className="h-10 w-10" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 dark:text-slate-200">
                        {isDragActive ? 'Drop your photo here' : 'Select a leaf or plant part photo'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                        Drag and drop your image here, or click to browse files
                      </p>
                      <div className="flex gap-4 text-xs font-medium text-muted-foreground mt-2">
                        <span className="bg-muted dark:bg-slate-800 px-2 py-1 rounded">JPG / PNG</span>
                        <span className="bg-muted dark:bg-slate-800 px-2 py-1 rounded">MAX 5MB</span>
                        <span className="bg-muted dark:bg-slate-800 px-2 py-1 rounded">WEBP</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 dark:bg-slate-900/50 flex justify-between gap-4 p-4 border-t dark:border-slate-800">
              <Button 
                variant="ghost" 
                onClick={resetTool} 
                disabled={!image || isAnalyzing}
                className="hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 font-medium"
              >
                Reset Progress
              </Button>
              <Button 
                onClick={analyzeImage} 
                disabled={!image || isAnalyzing}
                className={`relative px-8 h-12 rounded-xl transition-all ${
                  !image || isAnalyzing 
                    ? 'bg-muted text-muted-foreground' 
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 dark:shadow-none hover:shadow-green-300'
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
                <Card className="border-none shadow-2xl overflow-hidden ring-1 ring-green-100 dark:ring-green-900/30 bg-white dark:bg-slate-900">
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
                      <TabsList className="w-full h-14 grid grid-cols-3 rounded-none bg-muted/20 dark:bg-slate-800/50">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 h-full font-semibold">
                          <Info className="h-4 w-4 mr-2" />
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="treatment" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 h-full font-semibold">
                          <Zap className="h-4 w-4 mr-2" />
                          Treatment
                        </TabsTrigger>
                        <TabsTrigger value="prevention" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400 h-full font-semibold">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Prevention
                        </TabsTrigger>
                      </TabsList>

                      <div className="p-6">
                        <TabsContent value="overview" className="mt-0 space-y-6">
                          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100/50 dark:border-amber-900/20">
                            <h3 className="text-amber-900 dark:text-amber-400 font-bold flex items-center gap-2 mb-2">
                              <Leaf className="h-4 w-4" />
                              Disease Description
                            </h3>
                            <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed font-medium">{result.description}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-widest">Severity</h4>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  result.confidence > 80 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                }`}>
                                  {result.confidence > 80 ? 'CRITICAL' : 'MODERATE'}
                                </span>
                              </div>
                              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-inner mb-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.confidence}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={`h-full rounded-full ${result.confidence > 80 ? 'bg-red-500' : 'bg-orange-500'}`}
                                />
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Based on leaf discoloration patterns</p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-widest">Spread Risk</h4>
                                <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-bold px-2 py-0.5 rounded-full">HIGH RISK</span>
                              </div>
                              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-inner mb-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: "85%" }}
                                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                  className="h-full bg-red-400 rounded-full"
                                />
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Fast transmission in current weather</p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="treatment" className="mt-0">
                          <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-6">
                            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2">
                              <Zap className="h-5 w-5 fill-blue-500 text-blue-500" />
                              Immediate Actions
                            </h3>
                            <p className="text-blue-800 dark:text-blue-200/80 mb-6 bg-white/40 dark:bg-slate-900/40 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/30 italic">
                              "{result.treatment}"
                            </p>

                            <div className="space-y-4">
                              <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                                Step-by-step application
                              </h4>
                              <div className="grid gap-3">
                                {[
                                  "Remove and destroy all infected plant parts immediately",
                                  "Apply recommended fungicide according to package instructions",
                                  "Ensure proper ventilation around plants",
                                  "Monitor plants regularly for new symptoms",
                                  "Avoid overhead watering to prevent spread"
                                ].map((step, i) => (
                                  <div key={i} className="flex gap-3 text-sm text-blue-800 dark:text-blue-200/70 bg-white/30 dark:bg-slate-800/30 p-3 rounded-lg border border-blue-100/30 dark:border-blue-900/20">
                                    <span className="font-bold text-blue-400 dark:text-blue-500">0{i + 1}</span>
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 p-4 text-xs font-medium text-amber-900 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/20">
                              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                              <p>AI diagnosis is an advisory tool. For commercial operations, please cross-verify with a local agricultural extension officer.</p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="prevention" className="mt-0">
                          <div className="rounded-2xl bg-green-50/70 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-6">
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-4 flex items-center gap-2">
                              <ShieldCheck className="h-5 w-5 fill-green-500 text-green-500" />
                              Long-term Protection
                            </h3>
                            <p className="text-green-800 dark:text-green-200/80 mb-6 bg-white/40 dark:bg-slate-900/40 p-4 rounded-xl border border-green-200/50 dark:border-green-800/30">
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
                                <div key={i} className="flex items-center gap-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-green-100 dark:border-green-900/30 text-sm text-green-800 dark:text-green-200/70">
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
                  <CardFooter className="bg-muted/10 dark:bg-slate-900/30 flex justify-end gap-4 p-6 border-t border-slate-100 dark:border-slate-800/80">
                    <Button 
                      onClick={handleDownloadPDF}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-green-200 dark:shadow-none transition-all flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-semibold"
                    >
                      <Download className="h-5 w-5" />
                      Download Report (PDF)
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl bg-white dark:bg-slate-900/50 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20">
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
                Tips for Best Accuracy
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                AI works best when you provide high-quality data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
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

          <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
            <h4 className="font-bold text-green-900 dark:text-green-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Privacy Note
            </h4>
            <p className="text-xs text-green-800 dark:text-green-200/60 leading-relaxed font-medium">
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
    <div className="flex gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 border border-slate-100 dark:border-slate-800 group">
      <div className="shrink-0 p-2 bg-white dark:bg-slate-900 rounded-lg h-fit shadow-sm group-hover:bg-green-100 dark:group-hover:bg-green-800/50 transition-colors">
        <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <h5 className="font-bold text-sm text-slate-900 dark:text-slate-200 mb-0.5">{title}</h5>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

