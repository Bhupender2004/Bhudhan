'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

// Mock data for seller products
const mockProducts = [
  {
    id: 1,
    name: 'Organic Wheat Seeds',
    price: 1200,
    stock: 50,
    category: 'Seeds',
    status: 'active',
    image: '/images/products/wheat-seeds.jpg',
    sales: 12,
  },
  {
    id: 2,
    name: 'Natural Fertilizer - 5kg',
    price: 850,
    stock: 35,
    category: 'Fertilizers',
    status: 'active',
    image: '/images/products/fertilizer.jpg',
    sales: 8,
  },
  {
    id: 3,
    name: 'Tractor Attachment - Plough',
    price: 15000,
    stock: 5,
    category: 'Equipment',
    status: 'pending',
    image: '/images/products/plough.jpg',
    sales: 0,
  },
  {
    id: 4,
    name: 'Pesticide Sprayer - 15L',
    price: 2500,
    stock: 20,
    category: 'Equipment',
    status: 'active',
    image: '/images/products/sprayer.jpg',
    sales: 5,
  },
];

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2023-11-15',
    customer: 'Rajesh Kumar',
    amount: 2400,
    status: 'delivered',
    items: 2,
  },
  {
    id: 'ORD-002',
    date: '2023-11-18',
    customer: 'Amit Singh',
    amount: 850,
    status: 'processing',
    items: 1,
  },
  {
    id: 'ORD-003',
    date: '2023-11-20',
    customer: 'Priya Sharma',
    amount: 2500,
    status: 'shipped',
    items: 1,
  },
  {
    id: 'ORD-004',
    date: '2023-11-22',
    customer: 'Vikram Patel',
    amount: 3600,
    status: 'processing',
    items: 3,
  },
];

export default function SellerDashboardPage() {
  useLanguage();
  const [, setActiveTab] = useState('overview');

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <AlertCircle className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, orders, and seller account</p>
        </div>
        <Button asChild>
          <Link href="/seller-dashboard/add-product">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockProducts.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockProducts.filter(p => p.status === 'active').length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOrders.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockOrders.filter(o => o.status === 'processing').length} processing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{mockOrders.reduce((sum, order) => sum + order.amount, 0)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your most recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.amount}</p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link href="#" onClick={() => setActiveTab('orders')}>View All Orders</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Your best performing products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProducts
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 3)
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded bg-gray-200 mr-3"></div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{product.price}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sold</p>
                        </div>
                      </div>
                    ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link href="#" onClick={() => setActiveTab('products')}>View All Products</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>Manage your product listings</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/seller-dashboard/add-product">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Product</th>
                      <th className="text-left py-3 px-2">Category</th>
                      <th className="text-left py-3 px-2">Price</th>
                      <th className="text-left py-3 px-2">Stock</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded bg-gray-200 mr-3"></div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">{product.category}</td>
                        <td className="py-3 px-2">₹{product.price}</td>
                        <td className="py-3 px-2">{product.stock}</td>
                        <td className="py-3 px-2">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                            {getStatusIcon(product.status)}
                            <span className="ml-1 capitalize">{product.status}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/seller-dashboard/edit-product/${product.id}`}>Edit</Link>
                            </Button>
                            <Button variant="ghost" size="sm">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription>Manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Order ID</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Customer</th>
                      <th className="text-left py-3 px-2">Amount</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2 font-medium">{order.id}</td>
                        <td className="py-3 px-2">{order.date}</td>
                        <td className="py-3 px-2">{order.customer}</td>
                        <td className="py-3 px-2">₹{order.amount}</td>
                        <td className="py-3 px-2">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/seller-dashboard/order/${order.id}`}>View</Link>
                            </Button>
                            <Button variant="ghost" size="sm">Update</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seller Account Settings</CardTitle>
              <CardDescription>Manage your seller profile and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Shop Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Shop Name</p>
                      <p>Krishi Seva Kendra</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Business Type</p>
                      <p>Agriculture Products</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">GST Number</p>
                      <p>22AAAAA0000A1Z5</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">PAN Number</p>
                      <p>AAAAA0000A</p>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Edit Shop Information</Button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Bank Account</p>
                      <p>XXXX XXXX XXXX 1234</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">UPI ID</p>
                      <p>example@upi</p>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Update Payment Details</Button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified when you receive a new order</p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Product Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified when your product is approved or rejected</p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Updates</p>
                        <p className="text-sm text-muted-foreground">Receive marketing tips and promotional opportunities</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
