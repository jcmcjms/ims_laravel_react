import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function InventoryValuation({ inventories, grandTotal, warehouses, filters }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    // Filter inventories by warehouse if selected
    const filteredInventories = filters.warehouse_id
        ? inventories.filter(inv => inv.warehouse_name === warehouses.find(w => w.id.toString() === filters.warehouse_id)?.name)
        : inventories;

    // Calculate filtered total
    const filteredTotal = filteredInventories.reduce((sum, inv) => sum + inv.total_value, 0);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Reports', href: '/reports/inventory-valuation' },
                { title: 'Inventory Valuation', href: '/reports/inventory-valuation' },
            ]}
        >
            <Head title="Inventory Valuation Report" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inventory Valuation</h1>
                        <p className="text-muted-foreground">
                            Current inventory value by product and warehouse
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Inventory Value Report</CardTitle>
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
                        {filteredInventories.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No inventory found.
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
                                                Cost Price
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Total Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInventories.map((inventory) => (
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
                                                    <span className="text-sm text-muted-foreground">
                                                        {inventory.product_sku}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm">
                                                        {inventory.warehouse_name}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className="text-sm">
                                                        {inventory.quantity}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className="text-sm">
                                                        {formatCurrency(inventory.cost_price)}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span className="font-medium">
                                                        {formatCurrency(inventory.total_value)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-muted/50">
                                            <td colSpan={5} className="py-4 text-right font-bold">
                                                Grand Total
                                            </td>
                                            <td className="py-4 text-right text-lg font-bold">
                                                {formatCurrency(filters.warehouse_id ? filteredTotal : grandTotal)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}