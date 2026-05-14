import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function LowStock({ inventories, warehouses, filters }) {
    const getDeficitColor = (deficit) => {
        if (deficit > 20) return 'destructive';
        if (deficit > 10) return 'secondary';
        return 'default';
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Reports', href: '/reports/low-stock' },
                { title: 'Low Stock', href: '/reports/low-stock' },
            ]}
        >
            <Head title="Low Stock Report" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Low Stock</h1>
                        <p className="text-muted-foreground">
                            Products below minimum stock level
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Low Stock Items</CardTitle>
                            <form method="get" className="flex flex-wrap gap-2">
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
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {inventories.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No low stock items found.
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
                                                Current Qty
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Min Qty
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Deficit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventories.map((inventory) => (
                                            <tr
                                                key={inventory.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4">
                                                    <span className="font-medium">
                                                        {inventory.product_name}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant="outline">
                                                        {inventory.product_sku}
                                                    </Badge>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm">
                                                        {inventory.warehouse_name}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className="font-medium text-destructive">
                                                        {inventory.current_quantity}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className="text-sm">
                                                        {inventory.min_stock_level}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <Badge variant={getDeficitColor(inventory.deficit)}>
                                                        {inventory.deficit}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}