'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/lib/utils/toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  seller: string;
}

interface ProductGridProps {
  category: string;
}

export default function ProductGrid({ category }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real implementation, we would fetch from an API
    // For now, we'll use mock data
    const fetchProducts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        const allProducts = [
          {
            id: '1',
            name: 'Premium Wheat Seeds',
            description: 'High-yield wheat seeds suitable for all soil types',
            price: 450,
            category: 'seeds',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Wheat+Seeds',
            rating: 4.5,
            seller: 'AgriSeeds Ltd.'
          },
          {
            id: '2',
            name: 'Organic Fertilizer',
            description: 'Natural fertilizer for better crop health',
            price: 350,
            category: 'fertilizers',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Organic+Fertilizer',
            rating: 4.2,
            seller: 'Green Earth'
          },
          {
            id: '3',
            name: 'Bio Pesticide',
            description: 'Eco-friendly pest control solution',
            price: 280,
            category: 'pesticides',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Bio+Pesticide',
            rating: 4.0,
            seller: 'NatureCare'
          },
          {
            id: '4',
            name: 'Garden Hoe',
            description: 'Durable garden tool for weeding and cultivation',
            price: 520,
            category: 'tools',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Garden+Hoe',
            rating: 4.7,
            seller: 'FarmTools'
          },
          {
            id: '5',
            name: 'Rice Seeds',
            description: 'High-quality rice seeds for better yield',
            price: 380,
            category: 'seeds',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Rice+Seeds',
            rating: 4.3,
            seller: 'AgriSeeds Ltd.'
          },
          {
            id: '6',
            name: 'NPK Fertilizer',
            description: 'Balanced nutrition for all crops',
            price: 420,
            category: 'fertilizers',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=NPK+Fertilizer',
            rating: 4.4,
            seller: 'FarmNutrients'
          },
          {
            id: '7',
            name: 'Insect Spray',
            description: 'Effective against common crop pests',
            price: 250,
            category: 'pesticides',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Insect+Spray',
            rating: 3.9,
            seller: 'CropGuard'
          },
          {
            id: '8',
            name: 'Pruning Shears',
            description: 'Sharp and durable for precise cutting',
            price: 350,
            category: 'tools',
            image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Pruning+Shears',
            rating: 4.6,
            seller: 'GardenPro'
          }
        ];

        // Filter by category if needed
        const filteredProducts = category === 'all'
          ? allProducts
          : allProducts.filter(product => product.category === category);

        setProducts(filteredProducts);
        setLoading(false);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch products';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (productId: string, productName: string) => {
    // In a real implementation, we would add to cart in a state management solution
    toast.success(`${productName} has been added to your cart`);
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

  if (products.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">No products found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline">{product.category}</Badge>
              <div className="flex items-center text-sm">
                <span className="mr-1">★</span>
                <span>{product.rating}</span>
              </div>
            </div>
            <Link href={`/marketplace/product/${product.id}`}>
              <h3 className="mb-1 line-clamp-1 text-lg font-semibold hover:underline">
                {product.name}
              </h3>
            </Link>
            <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">₹{product.price}</p>
              <p className="text-xs text-muted-foreground">Seller: {product.seller}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full"
              onClick={() => handleAddToCart(product.id, product.name)}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
