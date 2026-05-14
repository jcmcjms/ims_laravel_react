import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const statusColors = {
    pending: 'bg-yellow-500',
    ordered: 'bg-blue-500',
    received: 'bg-green-500',
    cancelled: 'bg-red-500',
};

const statusLabels = {
    pending: 'Pending',
    ordered: 'Ordered',
    received: 'Received',
    cancelled: 'Cancelled',
};

export default function PurchaseOrdersShow({ order, warehouses }) {
    const { toast } = useToast();
    const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [receiveQuantities, setReceiveQuantities] = useState({});

    const { post, processing: receiving } = useForm({});

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    const calculateLineTotal = (item) => {
        return (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0);
    };

    const calculateGrandTotal = () => {
        if (!order.items) return 0;
        return order.items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
    };

    const calculateTotalReceived = () => {
        if (!order.items) return 0;
        return order.items.reduce((sum, item) => sum + (parseFloat(item.received_quantity) || 0), 0);
    };

    const calculateTotalExpected = () => {
        if (!order.items) return 0;
        return order.items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0);
    };

    const handleReceiveClick = () => {
        // Initialize receive quantities with remaining quantities
        const initialQuantities = {};
        order.items.forEach(item => {
            const remaining = item.quantity - item.received_quantity;
            if (remaining > 0) {
                initialQuantities[item.id] = remaining;
            }
        });
        setReceiveQuantities(initialQuantities);
        setReceiveDialogOpen(true);
    };

    const updateReceiveQuantity = (itemId, value) => {
        setReceiveQuantities({
            ...receiveQuantities,
            [itemId]: parseInt(value) || 0,
        });
    };

    const handleReceiveSubmit = () => {
        if (!selectedWarehouse) {
            toast({
                variant: 'destructive',
                title: 'Validation Error',
                description: 'Please select a warehouse.',
            });
            return;
        }

        post(route('purchase-orders.receive', order.id), {
            data: {
                warehouse_id: selectedWarehouse,
                items: receiveQuantities,
            },
            onSuccess: () => {
                setReceiveDialogOpen(false);
                toast({
                    title: 'Success',
                    description: 'Items received successfully.',
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to receive items. Please try again.',
                });
            },
        });
    };

    const canReceive = order.status === 'pending' || order.status === 'ordered';
    const isFullyReceived = order.items?.every(item => item.received_quantity >= item.quantity);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Purchase Orders', href: '/purchase-orders' },
                { title: `Order #${order.id}`, href: `/purchase-orders/${order.id}` },
            ]}
        >
            <Head title={`Purchase Order #${order.id}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('purchase-orders.index')}>Back</Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    PO-{order.id.toString().padStart(5, '0')}
                                </h1>
                                <Badge
                                    className={`${statusColors[order.status]} text-white`}
                                >
                                    {statusLabels[order.status] || order.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">
                                Created on {formatDate(order.order_date)}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {canReceive && !isFullyReceived && (
                            <Dialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleReceiveClick}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-1"
                                        >
                                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                                            <path d="m3.3 7 8.7 5 8.7-5" />
                                            <path d="M12 22V12" />
                                        </svg>
                                        Mark as Received
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Receive Items</DialogTitle>
                                        <DialogDescription>
                                            Record the receipt of items for this purchase order. Items will be
                                            added to the selected warehouse inventory.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label>Warehouse *</Label>
                                            <Select
                                                value={selectedWarehouse}
                                                onValueChange={setSelectedWarehouse}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a warehouse" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {warehouses.map((warehouse) => (
                                                        <SelectItem
                                                            key={warehouse.id}
                                                            value={warehouse.id.toString()}
                                                        >
                                                            {warehouse.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="border rounded-lg overflow-hidden">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b bg-muted/50">
                                                        <th className="px-3 py-2 text-left text-sm font-medium">
                                                            Product
                                                        </th>
                                                        <th className="px-3 py-2 text-right text-sm font-medium">
                                                            Ordered
                                                        </th>
                                                        <th className="px-3 py-2 text-right text-sm font-medium">
                                                            Already Received
                                                        </th>
                                                        <th className="px-3 py-2 text-right text-sm font-medium">
                                                            Receiving Now
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.items?.map((item) => {
                                                        const remaining = item.quantity - item.received_quantity;
                                                        return (
                                                            <tr key={item.id} className="border-b last:border-0">
                                                                <td className="px-3 py-2">
                                                                    <div>
                                                                        <span className="font-medium">
                                                                            {item.product?.name || 'Unknown Product'}
                                                                        </span>
                                                                        <span className="text-sm text-muted-foreground ml-2">
                                                                            ({item.product?.sku || 'N/A'})
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 py-2 text-right">
                                                                    {item.quantity}
                                                                </td>
                                                                <td className="px-3 py-2 text-right">
                                                                    <span className="text-muted-foreground">
                                                                        {item.received_quantity}
                                                                    </span>
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        max={remaining}
                                                                        value={receiveQuantities[item.id] || 0}
                                                                        onChange={(e) =>
                                                                            updateReceiveQuantity(item.id, e.target.value)
                                                                        }
                                                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-right"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setReceiveDialogOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleReceiveSubmit}
                                            disabled={receiving}
                                        >
                                            {receiving ? 'Processing...' : 'Confirm Receipt'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                        {order.status === 'pending' && (
                            <Button asChild variant="outline">
                                <Link href={route('purchase-orders.edit', order.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1"
                                    >
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                        <path d="m15 5 4 4" />
                                    </svg>
                                    Edit Order
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Order Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">Supplier</Label>
                                <p className="font-medium">
                                    {order.supplier?.name || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Order Date</Label>
                                <p className="font-medium">
                                    {formatDate(order.order_date)}
                                </p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Expected Delivery</Label>
                                <p className="font-medium">
                                    {formatDate(order.expected_delivery)}
                                </p>
                            </div>
                            {order.notes && (
                                <div>
                                    <Label className="text-muted-foreground">Notes</Label>
                                    <p className="font-medium whitespace-pre-wrap">
                                        {order.notes}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Summary Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">Total Items</Label>
                                <p className="font-medium">
                                    {order.items?.length || 0} product{(order.items?.length || 0) !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Total Quantity</Label>
                                <p className="font-medium">
                                    {calculateTotalExpected()} units
                                </p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Received</Label>
                                <p className="font-medium">
                                    {calculateTotalReceived()} units
                                </p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Order Total</Label>
                                <p className="text-2xl font-bold">
                                    {formatCurrency(order.total)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Supplier Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Supplier Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">Company</Label>
                                <p className="font-medium">
                                    {order.supplier?.name || 'N/A'}
                                </p>
                            </div>
                            {order.supplier?.contact_person && (
                                <div>
                                    <Label className="text-muted-foreground">Contact Person</Label>
                                    <p className="font-medium">
                                        {order.supplier.contact_person}
                                    </p>
                                </div>
                            )}
                            {order.supplier?.email && (
                                <div>
                                    <Label className="text-muted-foreground">Email</Label>
                                    <p className="font-medium">
                                        {order.supplier.email}
                                    </p>
                                </div>
                            )}
                            {order.supplier?.phone && (
                                <div>
                                    <Label className="text-muted-foreground">Phone</Label>
                                    <p className="font-medium">
                                        {order.supplier.phone}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Line Items Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Line Items</CardTitle>
                        <CardDescription>
                            Products included in this purchase order
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-3 py-2 text-left text-sm font-medium">
                                            Product
                                        </th>
                                        <th className="px-3 py-2 text-right text-sm font-medium">
                                            Quantity
                                        </th>
                                        <th className="px-3 py-2 text-right text-sm font-medium">
                                            Unit Price
                                        </th>
                                        <th className="px-3 py-2 text-right text-sm font-medium">
                                            Received
                                        </th>
                                        <th className="px-3 py-2 text-right text-sm font-medium">
                                            Line Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items?.map((item) => (
                                        <tr key={item.id} className="border-b last:border-0">
                                            <td className="px-3 py-2">
                                                <div>
                                                    <span className="font-medium">
                                                        {item.product?.name || 'Unknown Product'}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground ml-2">
                                                        ({item.product?.sku || 'N/A'})
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                {item.quantity}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                {formatCurrency(item.unit_price)}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className={item.received_quantity >= item.quantity ? 'text-green-600' : ''}>
                                                        {item.received_quantity}
                                                    </span>
                                                    {item.received_quantity < item.quantity && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {item.quantity - item.received_quantity} remaining
                                                        </Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-right font-medium">
                                                {formatCurrency(calculateLineTotal(item))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t bg-muted/50">
                                        <td colSpan="4" className="px-3 py-2 text-right font-medium">
                                            Grand Total:
                                        </td>
                                        <td className="px-3 py-2 text-right font-bold">
                                            {formatCurrency(calculateGrandTotal())}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}