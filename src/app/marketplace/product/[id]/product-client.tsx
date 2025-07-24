'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Truck, ShieldCheck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/lib/utils/toast';

// Define types for product and specification
interface Specification {
  name: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  basePrice: number;
  minOrder?: number;
  image: string;
  description: string;
  specifications: Specification[];
  features: string[];
  relatedProducts: string[];
  relatedProductsData?: Product[];
  [key: string]: unknown;
}

// Real-time price API integration
const fetchRealTimePrice = async (productId: string, basePrice: number) => {
  // In a real implementation, this would call an actual price API
  // For now, we'll simulate price fluctuations
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate price fluctuation (±5%)
    const fluctuation = (Math.random() * 0.1) - 0.05;
    const newPrice = basePrice * (1 + fluctuation);

    return Math.round(newPrice);
  } catch (error) {
    console.error('Error fetching real-time price:', error);
    return basePrice; // Fallback to base price
  }
};

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [quantity, setQuantity] = useState(product.minOrder || 1);
  const [realTimePrice, setRealTimePrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch real-time price
    fetchRealTimePrice(product.id, product.basePrice).then(price => {
      setRealTimePrice(price);
      setPriceLoading(false);
    });

    // Set up interval to update price every 30 seconds
    const priceInterval = setInterval(() => {
      setPriceLoading(true);
      fetchRealTimePrice(product.id, product.basePrice).then(price => {
        setRealTimePrice(price);
        setPriceLoading(false);
      });
    }, 30000);

    return () => clearInterval(priceInterval);
  }, [product.id, product.basePrice]);

  const handleAddToCart = () => {
    toast.success(`${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    // Navigate to checkout page with product ID and quantity
    window.location.href = `/marketplace/checkout?productId=${product.id}&quantity=${quantity}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline" className="capitalize">{String(product.category)}</Badge>
              <div className="flex items-center text-sm">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{typeof product.rating === 'number' || typeof product.rating === 'string' ? product.rating : ''}</span>
                <span className="ml-1 text-muted-foreground">({typeof product.reviewCount === 'number' || typeof product.reviewCount === 'string' ? product.reviewCount : ''} reviews)</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Seller: {String(product.seller)}</p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold">
                ₹{priceLoading ? (
                  <span className="inline-block w-16 animate-pulse rounded bg-muted">&nbsp;</span>
                ) : (
                  realTimePrice
                )}
              </p>
              <Badge variant="secondary" className="text-xs">
                {priceLoading ? 'Updating...' : 'Live Price'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Price per {String(product.unit)}  Minimum order: {typeof product.minOrder === 'number' ? product.minOrder : ''} {String(product.unit)}
            </p>
            <p className="mt-1 text-sm text-green-600">
              {typeof product.stock === 'number' ? (product.stock > 50 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock') : ''}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Quantity ({String(product.unit)})</p>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(typeof product.minOrder === 'number' ? product.minOrder : 1, quantity - 1))}
                disabled={quantity <= (typeof product.minOrder === 'number' ? product.minOrder : 1)}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= (typeof product.stock === 'number' ? product.stock : Infinity)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button className="flex-1" variant="secondary" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">Delivery within 3-5 business days</p>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">Quality assured by BhuDhan</p>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">Easy returns within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4 rounded-lg border p-4">
          <p>{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4 rounded-lg border p-4">
          <div className="space-y-2">
            {Array.isArray(product.specifications) && product.specifications.map((spec: Specification, index: number) => (
              <div key={index} className="grid grid-cols-2 gap-2 border-b py-2 last:border-0">
                <p className="font-medium">{spec.name}</p>
                <p>{spec.value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="features" className="mt-4 rounded-lg border p-4">
          <ul className="list-inside list-disc space-y-2">
            {product.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {product.relatedProducts.map((relatedId: string, index: number) => {
            const relatedProduct = product.relatedProductsData?.[index];
            if (!relatedProduct) return null;

            return (
              <Card key={relatedId} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <CardContent className="p-4">
                  <Link href={`/marketplace/product/${relatedProduct.id}`}>
                    <h3 className="line-clamp-1 text-lg font-semibold hover:underline">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-bold">₹{relatedProduct.basePrice}</p>
                    <Badge variant="outline" className="capitalize">{String(relatedProduct.category)}</Badge>
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
