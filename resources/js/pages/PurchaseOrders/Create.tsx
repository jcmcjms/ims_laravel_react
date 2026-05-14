import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function PurchaseOrdersCreate({ suppliers, products }) {
    const [items, setItems] = useState([
        { product_id: '', quantity: 1, unit_price: '' }
    ]);

    const { data, setData, post, errors, processing } = useForm({
        supplier_id: '',
        order_date: new Date().toISOString().split('T')[0],
        expected_delivery: '',
        notes: '',
    });

    const addItem = () => {
        setItems([...items, { product_id: '', quantity: 1, unit_price: '' }]);
    };

    const removeItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate items
        const validItems = items.filter(
            item => item.product_id && item.quantity > 0 && item.unit_price !== ''
        );

        if (validItems.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Validation Error',
                description: 'Please add at least one valid line item.',
            });
            return;
        }

        post(route('purchase-orders.store'), {
            data: {
                ...data,
                items: validItems,
            },
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Purchase order created successfully.',
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to create purchase order. Please check your inputs.',
                });
            },
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    const calculateLineTotal = (item) => {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.unit_price) || 0;
        return qty * price;
    };

    const calculateGrandTotal = () => {
        return items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
    };

    const getAvailableProducts = (currentIndex) => {
        return products.filter(product => {
            // Allow the currently selected product
            const currentItem = items[currentIndex];
            if (currentItem && currentItem.product_id === product.id.toString()) {
                return true;
            }
            // Exclude products already selected in other rows
            return !items.some((item, i) =>
                i !== currentIndex && item.product_id === product.id.toString()
            );
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Purchase Orders', href: '/purchase-orders' },
                { title: 'Create Order', href: '/purchase-orders/create' },
            ]}
        >
            <Head title="Create Purchase Order" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('purchase-orders.index')}>Back</Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-4xl w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Purchase Order</CardTitle>
                            <CardDescription>
                                Create a new purchase order from a supplier
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Supplier and Dates */}
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="supplier_id">Supplier *</Label>
                                        <Select
                                            value={data.supplier_id}
                                            onValueChange={(value) =>
                                                setData('supplier_id', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a supplier" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {suppliers.map((supplier) => (
                                                    <SelectItem
                                                        key={supplier.id}
                                                        value={supplier.id.toString()}
                                                    >
                                                        {supplier.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.supplier_id && (
                                            <p className="text-sm text-destructive">
                                                {errors.supplier_id}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="order_date">Order Date *</Label>
                                        <Input
                                            id="order_date"
                                            type="date"
                                            value={data.order_date}
                                            onChange={(e) =>
                                                setData('order_date', e.target.value)
                                            }
                                            required
                                        />
                                        {errors.order_date && (
                                            <p className="text-sm text-destructive">
                                                {errors.order_date}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="expected_delivery">Expected Delivery</Label>
                                        <Input
                                            id="expected_delivery"
                                            type="date"
                                            value={data.expected_delivery}
                                            onChange={(e) =>
                                                setData('expected_delivery', e.target.value)
                                            }
                                        />
                                        {errors.expected_delivery && (
                                            <p className="text-sm text-destructive">
                                                {errors.expected_delivery}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData('notes', e.target.value)
                                        }
                                        placeholder="Add any notes for this order (optional)"
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    />
                                    {errors.notes && (
                                        <p className="text-sm text-destructive">
                                            {errors.notes}
                                        </p>
                                    )}
                                </div>

                                {/* Line Items */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Line Items *</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addItem}
                                        >
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
                                                <path d="M5 12h14" />
                                                <path d="M12 5v14" />
                                            </svg>
                                            Add Item
                                        </Button>
                                    </div>

                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b bg-muted/50">
                                                    <th className="px-3 py-2 text-left text-sm font-medium">
                                                        Product
                                                    </th>
                                                    <th className="px-3 py-2 text-left text-sm font-medium w-32">
                                                        Quantity
                                                    </th>
                                                    <th className="px-3 py-2 text-left text-sm font-medium w-40">
                                                        Unit Price
                                                    </th>
                                                    <th className="px-3 py-2 text-right text-sm font-medium w-32">
                                                        Total
                                                    </th>
                                                    <th className="px-3 py-2 w-12"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) => (
                                                    <tr key={index} className="border-b last:border-0">
                                                        <td className="px-3 py-2">
                                                            <Select
                                                                value={item.product_id}
                                                                onValueChange={(value) =>
                                                                    updateItem(index, 'product_id', value)
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select product" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {getAvailableProducts(index).map((product) => (
                                                                        <SelectItem
                                                                            key={product.id}
                                                                            value={product.id.toString()}
                                                                        >
                                                                            {product.name} ({product.sku})
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                value={item.quantity}
                                                                onChange={(e) =>
                                                                    updateItem(index, 'quantity', e.target.value)
                                                                }
                                                                className="w-full"
                                                            />
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                                    $
                                                                </span>
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    value={item.unit_price}
                                                                    onChange={(e) =>
                                                                        updateItem(index, 'unit_price', e.target.value)
                                                                    }
                                                                    placeholder="0.00"
                                                                    className="w-full pl-7"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-2 text-right font-medium">
                                                            {formatCurrency(calculateLineTotal(item))}
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeItem(index)}
                                                                disabled={items.length === 1}
                                                                className="text-destructive hover:text-destructive"
                                                            >
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
                                                                >
                                                                    <path d="M3 6h18" />
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                                </svg>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="border-t bg-muted/50">
                                                    <td colSpan="3" className="px-3 py-2 text-right font-medium">
                                                        Grand Total:
                                                    </td>
                                                    <td className="px-3 py-2 text-right font-bold">
                                                        {formatCurrency(calculateGrandTotal())}
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    {errors.items && (
                                        <p className="text-sm text-destructive">
                                            {errors.items}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end gap-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('purchase-orders.index')}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Purchase Order'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}