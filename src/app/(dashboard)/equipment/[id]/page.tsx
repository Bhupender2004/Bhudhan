import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Equipment Details',
  description: 'View details of agricultural equipment',
};

// This would normally come from a database
const getEquipmentById = (id: string) => {
  const equipment = {
    id,
    name: id === '1' ? 'John Deere 5050D Tractor' :
          id === '2' ? 'Mahindra 575 DI Tractor' :
          id === '3' ? 'New Holland TC5.30 Harvester' :
          id === '4' ? 'Fieldking Reversible Plough' :
          id === '5' ? 'Aspee HTP Power Sprayer' :
          id === '6' ? 'Sonalika Rotavator' : 'Unknown Equipment',
    description: id === '1' ? '50 HP tractor with 4-wheel drive, perfect for medium-sized farms. Features include power steering, oil immersed brakes, and a comfortable cabin with AC.' :
                 id === '2' ? '45 HP tractor with power steering and oil immersed brakes. Ideal for small to medium farms with versatile applications.' :
                 id === '3' ? 'Advanced harvester with 130 HP engine and 3500L grain tank. Perfect for large-scale harvesting operations.' :
                 id === '4' ? '3-bottom hydraulic reversible plough for deep tilling. Suitable for various soil types and conditions.' :
                 id === '5' ? 'High-pressure sprayer with 100L tank capacity. Efficient for pest control and fertilizer application.' :
                 id === '6' ? '5 feet rotavator with 42 blades for efficient soil preparation. Durable construction for long-lasting performance.' : 'No description available',
    price: id === '1' ? 750000 :
           id === '2' ? 650000 :
           id === '3' ? 1800000 :
           id === '4' ? 85000 :
           id === '5' ? 12000 :
           id === '6' ? 75000 : 0,
    category: id === '1' || id === '2' ? 'tractor' :
              id === '3' ? 'harvester' :
              id === '4' || id === '6' ? 'plough' :
              id === '5' ? 'sprayer' : 'other',
    images: [
      `https://placehold.co/600x400/e2f0d9/1d6f42?text=${encodeURIComponent(id === '1' ? 'John Deere 5050D' :
                                                                             id === '2' ? 'Mahindra 575DI' :
                                                                             id === '3' ? 'New Holland TC5.30' :
                                                                             id === '4' ? 'Fieldking Plough' :
                                                                             id === '5' ? 'Aspee Sprayer' :
                                                                             id === '6' ? 'Sonalika Rotavator' : 'Equipment')}`,
      `https://placehold.co/600x400/e2f0d9/1d6f42?text=${encodeURIComponent(id === '1' ? 'John Deere Side View' :
                                                                             id === '2' ? 'Mahindra Side View' :
                                                                             id === '3' ? 'New Holland Side View' :
                                                                             id === '4' ? 'Fieldking Side View' :
                                                                             id === '5' ? 'Aspee Side View' :
                                                                             id === '6' ? 'Sonalika Side View' : 'Equipment Side View')}`,
      `https://placehold.co/600x400/e2f0d9/1d6f42?text=${encodeURIComponent(id === '1' ? 'John Deere Interior' :
                                                                             id === '2' ? 'Mahindra Dashboard' :
                                                                             id === '3' ? 'New Holland Cabin' :
                                                                             id === '4' ? 'Fieldking Detail' :
                                                                             id === '5' ? 'Aspee Nozzle' :
                                                                             id === '6' ? 'Sonalika Blades' : 'Equipment Detail')}`
    ],
    seller: {
      name: id === '1' || id === '3' ? 'Farm Equipment Ltd.' :
            id === '2' || id === '6' ? 'Agro Machinery' :
            id === '4' ? 'Soil Masters' :
            id === '5' ? 'Crop Care Solutions' : 'Unknown Seller',
      contact: '+91 9876543210',
      address: 'Agricultural Market, Sector 10, Delhi NCR',
      rating: 4.5,
      reviewCount: 120,
      email: id === '1' || id === '3' ? 'contact@farmequipment.com' :
             id === '2' || id === '6' ? 'info@agromachinery.com' :
             id === '4' ? 'hello@soilmasters.com' :
             id === '5' ? 'support@cropcare.com' : 'info@seller.com',
      website: id === '1' || id === '3' ? 'https://farmequipment.com' :
               id === '2' || id === '6' ? 'https://agromachinery.com' :
               id === '4' ? 'https://soilmasters.com' :
               id === '5' ? 'https://cropcare.com' : undefined,
      established: id === '1' || id === '3' ? '1998' :
                  id === '2' || id === '6' ? '2005' :
                  id === '4' ? '2010' :
                  id === '5' ? '2015' : undefined
    },
    specifications: {
      'Engine Power': id === '1' ? '50 HP' : id === '2' ? '45 HP' : id === '3' ? '130 HP' : 'N/A',
      'Fuel Type': id === '1' || id === '2' || id === '3' ? 'Diesel' : 'N/A',
      'Transmission': id === '1' || id === '2' ? '8 Forward + 2 Reverse' : id === '3' ? 'Hydrostatic' : 'N/A',
      'PTO HP': id === '1' ? '45 HP' : id === '2' ? '40 HP' : 'N/A',
      'Lifting Capacity': id === '1' ? '1800 kg' : id === '2' ? '1600 kg' : 'N/A',
      'Tank Capacity': id === '5' ? '100L' : id === '3' ? '3500L' : 'N/A',
      'Working Width': id === '4' ? '3 Bottom' : id === '6' ? '5 feet' : 'N/A',
      'Number of Blades': id === '6' ? '42' : 'N/A',
      'Weight': id === '1' ? '2100 kg' : id === '2' ? '1950 kg' : id === '3' ? '8500 kg' : id === '4' ? '450 kg' : id === '5' ? '25 kg' : id === '6' ? '380 kg' : 'N/A',
      'Warranty': '1 Year'
    },
    rentalAvailable: id === '1' || id === '2' || id === '3' || id === '4' || id === '5' ? true : false,
    leaseAvailable: id === '1' || id === '3' ? true : false,
    rentalPrice: id === '1' ? 5000 : id === '2' ? 4500 : id === '3' ? 15000 : id === '4' ? 1000 : id === '5' ? 500 : 0,
    leasePrice: id === '1' ? 25000 : id === '3' ? 60000 : 0,
    condition: id === '1' || id === '3' ? 'New' : 'Used',
    yearOfManufacture: id === '1' || id === '3' ? 2023 : 2020
  };

  return equipment;
};

export default async function EquipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params in Next.js 15
  const { id } = await params;
  const equipment = getEquipmentById(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/equipment">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{equipment.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Image and Gallery */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={equipment.images[0]}
              alt={equipment.name}
              className="h-full w-full object-cover transition-transform hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {equipment.images.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-lg border">
                <Image
                  src={image}
                  alt={`${equipment.name} view ${index + 2}`}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Details */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-3xl font-bold">₹{equipment.price.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">
                  {equipment.condition} • Manufactured {equipment.yearOfManufacture}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="capitalize">{equipment.category}</Badge>
                {equipment.rentalAvailable && (
                  <Badge variant="secondary">
                    Rental: ₹{equipment.rentalPrice.toLocaleString('en-IN')}/day
                  </Badge>
                )}
                {equipment.leaseAvailable && (
                  <Badge variant="secondary">
                    Lease: ₹{equipment.leasePrice.toLocaleString('en-IN')}/month
                  </Badge>
                )}
              </div>

              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{equipment.seller.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{equipment.seller.rating}</span>
                        <span className="text-muted-foreground">({equipment.seller.reviewCount} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{equipment.seller.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{equipment.seller.contact}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a href={`mailto:${equipment.seller.email || 'info@seller.com'}`} className="text-sm text-primary hover:underline">
                        {equipment.seller.email || 'info@seller.com'}
                      </a>
                    </div>

                    {equipment.seller.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a href={equipment.seller.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          {equipment.seller.website.replace('https://', '')}
                        </a>
                      </div>
                    )}

                    {equipment.seller.established && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">Established: {equipment.seller.established}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Button>Contact Seller</Button>
                <Button variant="outline">Book Inspection</Button>
                {equipment.rentalAvailable && (
                  <Button variant="outline">Rent Now</Button>
                )}
                {equipment.leaseAvailable && (
                  <Button variant="outline">Lease Options</Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold">Seller Information</h3>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">
                    {equipment.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{equipment.seller.name}</p>
                  <p className="text-sm text-muted-foreground">Verified Seller</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>{equipment.seller.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>contact@{equipment.seller.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Member since 2020</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Typically responds within 24 hours</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="financing">Financing Options</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-4 border rounded-md mt-2">
          <p>{equipment.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(equipment.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-medium">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="financing" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Purchase Options</h3>
              <p className="text-sm text-muted-foreground">
                Full payment or EMI options available through our financing partners.
              </p>
              <div className="mt-2 p-3 bg-primary/5 rounded-md">
                <p className="font-medium">EMI starting at ₹{Math.round(equipment.price / 36).toLocaleString('en-IN')}/month*</p>
                <p className="text-xs text-muted-foreground">*For 36 months tenure with approved credit</p>
              </div>
            </div>

            {equipment.rentalAvailable && (
              <div>
                <h3 className="font-semibold text-lg">Rental Options</h3>
                <p className="text-sm text-muted-foreground">
                  Rent on a daily, weekly, or monthly basis.
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="p-3 bg-primary/5 rounded-md">
                    <p className="font-medium">₹{equipment.rentalPrice.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">Daily</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-md">
                    <p className="font-medium">₹{(equipment.rentalPrice * 6).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">Weekly</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-md">
                    <p className="font-medium">₹{(equipment.rentalPrice * 22).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">Monthly</p>
                  </div>
                </div>
              </div>
            )}

            {equipment.leaseAvailable && (
              <div>
                <h3 className="font-semibold text-lg">Lease Options</h3>
                <p className="text-sm text-muted-foreground">
                  Long-term leasing with maintenance included.
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="p-3 bg-primary/5 rounded-md">
                    <p className="font-medium">₹{equipment.leasePrice.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">Monthly</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-md">
                    <p className="font-medium">₹{(equipment.leasePrice * 11).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">Yearly</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-md">
                    <p className="font-medium">₹{(equipment.leasePrice * 30).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">3 Years</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-xl font-semibold mb-4">Similar Equipment</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].filter(itemId => itemId.toString() !== id).slice(0, 3).map((itemId) => {
            const item = getEquipmentById(itemId.toString());
            return (
              <Card key={itemId} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 capitalize">{item.category}</Badge>
                  <Link href={`/equipment/${id}`}>
                    <h3 className="mb-1 line-clamp-1 text-lg font-semibold hover:underline">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">{item.condition}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
