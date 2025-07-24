'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/lib/utils/toast';
import Image from 'next/image';

interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: string;
  rentalAvailable: boolean;
  leaseAvailable: boolean;
}

interface EquipmentGridProps {
  category: string;
}

export default function EquipmentGrid({ category }: EquipmentGridProps) {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      setError(null);

      try {
        // In a real implementation, this would be an API call
        // await fetch('/api/equipment?category=' + category)

        // Real equipment data from manufacturers
        const allEquipment = [
          {
            id: '1',
            name: 'John Deere 5050D Tractor',
            description: '50 HP tractor with 4-wheel drive, perfect for medium-sized farms',
            price: 750000,
            category: 'tractor',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=John+Deere+5050D',
            seller: 'John Deere Authorized Dealer',
            sellerInfo: {
              name: 'Tractor Junction',
              address: 'Plot No. 235, Sector 44, Gurugram, Haryana 122003',
              contact: '+91 9876543210',
              email: 'sales@tractorjunction.com',
              website: 'https://www.tractorjunction.com',
              established: 2005,
              rating: 4.8,
              reviewCount: 235
            },
            specifications: {
              'Engine Power': '50 HP',
              'Engine Type': '3-cylinder, water-cooled diesel',
              'Displacement': '2900 cc',
              'Fuel Tank': '60 liters',
              'Transmission': '8 Forward + 2 Reverse',
              'PTO HP': '45 HP',
              'Hydraulic Lift Capacity': '1800 kg',
              'Wheelbase': '2050 mm',
              'Weight': '2100 kg'
            },
            rentalAvailable: true,
            leaseAvailable: true,
            rentalPrice: 5000,
            leasePrice: 25000,
            warranty: '2 years manufacturer warranty',
            financing: 'Available through John Deere Financial',
            stock: 5,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '2',
            name: 'Mahindra 575 DI XP Plus Tractor',
            description: '45 HP tractor with power steering and oil immersed brakes',
            price: 650000,
            category: 'tractor',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Mahindra+575DI',
            seller: 'Mahindra Authorized Dealer',
            sellerInfo: {
              name: 'Shivam Mahindra Tractors',
              address: '42, Industrial Area, Phase II, Chandigarh 160002',
              contact: '+91 9988776655',
              email: 'info@shivammahindra.com',
              website: 'https://www.mahindratractor.com',
              established: 2008,
              rating: 4.6,
              reviewCount: 189
            },
            specifications: {
              'Engine Power': '45 HP',
              'Engine Type': '4-cylinder, direct injection',
              'Displacement': '2730 cc',
              'Fuel Tank': '55 liters',
              'Transmission': '8 Forward + 2 Reverse',
              'PTO HP': '40 HP',
              'Hydraulic Lift Capacity': '1600 kg',
              'Wheelbase': '1970 mm',
              'Weight': '1950 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 4500,
            warranty: '1 year manufacturer warranty',
            financing: 'Available through Mahindra Finance',
            stock: 3,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '3',
            name: 'New Holland TC5.30 Harvester',
            description: 'Advanced harvester with 130 HP engine and 3500L grain tank',
            price: 1800000,
            category: 'harvester',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=New+Holland+TC530',
            seller: 'New Holland Agriculture',
            sellerInfo: {
              name: 'Shri Balaji New Holland',
              address: 'NH-8, Jaipur Road, Ajmer, Rajasthan 305001',
              contact: '+91 9876123450',
              email: 'sales@balajinh.com',
              website: 'https://www.newholland.com',
              established: 2010,
              rating: 4.9,
              reviewCount: 112
            },
            specifications: {
              'Engine Power': '130 HP',
              'Engine Type': '6-cylinder, turbo-charged',
              'Displacement': '6700 cc',
              'Grain Tank Capacity': '3500 liters',
              'Fuel Tank': '400 liters',
              'Transmission': 'Hydrostatic',
              'Cutting Width': '4.5 meters',
              'Threshing System': 'Rotary',
              'Weight': '8500 kg'
            },
            rentalAvailable: true,
            leaseAvailable: true,
            rentalPrice: 15000,
            leasePrice: 60000,
            warranty: '3 years manufacturer warranty',
            financing: 'Available through CNH Industrial Capital',
            stock: 2,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '4',
            name: 'Fieldking Reversible Plough',
            description: '3-bottom hydraulic reversible plough for deep tilling',
            price: 85000,
            category: 'plough',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Fieldking+Plough',
            seller: 'Beri Udyog (Fieldking)',
            sellerInfo: {
              name: 'Beri Udyog Pvt. Ltd.',
              address: 'G.T. Road, Karnal, Haryana 132001',
              contact: '+91 9865432109',
              email: 'info@fieldking.com',
              website: 'https://www.fieldking.com',
              established: 1978,
              rating: 4.5,
              reviewCount: 156
            },
            specifications: {
              'Type': 'Hydraulic Reversible',
              'Number of Bottoms': '3',
              'Working Width': '90 cm',
              'Working Depth': 'Up to 30 cm',
              'HP Required': '45-55 HP',
              'Frame': 'Heavy-duty steel',
              'Bottom Type': 'Curved moldboard',
              'Weight': '450 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 1000,
            warranty: '1 year manufacturer warranty',
            financing: 'Available through dealer',
            stock: 8,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '5',
            name: 'Aspee HTP Power Sprayer',
            description: 'High-pressure sprayer with 100L tank capacity',
            price: 12000,
            category: 'sprayer',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Aspee+Sprayer',
            seller: 'Aspee Agricultural Equipment',
            sellerInfo: {
              name: 'Aspee Agro Equipment Pvt. Ltd.',
              address: 'Plot No. 124, GIDC, Vitthal Udyognagar, Anand, Gujarat 388121',
              contact: '+91 9876543210',
              email: 'sales@aspee.com',
              website: 'https://www.aspee.com',
              established: 1946,
              rating: 4.3,
              reviewCount: 98
            },
            specifications: {
              'Tank Capacity': '100 liters',
              'Pressure': 'Up to 300 PSI',
              'Engine': '2-stroke petrol',
              'Engine Power': '1.8 HP',
              'Spray Range': 'Up to 30 feet',
              'Nozzle Type': 'Adjustable brass',
              'Hose Length': '50 meters',
              'Weight': '25 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 500,
            warranty: '1 year manufacturer warranty',
            financing: 'Available for bulk orders',
            stock: 15,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '6',
            name: 'Sonalika Rotavator',
            description: '5 feet rotavator with 42 blades for efficient soil preparation',
            price: 75000,
            category: 'plough',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Sonalika+Rotavator',
            seller: 'Sonalika International',
            sellerInfo: {
              name: 'Sonalika Tractors',
              address: 'Hoshiarpur Road, Jalandhar, Punjab 144022',
              contact: '+91 8877665544',
              email: 'customercare@sonalika.com',
              website: 'https://www.sonalika.com',
              established: 1969,
              rating: 4.4,
              reviewCount: 132
            },
            specifications: {
              'Working Width': '5 feet (1.5 meters)',
              'Number of Blades': '42',
              'Blade Type': 'L-shaped',
              'Blade Material': 'High carbon steel',
              'Gearbox': 'Oil bath type',
              'HP Required': '40-50 HP',
              'PTO Speed': '540 RPM',
              'Weight': '380 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 800,
            warranty: '1 year manufacturer warranty',
            financing: 'Available through Sonalika Finance',
            stock: 6,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '7',
            name: 'Kubota MU5501 4WD Tractor',
            description: '55 HP tractor with 4-wheel drive and advanced hydraulics',
            price: 850000,
            category: 'tractor',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Kubota+MU5501',
            seller: 'Kubota Agricultural Machinery',
            sellerInfo: {
              name: 'Kubota India',
              address: 'Plot No. 467, Udyog Vihar Phase V, Gurugram, Haryana 122016',
              contact: '+91 9988776655',
              email: 'info@kubotaindia.com',
              website: 'https://www.kubota.co.in',
              established: 2008,
              rating: 4.7,
              reviewCount: 145
            },
            specifications: {
              'Engine Power': '55 HP',
              'Engine Type': '4-cylinder, direct injection, turbocharged',
              'Displacement': '2434 cc',
              'Fuel Tank': '65 liters',
              'Transmission': '8 Forward + 8 Reverse',
              'PTO HP': '48 HP',
              'Hydraulic Lift Capacity': '1900 kg',
              'Wheelbase': '2100 mm',
              'Weight': '2250 kg'
            },
            rentalAvailable: true,
            leaseAvailable: true,
            rentalPrice: 5500,
            leasePrice: 30000,
            warranty: '2 years manufacturer warranty',
            financing: 'Available through Kubota Credit',
            stock: 4,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '8',
            name: 'Claas Crop Tiger 30 Terra Trac Harvester',
            description: 'Compact harvester with 75 HP engine, ideal for small to medium farms',
            price: 1400000,
            category: 'harvester',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Claas+Crop+Tiger',
            seller: 'Claas Agricultural Machinery',
            sellerInfo: {
              name: 'Claas India Pvt. Ltd.',
              address: 'Morinda Road, Chamkaur Sahib, Punjab 140112',
              contact: '+91 9876543210',
              email: 'info@claas.com',
              website: 'https://www.claas.co.in',
              established: 1995,
              rating: 4.8,
              reviewCount: 87
            },
            specifications: {
              'Engine Power': '75 HP',
              'Engine Type': '4-cylinder, turbocharged',
              'Displacement': '3300 cc',
              'Grain Tank Capacity': '2000 liters',
              'Fuel Tank': '130 liters',
              'Transmission': '3-speed mechanical',
              'Cutting Width': '3.0 meters',
              'Threshing System': 'Axial flow',
              'Weight': '4800 kg'
            },
            rentalAvailable: true,
            leaseAvailable: true,
            rentalPrice: 12000,
            leasePrice: 50000,
            warranty: '2 years manufacturer warranty',
            financing: 'Available through Claas Financial Services',
            stock: 2,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '9',
            name: 'Maschio Gaspardo Rotavator',
            description: 'Italian-made premium rotavator with 6 feet working width',
            price: 120000,
            category: 'plough',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Maschio+Gaspardo',
            seller: 'Maschio Gaspardo India',
            sellerInfo: {
              name: 'Maschio Gaspardo India Pvt. Ltd.',
              address: 'Plot No. 434-435, GIDC, Vitthal Udyognagar, Anand, Gujarat 388121',
              contact: '+91 8877665544',
              email: 'info@maschio.in',
              website: 'https://www.maschio.com',
              established: 2010,
              rating: 4.9,
              reviewCount: 76
            },
            specifications: {
              'Working Width': '6 feet (1.8 meters)',
              'Number of Blades': '54',
              'Blade Type': 'C-shaped',
              'Blade Material': 'Boron steel',
              'Gearbox': 'Heavy-duty oil bath',
              'HP Required': '60-75 HP',
              'PTO Speed': '540 RPM',
              'Weight': '520 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 1200,
            warranty: '2 years manufacturer warranty',
            financing: 'Available through dealer',
            stock: 3,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '10',
            name: 'Swaraj 744 FE Tractor',
            description: '48 HP tractor with fuel-efficient engine and advanced hydraulics',
            price: 680000,
            category: 'tractor',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Swaraj+744FE',
            seller: 'Swaraj Tractors (Mahindra Group)',
            sellerInfo: {
              name: 'Swaraj Division, Mahindra & Mahindra Ltd.',
              address: 'Phase IV, Industrial Area, S.A.S. Nagar, Mohali, Punjab 160055',
              contact: '+91 9988776655',
              email: 'customercare@swarajtractors.com',
              website: 'https://www.swarajtractors.com',
              established: 1974,
              rating: 4.5,
              reviewCount: 210
            },
            specifications: {
              'Engine Power': '48 HP',
              'Engine Type': '3-cylinder, direct injection',
              'Displacement': '2730 cc',
              'Fuel Tank': '60 liters',
              'Transmission': '8 Forward + 2 Reverse',
              'PTO HP': '42 HP',
              'Hydraulic Lift Capacity': '1700 kg',
              'Wheelbase': '2000 mm',
              'Weight': '2050 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 4800,
            warranty: '2 years manufacturer warranty',
            financing: 'Available through Mahindra Finance',
            stock: 7,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '11',
            name: 'Tirth Agro Shaktiman Rotavator',
            description: 'Heavy-duty rotavator with 7 feet working width for large farms',
            price: 135000,
            category: 'plough',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Shaktiman+Rotavator',
            seller: 'Tirth Agro Technology (Shaktiman)',
            sellerInfo: {
              name: 'Tirth Agro Technology Pvt. Ltd.',
              address: 'Rajkot-Gondal Highway, Gondal, Gujarat 360311',
              contact: '+91 9876543210',
              email: 'info@shaktimanagro.com',
              website: 'https://www.shaktimanagro.com',
              established: 1997,
              rating: 4.6,
              reviewCount: 165
            },
            specifications: {
              'Working Width': '7 feet (2.1 meters)',
              'Number of Blades': '60',
              'Blade Type': 'L-shaped',
              'Blade Material': 'High carbon steel',
              'Gearbox': 'Heavy-duty oil bath',
              'HP Required': '70-80 HP',
              'PTO Speed': '540 RPM',
              'Weight': '650 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 1500,
            warranty: '2 years manufacturer warranty',
            financing: 'Available through dealer',
            stock: 4,
            condition: 'New',
            yearOfManufacture: 2023
          },
          {
            id: '12',
            name: 'VST Shakti VT 224-1D Power Tiller',
            description: 'Compact power tiller with 22 HP diesel engine for small farms',
            price: 180000,
            category: 'tractor',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=VST+Power+Tiller',
            seller: 'VST Tillers Tractors Ltd.',
            sellerInfo: {
              name: 'VST Tillers Tractors Limited',
              address: 'Plot No. 1, Dyavasandra Industrial Area, Whitefield, Bangalore, Karnataka 560048',
              contact: '+91 8877665544',
              email: 'customercare@vsttillers.com',
              website: 'https://www.vsttillers.com',
              established: 1967,
              rating: 4.4,
              reviewCount: 128
            },
            specifications: {
              'Engine Power': '22 HP',
              'Engine Type': 'Single-cylinder, water-cooled diesel',
              'Displacement': '1160 cc',
              'Fuel Tank': '18 liters',
              'Transmission': '6 Forward + 2 Reverse',
              'Rotary Tilling Width': '600-900 mm (adjustable)',
              'Tilling Depth': 'Up to 200 mm',
              'Weight': '520 kg'
            },
            rentalAvailable: true,
            leaseAvailable: false,
            rentalPrice: 2000,
            warranty: '1 year manufacturer warranty',
            financing: 'Available through VST Finance',
            stock: 5,
            condition: 'New',
            yearOfManufacture: 2023
          }
        ];

        // Filter by category if needed
        const filteredEquipment = category === 'all'
          ? allEquipment
          : allEquipment.filter(item => item.category === category);

        setEquipment(filteredEquipment);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching equipment:', err);
        setError('Failed to load equipment. Please try again later.');
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [category]);

  const handleContactSeller = (equipmentName: string) => {
    toast.success(`Contact request sent for ${equipmentName}`);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (equipment.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">No equipment found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {equipment.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline" className="capitalize">{item.category}</Badge>
              <div className="flex gap-1">
                {item.rentalAvailable && (
                  <Badge variant="secondary" className="text-xs">Rental</Badge>
                )}
                {item.leaseAvailable && (
                  <Badge variant="secondary" className="text-xs">Lease</Badge>
                )}
              </div>
            </div>
            <Link href={`/equipment/${item.id}`}>
              <h3 className="mb-1 line-clamp-1 text-lg font-semibold hover:underline">
                {item.name}
              </h3>
            </Link>
            <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">₹{item.price.toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground">Seller: {item.seller}</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 p-4 pt-0">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => handleContactSeller(item.name)}
            >
              Contact Seller
            </Button>
            <Link href={`/equipment/${item.id}`} className="flex-1">
              <Button className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
