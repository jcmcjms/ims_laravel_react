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

const movementTypeLabels = {
    purchase: 'Purchase',
    sale: 'Sale',
    adjustment: 'Adjustment',
    return: 'Return',
};

const movementTypeColors = {
    purchase: 'bg-green-500 text-white',
    sale: 'bg-red-500 text-white',
    adjustment: 'bg-blue-500 text-white',
    return: 'bg-purple-500 text-white',
};

export default function StockMovementsIndex({ movements, products, warehouses, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Stock Movements', href: '/stock-movements' },
            ]}
        >
            <Head title="Stock Movements" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Stock Movements</h1>
                        <p className="text-muted-foreground">
                            Track inventory changes and adjustments
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/stock-movements/adjust">Adjust Stock</Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('purchase-orders.create')}>New Purchase Order</Link>
                        </Button>
                    </div>
                </div>

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
                            <CardTitle>Movement History</CardTitle>
                            <form method="get" className="flex flex-wrap gap-2">
                                <Input
                                    type="date"
                                    name="date_from"
                                    defaultValue={filters.date_from || ''}
                                    className="w-36"
                                    placeholder="From"
                                />
                                <Input
                                    type="date"
                                    name="date_to"
                                    defaultValue={filters.date_to || ''}
                                    className="w-36"
                                    placeholder="To"
                                />
                                <Select
                                    name="movement_type"
                                    defaultValue={filters.movement_type || ''}
                                >
                                    <SelectTrigger className="w-36">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Types</SelectItem>
                                        <SelectItem value="purchase">Purchase</SelectItem>
                                        <SelectItem value="sale">Sale</SelectItem>
                                        <SelectItem value="adjustment">Adjustment</SelectItem>
                                        <SelectItem value="return">Return</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select
                                    name="product_id"
                                    defaultValue={filters.product_id || ''}
                                >
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="All Products" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Products</SelectItem>
                                        {products.map((product) => (
                                            <SelectItem
                                                key={product.id}
                                                value={product.id.toString()}
                                            >
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    name="warehouse_id"
                                    defaultValue={filters.warehouse_id || ''}
                                >
                                    <SelectTrigger className="w-40">
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
                                {(filters.date_from || filters.date_to || filters.movement_type || filters.product_id || filters.warehouse_id) && (
                                    <Button variant="outline" asChild>
                                        <Link href="/stock-movements">Clear</Link>
                                    </Button>
                                )}
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {movements.data.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No stock movements found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Date
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Product
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                SKU
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Warehouse
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Type
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Quantity
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Notes
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movements.data.map((movement) => (
                                            <tr
                                                key={movement.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4 text-sm">
                                                    {formatDate(movement.date)}
                                                </td>
                                                <td className="py-4">
                                                    <span className="font-medium">
                                                        {movement.product_name}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant="outline">
                                                        {movement.product_sku}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 text-muted-foreground">
                                                    {movement.warehouse_name}
                                                </td>
                                                <td className="py-4">
                                                    <Badge
                                                        className={
                                                            movementTypeColors[movement.movement_type] ||
                                                            'bg-gray-500 text-white'
                                                        }
                                                    >
                                                        {movementTypeLabels[movement.movement_type] ||
                                                            movement.movement_type}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span
                                                        className={
                                                            movement.movement_type === 'sale' ||
                                                            movement.movement_type === 'adjustment_remove'
                                                                ? 'text-red-600 font-medium'
                                                                : 'text-green-600 font-medium'
                                                        }
                                                    >
                                                        {movement.movement_type === 'sale' ||
                                                        movement.movement_type === 'adjustment'
                                                            ? '-' +
                                                              movement.quantity
                                                            : '+' +
                                                              movement.quantity}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-muted-foreground text-sm">
                                                    {movement.notes || '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {movements.links && movements.links.length > 3 && (
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-1">
                                    {movements.links.map((link, index) => (
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