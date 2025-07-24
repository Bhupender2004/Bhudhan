'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/lib/utils/toast';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Premium Wheat Seeds',
    price: 450,
    quantity: 2,
    image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Wheat+Seeds',
    unit: 'kg',
    stock: 250
  },
  {
    id: '2',
    name: 'Organic Fertilizer',
    price: 350,
    quantity: 1,
    image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Organic+Fertilizer',
    unit: 'kg',
    stock: 500
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) } 
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const proceedToCheckout = () => {
    // In a real app, this would navigate to a checkout page with all cart items
    // For now, we'll just show a toast
    toast.success('Proceeding to checkout');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <Link href="/marketplace">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-1">
                      <Link href={`/marketplace/product/${item.id}`}>
                        <h3 className="font-medium hover:underline">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">₹{item.price} per {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-muted-foreground"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={proceedToCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-4 rounded-lg border p-4">
              <h3 className="mb-2 text-sm font-medium">Accepted Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                <div className="rounded bg-muted px-2 py-1 text-xs">UPI</div>
                <div className="rounded bg-muted px-2 py-1 text-xs">Credit Card</div>
                <div className="rounded bg-muted px-2 py-1 text-xs">Debit Card</div>
                <div className="rounded bg-muted px-2 py-1 text-xs">Net Banking</div>
                <div className="rounded bg-muted px-2 py-1 text-xs">Cash on Delivery</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Your Cart is Empty</h2>
            <p className="mb-4 text-muted-foreground">
              Looks like you have not added any products to your cart yet.
            </p>
            <Link href="/marketplace">
              <Button>Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
