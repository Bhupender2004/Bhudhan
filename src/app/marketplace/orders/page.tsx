'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, CheckCircle, Truck, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/lib/utils/toast';

// Mock orders data
const mockOrders = [
	{
		id: 'ORD123456',
		date: '2023-04-08',
		status: 'delivered',
		total: 1350,
		paymentMethod: 'UPI',
		items: [
			{
				id: '1',
				name: 'Premium Wheat Seeds',
				quantity: 3,
				price: 450,
				unit: 'kg',
			},
		],
		deliveryAddress: {
			name: 'Rajesh Kumar',
			address: 'House No. 123, Near Village Well',
			village: 'Gurugram',
			district: 'Gurugram',
			state: 'Haryana',
			pincode: '122001',
			phone: '9876543210',
		},
		trackingInfo: {
			courier: 'AgriExpress',
			trackingId: 'AE987654321',
			estimatedDelivery: '2023-04-10',
			currentStatus: 'Out for delivery',
			statusUpdates: [
				{ date: '2023-04-08', status: 'Order placed' },
				{ date: '2023-04-09', status: 'Shipped from warehouse' },
				{ date: '2023-04-10', status: 'Out for delivery' },
			],
		},
	},
	{
		id: 'ORD789012',
		date: '2023-04-05',
		status: 'processing',
		total: 700,
		paymentMethod: 'Card',
		items: [
			{
				id: '2',
				name: 'Organic Fertilizer',
				quantity: 2,
				price: 350,
				unit: 'kg',
			},
		],
		deliveryAddress: {
			name: 'Rajesh Kumar',
			address: 'House No. 123, Near Village Well',
			village: 'Gurugram',
			district: 'Gurugram',
			state: 'Haryana',
			pincode: '122001',
			phone: '9876543210',
		},
		trackingInfo: {
			courier: 'AgriExpress',
			trackingId: 'AE123456789',
			estimatedDelivery: '2023-04-12',
			currentStatus: 'Processing',
			statusUpdates: [
				{ date: '2023-04-05', status: 'Order placed' },
				{ date: '2023-04-06', status: 'Processing' },
			],
		},
	},
];

function OrdersContent() {
	const searchParams = useSearchParams();
	const { toast } = useToast();
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		// Check if redirected from successful checkout
		const status = searchParams.get('status');
		if (status === 'success') {
			setShowSuccess(true);
			// Auto-hide success message after 5 seconds
			const timer = setTimeout(() => {
				setShowSuccess(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [searchParams]);

	const downloadInvoice = (orderId: string) => {
		toast.success(`Invoice for order ${orderId} downloaded successfully`);
	};

	const trackOrder = (trackingId: string) => {
		toast.success(`Tracking information for ${trackingId} opened in a new tab`);
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
				<h1 className="text-2xl font-bold">My Orders</h1>
			</div>

			{showSuccess && (
				<Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-900/20">
					<CardContent className="p-6">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-green-100 p-2 dark:bg-green-800">
								<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
									Order Placed Successfully!
								</h3>
								<p className="text-green-700 dark:text-green-400">
									Your order has been placed successfully. You can track your order status below.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			<Tabs defaultValue="all">
				<TabsList className="mb-6">
					<TabsTrigger value="all">All Orders</TabsTrigger>
					<TabsTrigger value="processing">Processing</TabsTrigger>
					<TabsTrigger value="shipped">Shipped</TabsTrigger>
					<TabsTrigger value="delivered">Delivered</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="space-y-6">
					{mockOrders.map((order) => (
						<OrderCard key={order.id} order={order} onDownloadInvoice={downloadInvoice} onTrackOrder={trackOrder} />
					))}
				</TabsContent>

				<TabsContent value="processing" className="space-y-6">
					{mockOrders
						.filter((order) => order.status === 'processing')
						.map((order) => (
							<OrderCard key={order.id} order={order} onDownloadInvoice={downloadInvoice} onTrackOrder={trackOrder} />
						))}
				</TabsContent>

				<TabsContent value="shipped" className="space-y-6">
					{mockOrders
						.filter((order) => order.status === 'shipped')
						.map((order) => (
							<OrderCard key={order.id} order={order} onDownloadInvoice={downloadInvoice} onTrackOrder={trackOrder} />
						))}
				</TabsContent>

				<TabsContent value="delivered" className="space-y-6">
					{mockOrders
						.filter((order) => order.status === 'delivered')
						.map((order) => (
							<OrderCard key={order.id} order={order} onDownloadInvoice={downloadInvoice} onTrackOrder={trackOrder} />
						))}
				</TabsContent>
			</Tabs>

			{mockOrders.length === 0 && (
				<Card>
					<CardContent className="p-8 text-center">
						<Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
						<h2 className="text-xl font-semibold">No Orders Yet</h2>
						<p className="mb-4 text-muted-foreground">
							You have not placed any orders yet. Start shopping to see your orders here.
						</p>
						<Link href="/marketplace">
							<Button>Browse Products</Button>
						</Link>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}

// Define types for order, item, and status update
interface StatusUpdate {
	date: string;
	status: string;
}

interface OrderItem {
	id: string;
	name: string;
	quantity: number;
	price: number;
	unit: string;
}

interface TrackingInfo {
	courier: string;
	trackingId: string;
	estimatedDelivery: string;
	currentStatus: string;
	statusUpdates: StatusUpdate[];
}

interface DeliveryAddress {
	name: string;
	address: string;
	village: string;
	district: string;
	state: string;
	pincode: string;
	phone: string;
}

interface Order {
	id: string;
	date: string;
	status: string;
	total: number;
	paymentMethod: string;
	items: OrderItem[];
	deliveryAddress: DeliveryAddress;
	trackingInfo: TrackingInfo;
}

interface OrderCardProps {
	order: Order;
	onDownloadInvoice: (orderId: string) => void;
	onTrackOrder: (trackingId: string) => void;
}

function OrderCard({ order, onDownloadInvoice, onTrackOrder }: OrderCardProps) {
	const [expanded, setExpanded] = useState(false);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'delivered':
				return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300';
			case 'shipped':
				return 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
			case 'processing':
				return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
			case 'cancelled':
				return 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300';
			default:
				return '';
		}
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-IN', options);
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
					<div>
						<CardTitle className="text-lg">{order.id}</CardTitle>
						<CardDescription>Ordered on {formatDate(order.date)}</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="secondary" className={getStatusColor(order.status)}>
							{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
						</Badge>
						<Badge variant="outline">₹{order.total.toLocaleString()}</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pb-3">
				<div className="space-y-4">
					<div>
						<h3 className="mb-2 font-medium">Items</h3>
						{order.items.map((item: OrderItem) => (
							<div key={item.id} className="flex justify-between py-1">
								<span>
									{item.name} × {item.quantity} {item.unit}
								</span>
								<span>₹{(item.price * item.quantity).toLocaleString()}</span>
							</div>
						))}
					</div>

					{expanded && (
						<>
							<Separator />

							<div className="grid gap-4 md:grid-cols-2">
								<div>
									<h3 className="mb-2 font-medium">Delivery Address</h3>
									<div className="rounded-lg border p-3 text-sm">
										<p className="font-medium">{order.deliveryAddress.name}</p>
										<p>{order.deliveryAddress.address}</p>
										<p>
											{order.deliveryAddress.village}, {order.deliveryAddress.district}, {order.deliveryAddress.state} -{' '}
											{order.deliveryAddress.pincode}
										</p>
										<p className="mt-1">Phone: {order.deliveryAddress.phone}</p>
									</div>
								</div>

								<div>
									<h3 className="mb-2 font-medium">Payment Information</h3>
									<div className="rounded-lg border p-3 text-sm">
										<div className="flex justify-between">
											<span>Payment Method</span>
											<span>{order.paymentMethod}</span>
										</div>
										<div className="flex justify-between">
											<span>Subtotal</span>
											<span>₹{order.total.toLocaleString()}</span>
										</div>
										<div className="flex justify-between">
											<span>Delivery Fee</span>
											<span>₹50</span>
										</div>
										<Separator className="my-2" />
										<div className="flex justify-between font-medium">
											<span>Total</span>
											<span>₹{(order.total + 50).toLocaleString()}</span>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h3 className="mb-2 font-medium">Tracking Information</h3>
								<div className="rounded-lg border p-3">
									<div className="mb-3 flex justify-between">
										<div>
											<p className="text-sm text-muted-foreground">Courier</p>
											<p className="font-medium">{order.trackingInfo.courier}</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Tracking ID</p>
											<p className="font-medium">{order.trackingInfo.trackingId}</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Estimated Delivery</p>
											<p className="font-medium">{formatDate(order.trackingInfo.estimatedDelivery)}</p>
										</div>
									</div>

									<div className="relative">
										<div className="absolute left-2 top-0 h-full w-0.5 bg-muted"></div>
										<div className="space-y-3">
											{order.trackingInfo.statusUpdates.map((update: StatusUpdate, index: number) => (
												<div key={index} className="relative pl-6">
													<div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
													<p className="font-medium">{update.status}</p>
													<p className="text-xs text-muted-foreground">{formatDate(update.date)}</p>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex flex-wrap gap-2">
				<Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
					{expanded ? 'Show Less' : 'Show Details'}
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onDownloadInvoice(order.id)}
				>
					<Download className="mr-2 h-4 w-4" />
					Download Invoice
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onTrackOrder(order.trackingInfo.trackingId)}
				>
					<Truck className="mr-2 h-4 w-4" />
					Track Order
				</Button>
			</CardFooter>
		</Card>
	);
}
