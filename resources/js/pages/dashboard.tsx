import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { type BreadcrumbItem } from '@/types';

interface RecentMovement {
    id: number;
    product_name: string;
    product_sku: string;
    warehouse_name: string;
    type: string;
    quantity: number;
    created_at: string;
}

interface RecentOrder {
    id: number;
    supplier_name: string;
    order_date: string | null;
    expected_delivery: string | null;
    status: string;
    total: number;
}

interface TopCategory {
    id: number;
    name: string;
    product_count: number;
}

interface LowStockAlert {
    id: number;
    product_name: string;
    product_sku: string;
    warehouse_name: string;
    current_quantity: number;
    min_stock_level: number;
    shortage: number;
}

interface DashboardProps {
    totalProducts: number;
    totalCategories: number;
    lowStockItems: number;
    totalInventoryValue: number;
    recentMovements: RecentMovement[];
    recentOrders: RecentOrder[];
    topCategories: TopCategory[];
    lowStockAlerts: LowStockAlert[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(value);
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getMovementTypeBadgeVariant(type: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (type) {
        case 'purchase':
            return 'default';
        case 'sale':
            return 'secondary';
        case 'adjustment':
            return 'outline';
        case 'return':
            return 'secondary';
        default:
            return 'outline';
    }
}

function getOrderStatusBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
        case 'pending':
            return 'secondary';
        case 'ordered':
            return 'default';
        case 'received':
            return 'outline';
        case 'cancelled':
            return 'destructive';
        default:
            return 'outline';
    }
}

export default function Dashboard({
    totalProducts,
    totalCategories,
    lowStockItems,
    totalInventoryValue,
    recentMovements,
    recentOrders,
    topCategories,
    lowStockAlerts,
}: DashboardProps) {
    const props = usePage().props as { show_welcome?: boolean; auth?: { user?: { name?: string } } };
    const toastShown = useRef(false);

    useEffect(() => {
        if (props.show_welcome && props.auth?.user?.name && !toastShown.current) {
            const firstName = props.auth.user.name.split(' ')[0];
            toast.success(`Welcome, ${firstName}!`, {
                description: 'You are now logged in.',
            });
            toastShown.current = true;
        }
    }, [props.show_welcome, props.auth?.user?.name]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your inventory management system
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Products
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalProducts}</div>
                            <p className="text-xs text-muted-foreground">
                                Products in inventory
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Low Stock Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-yellow-600">{lowStockItems}</div>
                            <p className="text-xs text-muted-foreground">
                                Items below threshold
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Inventory Value
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{formatCurrency(totalInventoryValue)}</div>
                            <p className="text-xs text-muted-foreground">
                                At cost price
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Categories
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalCategories}</div>
                            <p className="text-xs text-muted-foreground">
                                Product categories
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Stock Movements */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Stock Movements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentMovements.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No stock movements yet.
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentMovements.map((movement) => (
                                            <tr
                                                key={movement.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-3 text-sm">
                                                    {formatDate(movement.created_at)}
                                                </td>
                                                <td className="py-3 text-sm font-medium">
                                                    {movement.product_name}
                                                </td>
                                                <td className="py-3 text-sm">
                                                    <Badge variant="outline" className="text-xs">
                                                        {movement.product_sku}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 text-sm">
                                                    {movement.warehouse_name}
                                                </td>
                                                <td className="py-3">
                                                    <Badge variant={getMovementTypeBadgeVariant(movement.type)}>
                                                        {movement.type}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 text-right text-sm font-medium">
                                                    {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recent Purchase Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Purchase Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentOrders.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    No purchase orders yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">
                                                    Order #{order.id}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {order.supplier_name}
                                                </p>
                                                {order.order_date && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDate(order.order_date)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                                                    {order.status}
                                                </Badge>
                                                <p className="mt-1 text-sm font-medium">
                                                    {formatCurrency(order.total)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Low Stock Alerts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Low Stock Alerts
                                {lowStockAlerts.length > 0 && (
                                    <Badge variant="destructive" className="ml-2">
                                        {lowStockAlerts.length}
                                    </Badge>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {lowStockAlerts.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    No low stock alerts. All items are well-stocked.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {lowStockAlerts.slice(0, 5).map((alert) => (
                                        <div
                                            key={alert.id}
                                            className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">
                                                    {alert.product_name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {alert.warehouse_name} &bull; SKU: {alert.product_sku}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                                                    {alert.current_quantity} / {alert.min_stock_level}
                                                </p>
                                                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                                                    -{alert.shortage} needed
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {lowStockAlerts.length > 5 && (
                                        <p className="text-center text-sm text-muted-foreground">
                                            +{lowStockAlerts.length - 5} more alerts
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Top Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {topCategories.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No categories found.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {topCategories.map((category, index) => (
                                    <div key={category.id} className="flex items-center gap-4">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{category.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">
                                                {category.product_count} products
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}