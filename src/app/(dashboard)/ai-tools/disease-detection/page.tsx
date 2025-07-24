import { Metadata } from 'next';
import DiseaseDetectionTool from '@/components/ai/disease-detection-tool';

export const metadata: Metadata = {
  title: 'Crop Disease Detection',
  description: 'AI-powered tool to identify plant diseases and get treatment recommendations',
};

export default function DiseaseDetectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crop Disease Detection</h1>
        <p className="text-muted-foreground">
          Upload images of your crops to identify diseases and get treatment recommendations
        </p>
      </div>
      
      <DiseaseDetectionTool />
    </div>
  );
}
