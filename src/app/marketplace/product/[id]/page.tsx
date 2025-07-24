import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductClient from './product-client';



// Mock product data
const getProductById = (id: string) => {
  const products = [
    {
      id: '1',
      name: 'Premium Wheat Seeds',
      description: 'High-yield wheat seeds suitable for all soil types. These seeds are specially developed to provide better resistance to common diseases and pests. The wheat variety is known for its excellent grain quality and high protein content.',
      basePrice: 450,
      category: 'seeds',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=Premium+Wheat+Seeds',
      rating: 4.5,
      reviewCount: 128,
      seller: 'AgriSeeds Ltd.',
      stock: 250,
      unit: 'kg',
      minOrder: 5,
      specifications: [
        { name: 'Variety', value: 'HD-3226 (Pusa Yashasvi)' },
        { name: 'Germination Rate', value: '95%' },
        { name: 'Purity', value: '99%' },
        { name: 'Treatment', value: 'Fungicide Treated' },
        { name: 'Yield Potential', value: '5.5-6.0 tons/hectare' },
        { name: 'Maturity', value: '120-125 days' }
      ],
      features: [
        'High yield potential',
        'Disease resistant (particularly to rust and powdery mildew)',
        'Suitable for irrigated conditions',
        'Good chapati quality with high protein content',
        'Responsive to fertilizers'
      ],
      relatedProducts: ['5', '9', '13']
    },
    {
      id: '2',
      name: 'Organic Fertilizer',
      description: 'Natural fertilizer for better crop health. Made from composted plant materials and animal manure, this organic fertilizer improves soil structure and promotes beneficial soil microorganisms. It provides a balanced supply of nutrients for sustained plant growth.',
      basePrice: 350,
      category: 'fertilizers',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=Organic+Fertilizer',
      rating: 4.2,
      reviewCount: 95,
      seller: 'Green Earth',
      stock: 500,
      unit: 'kg',
      minOrder: 10,
      specifications: [
        { name: 'Type', value: 'Vermicompost' },
        { name: 'NPK Ratio', value: '1.5:0.5:0.5' },
        { name: 'Organic Matter', value: '≥20%' },
        { name: 'pH', value: '6.8-7.5' },
        { name: 'Moisture', value: '15-20%' }
      ],
      features: [
        'Improves soil structure and water retention',
        'Enhances microbial activity in soil',
        'Slow release of nutrients for long-term benefits',
        'Reduces dependency on chemical fertilizers',
        'Eco-friendly and sustainable'
      ],
      relatedProducts: ['6', '10', '14']
    },
    {
      id: '3',
      name: 'Bio Pesticide',
      description: 'Eco-friendly pest control solution. This biological pesticide is derived from natural sources and targets specific pests while being safe for beneficial insects. It breaks down quickly in the environment, leaving no harmful residues on crops.',
      basePrice: 280,
      category: 'pesticides',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=Bio+Pesticide',
      rating: 4.0,
      reviewCount: 76,
      seller: 'NatureCare',
      stock: 150,
      unit: 'liter',
      minOrder: 1,
      specifications: [
        { name: 'Active Ingredient', value: 'Bacillus thuringiensis' },
        { name: 'Formulation', value: 'Liquid Concentrate' },
        { name: 'Target Pests', value: 'Lepidopteran larvae (caterpillars)' },
        { name: 'Application Rate', value: '1-2 ml per liter of water' },
        { name: 'Pre-Harvest Interval', value: '1 day' }
      ],
      features: [
        'Safe for beneficial insects and pollinators',
        'No chemical residues on harvested crops',
        'Can be used in organic farming',
        'Minimal risk to human health',
        'Reduces pest resistance issues'
      ],
      relatedProducts: ['7', '11', '15']
    },
    {
      id: '4',
      name: 'Drip Irrigation Kit',
      description: 'Water-efficient irrigation system for small farms. This complete kit includes drip lines, filters, connectors, and pressure regulators. The system delivers water directly to plant roots, minimizing evaporation and runoff while maximizing water use efficiency.',
      basePrice: 1200,
      category: 'tools',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=Drip+Irrigation+Kit',
      rating: 4.7,
      reviewCount: 53,
      seller: 'WaterSave Solutions',
      stock: 30,
      unit: 'set',
      minOrder: 1,
      specifications: [
        { name: 'Coverage Area', value: '1000 sq. ft.' },
        { name: 'Drip Line Length', value: '100 meters' },
        { name: 'Emitter Spacing', value: '30 cm' },
        { name: 'Flow Rate', value: '2 liters per hour per emitter' },
        { name: 'Filter Type', value: 'Screen filter, 120 mesh' }
      ],
      features: [
        'Water savings up to 70% compared to flood irrigation',
        'Reduces weed growth between plant rows',
        'Minimizes soil erosion',
        'Allows fertigation (fertilizer application through irrigation)',
        'Easy to install and maintain'
      ],
      relatedProducts: ['8', '12', '16']
    },
    {
      id: '5',
      name: 'Rice Seeds (High Yield)',
      description: 'Premium rice seeds with excellent yield potential. These seeds are developed for irrigated conditions and show good resistance to major diseases. The variety produces long, slender grains with excellent cooking quality.',
      basePrice: 520,
      category: 'seeds',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=Rice+Seeds',
      rating: 4.6,
      reviewCount: 112,
      seller: 'AgriSeeds Ltd.',
      stock: 200,
      unit: 'kg',
      minOrder: 5,
      specifications: [
        { name: 'Variety', value: 'Pusa Basmati 1509' },
        { name: 'Germination Rate', value: '92%' },
        { name: 'Purity', value: '98%' },
        { name: 'Treatment', value: 'Fungicide Treated' },
        { name: 'Yield Potential', value: '4.5-5.0 tons/hectare' },
        { name: 'Maturity', value: '115-120 days' }
      ],
      features: [
        'Aromatic long-grain variety',
        'Resistant to bacterial leaf blight',
        'Suitable for both traditional and mechanized farming',
        'Excellent cooking quality',
        'Good market demand and price'
      ],
      relatedProducts: ['1', '9', '13']
    },
    {
      id: '6',
      name: 'NPK Fertilizer 20-20-20',
      description: 'Balanced fertilizer for overall plant growth. This water-soluble fertilizer provides equal proportions of nitrogen, phosphorus, and potassium, making it suitable for a wide range of crops at different growth stages.',
      basePrice: 420,
      category: 'fertilizers',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=NPK+Fertilizer',
      rating: 4.4,
      reviewCount: 87,
      seller: 'Crop Nutrition Inc.',
      stock: 350,
      unit: 'kg',
      minOrder: 5,
      specifications: [
        { name: 'NPK Ratio', value: '20:20:20' },
        { name: 'Form', value: 'Water Soluble Crystals' },
        { name: 'Solubility', value: '100%' },
        { name: 'Micronutrients', value: 'Contains Zn, Fe, Mn, Cu, B, Mo' },
        { name: 'pH', value: '6.5-7.0 (in solution)' }
      ],
      features: [
        'Balanced nutrition for all growth stages',
        'Quick nutrient availability to plants',
        'Suitable for fertigation and foliar application',
        'Contains essential micronutrients',
        'Highly efficient nutrient utilization'
      ],
      relatedProducts: ['2', '10', '14']
    },
    {
      id: '7',
      name: 'Insect Spray',
      description: 'Effective against common crop pests. This broad-spectrum insecticide controls a wide range of pests including aphids, thrips, whiteflies, and caterpillars. It acts through contact and ingestion for quick and effective control.',
      basePrice: 250,
      category: 'pesticides',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=Insect+Spray',
      rating: 3.9,
      reviewCount: 64,
      seller: 'CropGuard',
      stock: 120,
      unit: 'liter',
      minOrder: 1,
      specifications: [
        { name: 'Active Ingredient', value: 'Imidacloprid 17.8% SL' },
        { name: 'Formulation', value: 'Soluble Concentrate' },
        { name: 'Target Pests', value: 'Sucking pests (aphids, jassids, whiteflies)' },
        { name: 'Application Rate', value: '0.5 ml per liter of water' },
        { name: 'Pre-Harvest Interval', value: '7-14 days (crop dependent)' }
      ],
      features: [
        'Systemic action protects new growth',
        'Rain-fast within 2 hours of application',
        'Long residual activity (10-14 days)',
        'Compatible with most fungicides and fertilizers',
        'Low odor formulation'
      ],
      relatedProducts: ['3', '11', '15']
    },
    {
      id: '8',
      name: 'Pruning Shears',
      description: 'Sharp and durable for precise cutting. These professional-grade pruning shears feature high-carbon steel blades with non-stick coating for clean cuts and easy cleaning. The ergonomic handles reduce hand fatigue during extended use.',
      basePrice: 350,
      category: 'tools',
      image: 'https://placehold.co/600x400/e2f0d9/1d6f42?text=Pruning+Shears',
      rating: 4.6,
      reviewCount: 92,
      seller: 'GardenPro',
      stock: 75,
      unit: 'piece',
      minOrder: 1,
      specifications: [
        { name: 'Blade Material', value: 'High-Carbon Steel with Teflon Coating' },
        { name: 'Handle Material', value: 'Aluminum with TPR Grip' },
        { name: 'Cutting Capacity', value: 'Up to 20mm diameter' },
        { name: 'Length', value: '210mm' },
        { name: 'Weight', value: '250g' }
      ],
      features: [
        'Precision-ground blades for clean cuts',
        'Sap groove prevents blade sticking',
        'Shock-absorbing bumper reduces hand strain',
        'Adjustable blade tension',
        'Spare parts available for long service life'
      ],
      relatedProducts: ['4', '12', '16']
    }
  ];

  return products.find(product => product.id === id) || null;
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = await params;
  const product = getProductById(productId);

  // Get related products data
  const relatedProductsData = product?.relatedProducts.map(id => getProductById(id)).filter((p): p is NonNullable<typeof p> => p !== null) || [];

  // Add related products data to the product object
  const productWithRelated = product ? {
    ...product,
    relatedProductsData
  } : null;

  if (!productWithRelated) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/marketplace">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Product Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4">The product you are looking for does not exist or has been removed.</p>
            <Link href="/marketplace">
              <Button>Return to Marketplace</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/marketplace">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{productWithRelated.name}</h1>
      </div>

      <ProductClient product={productWithRelated} />
    </div>
  );
}
