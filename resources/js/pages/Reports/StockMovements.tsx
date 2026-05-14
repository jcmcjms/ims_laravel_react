import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function StockMovements({ movements, products, warehouses, filters }) {
    const getMovementTypeBadge = (type) => {
        const variants = {
            purchase: 'default',
            sale: 'secondary',
            adjustment: 'outline',
            return: 'outline',
        };
        return variants[type] || 'outline';
    };

    const formatQuantity = (quantity, type) => {
        // For sales, quantity is negative, so show absolute value
        return type === 'sale' ? Math.abs(quantity) : quantity;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
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
                { title: 'Reports', href: '/reports/stock-movements' },
                { title: 'Stock Movements', href: '/reports/stock-movements' },
            ]}
        >
            <Head title="Stock Movements Report" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Stock Movements</h1>
                        <p className="text-muted-foreground">
                            History of inventory changes
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4">
                            <CardTitle>Movement History</CardTitle>
                            <form method="get" className="flex flex-wrap gap-2">
                                <Input
                                    type="date"
                                    name="start_date"
                                    defaultValue={filters.start_date || ''}
                                    className="w-40"
                                    placeholder="Start Date"
                                />
                                <Input
                                    type="date"
                                    name="end_date"
                                    defaultValue={filters.end_date || ''}
                                    className="w-40"
                                    placeholder="End Date"
                                />
                                <Select
                                    name="movement_type"
                                    defaultValue={filters.movement_type || ''}
                                >
                                    <SelectTrigger className="w-40">
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
                                    <SelectTrigger className="w-48">
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
                                <Button type="submit" variant="secondary">
                                    Filter
                                </Button>
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
                                                Reference
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movements.data.map((movement) => (
                                            <tr
                                                key={movement.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4">
                                                    <span className="text-sm text-muted-foreground">
                                                        {formatDate(movement.date)}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="font-medium">
                                                        {movement.product_name}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm text-muted-foreground">
                                                        {movement.product_sku}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm">
                                                        {movement.warehouse_name}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant={getMovementTypeBadge(movement.movement_type)}>
                                                        {movement.movement_type}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className={`font-medium ${movement.movement_type === 'sale' ? 'text-destructive' : ''}`}>
                                                        {movement.movement_type === 'sale' ? '-' : '+'}
                                                        {formatQuantity(movement.quantity, movement.movement_type)}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm text-muted-foreground">
                                                        {movement.reference_type && movement.reference_id
                                                            ? `${movement.reference_type} #${movement.reference_id}`
                                                            : '-'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {movements.links && movements.links.length > 3 && (
                    <div className="flex justify-center">
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
            </div>
        </AppLayout>
    );
}