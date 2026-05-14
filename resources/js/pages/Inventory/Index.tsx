import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function InventoryIndex({ inventories, warehouses, lowStockCount, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Inventory', href: '/inventory' },
            ]}
        >
            <Head title="Inventory" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
                        <p className="text-muted-foreground">
                            Track inventory levels across warehouses
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/stock-movements/adjust">Adjust Stock</Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('inventory.create')}>Add Inventory</Link>
                        </Button>
                    </div>
                </div>

                {lowStockCount > 0 && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {lowStockCount} item{lowStockCount !== 1 ? 's' : ''} below minimum stock level
                        </AlertDescription>
                    </Alert>
                )}

                {(flash.success || flash.error) && (
                    <Alert variant={flash.error ? 'destructive' : 'default'}>
                        <AlertDescription>
                            {flash.success || flash.error}
                        </AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>All Inventory</CardTitle>
                            <form method="get" className="flex flex-wrap gap-2">
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search by product name or SKU..."
                                    defaultValue={filters.search || ''}
                                    className="w-48"
                                />
                                <Select
                                    name="warehouse_id"
                                    defaultValue={filters.warehouse_id || ''}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="All Warehouses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Warehouses</SelectItem>
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
                                <Button type="submit" variant="secondary">
                                    Filter
                                </Button>
                                {(filters.search || filters.warehouse_id) && (
                                    <Button variant="outline" asChild>
                                        <Link href="/inventory">Clear</Link>
                                    </Button>
                                )}
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {inventories.data.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No inventory records found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Product
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                SKU
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Warehouse
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Quantity
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Min Stock
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventories.data.map((inventory) => (
                                            <tr
                                                key={inventory.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4">
                                                    <span className="font-medium">
                                                        {inventory.product?.name || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant="outline">
                                                        {inventory.product?.sku || 'N/A'}
                                                    </Badge>
                                                </td>
                                                <td className="py-4">
                                                    {inventory.warehouse?.name || 'N/A'}
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className="font-medium">
                                                        {inventory.quantity}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right text-muted-foreground">
                                                    {inventory.min_stock_level}
                                                </td>
                                                <td className="py-4 text-right">
                                                    {inventory.quantity <= inventory.min_stock_level ? (
                                                        <Badge variant="destructive">Low Stock</Badge>
                                                    ) : (
                                                        <Badge variant="default">In Stock</Badge>
                                                    )}
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            asChild
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            <Link
                                                                href={route(
                                                                    'inventory.edit',
                                                                    inventory.id
                                                                )}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <form
                                                            action={route(
                                                                'inventory.destroy',
                                                                inventory.id
                                                            )}
                                                            method="post"
                                                            className="inline"
                                                        >
                                                            <input
                                                                type="hidden"
                                                                name="_method"
                                                                value="delete"
                                                            />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={(e) => {
                                                                    if (
                                                                        !confirm(
                                                                            'Are you sure you want to delete this inventory record?'
                                                                        )
                                                                    ) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {inventories.links && inventories.links.length > 3 && (
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-1">
                                    {inventories.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            asChild
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            disabled={!link.url}
                                        >
                                            {link.url ? (
                                                <Link href={link.url}>
                                                    {link.label
                                                        .replace('&laquo;', '«')
                                                        .replace('&raquo;', '»')}
                                                </Link>
                                            ) : (
                                                <span>{link.label}</span>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}