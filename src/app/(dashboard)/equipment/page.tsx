import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EquipmentGrid from '@/components/marketplace/equipment-grid';

export const metadata: Metadata = {
  title: 'Agricultural Equipment',
  description: 'Buy, rent or lease agricultural equipment for your farming needs',
};

export default function EquipmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agricultural Equipment</h1>
          <p className="text-muted-foreground">
            Buy, rent or lease agricultural equipment for your farming needs
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/equipment/listings">
            <Button variant="outline">My Listings</Button>
          </Link>
          <Link href="/equipment/add">
            <Button>Add Equipment</Button>
          </Link>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tractor">Tractors</TabsTrigger>
            <TabsTrigger value="harvester">Harvesters</TabsTrigger>
            <TabsTrigger value="plough">Ploughs</TabsTrigger>
            <TabsTrigger value="sprayer">Sprayers</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <EquipmentGrid category="all" />
          </TabsContent>
          <TabsContent value="tractor" className="mt-6">
            <EquipmentGrid category="tractor" />
          </TabsContent>
          <TabsContent value="harvester" className="mt-6">
            <EquipmentGrid category="harvester" />
          </TabsContent>
          <TabsContent value="plough" className="mt-6">
            <EquipmentGrid category="plough" />
          </TabsContent>
          <TabsContent value="sprayer" className="mt-6">
            <EquipmentGrid category="sprayer" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
