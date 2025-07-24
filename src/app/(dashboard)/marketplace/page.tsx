import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductGrid from '@/components/marketplace/product-grid';
import { Store, ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Buy seeds, fertilizers, pesticides and other agricultural products',
};

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Buy seeds, fertilizers, pesticides and other agricultural products
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/marketplace/cart">
            <Button variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              View Cart
            </Button>
          </Link>
          <Link href="/marketplace/orders">
            <Button variant="outline">My Orders</Button>
          </Link>
          <Link href="/become-seller">
            <Button variant="default">
              <Store className="mr-2 h-4 w-4" />
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-2/3">
          <Input
            type="search"
            placeholder="Search for products..."
            className="w-full"
          />
        </div>
        <div className="flex w-full gap-2 md:w-1/3">
          <Button variant="outline" className="w-full">Filter</Button>
          <Button variant="outline" className="w-full">Sort</Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="seeds">Seeds</TabsTrigger>
          <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
          <TabsTrigger value="pesticides">Pesticides</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <ProductGrid category="all" />
        </TabsContent>
        <TabsContent value="seeds" className="mt-6">
          <ProductGrid category="seeds" />
        </TabsContent>
        <TabsContent value="fertilizers" className="mt-6">
          <ProductGrid category="fertilizers" />
        </TabsContent>
        <TabsContent value="pesticides" className="mt-6">
          <ProductGrid category="pesticides" />
        </TabsContent>
        <TabsContent value="tools" className="mt-6">
          <ProductGrid category="tools" />
        </TabsContent>
      </Tabs>

      {/* Seller Promotion Section */}
      <div className="mt-12 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Sell Your Products on BhuDhan</h2>
            <p className="text-muted-foreground">
              Are you a farmer, manufacturer, or retailer of agricultural products? Join our marketplace and reach thousands of farmers across India.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Easy registration process</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Simple product listing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Secure payment processing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Dedicated seller dashboard</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/become-seller">
              <Button size="lg" className="w-full">
                <Store className="mr-2 h-5 w-5" />
                Register as Seller
              </Button>
            </Link>
            <Link href="/seller-dashboard">
              <Button variant="outline" size="lg" className="w-full">
                Access Seller Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
