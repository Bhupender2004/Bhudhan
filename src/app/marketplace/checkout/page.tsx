'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Wallet, Landmark, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/lib/utils/toast';

// Mock product data
const getProductById = (id: string) => {
  const products = [
    {
      id: '1',
      name: 'Premium Wheat Seeds',
      description: 'High-yield wheat seeds suitable for all soil types',
      basePrice: 450,
      category: 'seeds',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Wheat+Seeds',
      unit: 'kg',
    },
    {
      id: '2',
      name: 'Organic Fertilizer',
      description: 'Natural fertilizer for better crop health',
      basePrice: 350,
      category: 'fertilizers',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Organic+Fertilizer',
      unit: 'kg',
    },
    {
      id: '3',
      name: 'Bio Pesticide',
      description: 'Eco-friendly pest control solution',
      basePrice: 280,
      category: 'pesticides',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Bio+Pesticide',
      unit: 'liter',
    },
    {
      id: '4',
      name: 'Drip Irrigation Kit',
      description: 'Water-efficient irrigation system for small farms',
      basePrice: 1200,
      category: 'tools',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Drip+Irrigation+Kit',
      unit: 'set',
    },
    {
      id: '5',
      name: 'Rice Seeds (High Yield)',
      description: 'Premium rice seeds with excellent yield potential',
      basePrice: 520,
      category: 'seeds',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Rice+Seeds',
      unit: 'kg',
    },
    {
      id: '6',
      name: 'NPK Fertilizer 20-20-20',
      description: 'Balanced fertilizer for overall plant growth',
      basePrice: 420,
      category: 'fertilizers',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=NPK+Fertilizer',
      unit: 'kg',
    },
    {
      id: '7',
      name: 'Insect Spray',
      description: 'Effective against common crop pests',
      basePrice: 250,
      category: 'pesticides',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Insect+Spray',
      unit: 'liter',
    },
    {
      id: '8',
      name: 'Pruning Shears',
      description: 'Sharp and durable for precise cutting',
      basePrice: 350,
      category: 'tools',
      image: 'https://placehold.co/300x200/e2f0d9/1d6f42?text=Pruning+Shears',
      unit: 'piece',
    }
  ];

  return products.find(product => product.id === id) || null;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const productId = searchParams.get('productId');
  const quantity = parseInt(searchParams.get('quantity') || '1', 10);
  type Product = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    category: string;
    image: string;
    unit: string;
  };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  
  // Address state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Delivery options
  const [deliveryOption, setDeliveryOption] = useState('standard');
  
  // Processing state
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (productId) {
      const productData = getProductById(productId);
      setProduct(productData);
    }
    setLoading(false);
  }, [productId]);

  const subtotal = product ? product.basePrice * quantity : 0;
  const deliveryFee = deliveryOption === 'express' ? 100 : 50;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Validate form
    if (!name || !phone || !address || !pincode) {
      toast.error('Please fill in all required address fields');
      setProcessing(false);
      return;
    }
    
    if (paymentMethod === 'upi' && !upiId) {
      toast.error('Please enter your UPI ID');
      setProcessing(false);
      return;
    }
    
    if (paymentMethod === 'card' && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
      toast.error('Please fill in all card details');
      setProcessing(false);
      return;
    }
    
    if (paymentMethod === 'netbanking' && (!bankName || !accountNumber || !ifscCode)) {
      toast.error('Please fill in all banking details');
      setProcessing(false);
      return;
    }
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful! Your order has been placed.');
      setProcessing(false);
      
      // Redirect to order confirmation page
      router.push('/marketplace/orders?status=success');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p>The product you are trying to checkout does not exist or has been removed.</p>
            <Link href="/marketplace">
              <Button className="mt-4">Return to Marketplace</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <Link href={`/marketplace/product/${productId}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Product
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {quantity} {product.unit}
                  </p>
                  <p className="text-sm font-medium">₹{product.basePrice} per {product.unit}</p>
                </div>
              </div>

              <Separator />

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

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Delivery Options</span>
                </div>
                <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex justify-between w-full">
                      <span>Standard Delivery (3-5 days)</span>
                      <span>₹50</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex justify-between w-full">
                      <span>Express Delivery (1-2 days)</span>
                      <span>₹100</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>Enter your delivery address details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address Line *</Label>
                  <Input 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="House/Flat No., Street, Landmark"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="village">Village/Town</Label>
                    <Input 
                      id="village" 
                      value={village} 
                      onChange={(e) => setVillage(e.target.value)} 
                      placeholder="Enter your village or town"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Input 
                      id="district" 
                      value={district} 
                      onChange={(e) => setDistrict(e.target.value)} 
                      placeholder="Enter your district"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input 
                      id="state" 
                      value={state} 
                      onChange={(e) => setState(e.target.value)} 
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input 
                      id="pincode" 
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value)} 
                      placeholder="Enter your PIN code"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upi" className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span className="font-medium">Pay using UPI</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID *</Label>
                      <Input 
                        id="upi-id" 
                        value={upiId} 
                        onChange={(e) => setUpiId(e.target.value)} 
                        placeholder="yourname@upi"
                        required={paymentMethod === 'upi'}
                      />
                      <p className="text-xs text-muted-foreground">Example: name@okbank, name@ybl</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=UPI" alt="UPI" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=GPay" alt="Google Pay" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=PhonePe" alt="PhonePe" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=Paytm" alt="Paytm" width={40} height={40} className="rounded" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-medium">Pay using Credit/Debit Card</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number *</Label>
                      <Input 
                        id="card-number" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)} 
                        placeholder="1234 5678 9012 3456"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card *</Label>
                      <Input 
                        id="card-name" 
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        placeholder="Enter name as on card"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Expiry Date *</Label>
                        <Input 
                          id="card-expiry" 
                          value={cardExpiry} 
                          onChange={(e) => setCardExpiry(e.target.value)} 
                          placeholder="MM/YY"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV *</Label>
                        <Input 
                          id="card-cvv" 
                          value={cardCvv} 
                          onChange={(e) => setCvv(e.target.value)} 
                          placeholder="123"
                          type="password"
                          maxLength={3}
                          required={paymentMethod === 'card'}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=Visa" alt="Visa" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=MC" alt="Mastercard" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=RuPay" alt="RuPay" width={40} height={40} className="rounded" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="netbanking" className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Landmark className="h-5 w-5 text-primary" />
                      <span className="font-medium">Pay using Net Banking</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name *</Label>
                      <Input 
                        id="bank-name" 
                        value={bankName} 
                        onChange={(e) => setBankName(e.target.value)} 
                        placeholder="Enter your bank name"
                        required={paymentMethod === 'netbanking'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number *</Label>
                      <Input 
                        id="account-number" 
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)} 
                        placeholder="Enter your account number"
                        required={paymentMethod === 'netbanking'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifsc-code">IFSC Code *</Label>
                      <Input 
                        id="ifsc-code" 
                        value={ifscCode} 
                        onChange={(e) => setIfscCode(e.target.value)} 
                        placeholder="Enter IFSC code"
                        required={paymentMethod === 'netbanking'}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=SBI" alt="SBI" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=HDFC" alt="HDFC" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=ICICI" alt="ICICI" width={40} height={40} className="rounded" />
                      <Image src="https://placehold.co/40x40/e2f0d9/1d6f42?text=PNB" alt="PNB" width={40} height={40} className="rounded" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="rounded-lg border p-4 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹${total.toLocaleString()}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading checkout...</p>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
