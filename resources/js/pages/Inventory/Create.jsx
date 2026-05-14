import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function InventoryCreate({ products, warehouses }) {
    const { data, setData, post, errors, processing } = useForm({
        product_id: '',
        warehouse_id: '',
        quantity: '',
        min_stock_level: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('inventory.store'), {
            onSuccess: () => {
                toast.success('Inventory record created successfully.');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Failed to create inventory record.');
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Inventory', href: '/inventory' },
                { title: 'Add Inventory', href: '/inventory/create' },
            ]}
        >
            <Head title="Add Inventory" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('inventory.index')}>Back</Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Inventory</CardTitle>
                            <CardDescription>
                                Add a new inventory record to track stock levels
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="product_id">Product *</Label>
                                    <Select
                                        value={data.product_id}
                                        onValueChange={(value) =>
                                            setData('product_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map((product) => (
                                                <SelectItem
                                                    key={product.id}
                                                    value={product.id.toString()}
                                                >
                                                    {product.name} (SKU: {product.sku})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.product_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.product_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="warehouse_id">Warehouse *</Label>
                                    <Select
                                        value={data.warehouse_id}
                                        onValueChange={(value) =>
                                            setData('warehouse_id', value)
                                        }
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
                                                    {warehouse.name} ({warehouse.location})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.warehouse_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.warehouse_id}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="quantity">Quantity *</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            min="0"
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData('quantity', e.target.value)
                                            }
                                            placeholder="0"
                                            required
                                        />
                                        {errors.quantity && (
                                            <p className="text-sm text-destructive">
                                                {errors.quantity}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="min_stock_level">Minimum Stock Level *</Label>
                                        <Input
                                            id="min_stock_level"
                                            type="number"
                                            min="0"
                                            value={data.min_stock_level}
                                            onChange={(e) =>
                                                setData('min_stock_level', e.target.value)
                                            }
                                            placeholder="0"
                                            required
                                        />
                                        {errors.min_stock_level && (
                                            <p className="text-sm text-destructive">
                                                {errors.min_stock_level}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('inventory.index')}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Inventory'}
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