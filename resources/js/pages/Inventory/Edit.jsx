import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function InventoryEdit({ inventory, products, warehouses }) {
    const { data, setData, put, errors, processing } = useForm({
        product_id: inventory.product_id?.toString() || '',
        warehouse_id: inventory.warehouse_id?.toString() || '',
        quantity: inventory.quantity?.toString() || '0',
        min_stock_level: inventory.min_stock_level?.toString() || '0',
    });

    // Determine if stock is low
    const isLowStock = parseInt(data.quantity) <= parseInt(data.min_stock_level);

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('inventory.update', inventory.id), {
            onSuccess: () => {
                toast.success('Inventory updated successfully.');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Failed to update inventory.');
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Inventory', href: '/inventory' },
                { title: 'Edit Inventory', href: `/inventory/${inventory.id}/edit` },
            ]}
        >
            <Head title="Edit Inventory" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('inventory.index')}>Back</Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Inventory</CardTitle>
                            <CardDescription>
                                Update the inventory stock levels
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Product - Read only */}
                                <div className="space-y-2">
                                    <Label htmlFor="product_id">Product</Label>
                                    <Input
                                        id="product_id"
                                        type="text"
                                        value={inventory.product?.name || 'N/A'}
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Product cannot be changed once inventory is created.
                                    </p>
                                </div>

                                {/* Warehouse - Read only */}
                                <div className="space-y-2">
                                    <Label htmlFor="warehouse_id">Warehouse</Label>
                                    <Input
                                        id="warehouse_id"
                                        type="text"
                                        value={inventory.warehouse?.name || 'N/A'}
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Warehouse cannot be changed once inventory is created.
                                    </p>
                                </div>

                                {/* SKU - Read only badge */}
                                <div className="space-y-2">
                                    <Label>Product SKU</Label>
                                    <div>
                                        <Badge variant="outline">
                                            {inventory.product?.sku || 'N/A'}
                                        </Badge>
                                    </div>
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

                                {/* Stock Status */}
                                <div className="space-y-2">
                                    <Label>Stock Status</Label>
                                    <div>
                                        {isLowStock ? (
                                            <Badge variant="destructive">Low Stock</Badge>
                                        ) : (
                                            <Badge variant="default">In Stock</Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Current quantity ({data.quantity}) vs minimum stock level ({data.min_stock_level})
                                    </p>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('inventory.index')}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : 'Save Changes'}
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