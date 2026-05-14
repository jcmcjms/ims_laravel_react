import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { canCreate, canEdit, canDelete, canView } from '@/lib/permissions';

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

export default function PurchaseOrdersIndex({ orders, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const userPermissions = props.auth?.user?.permissions || [] as string[];

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

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Purchase Orders', href: '/purchase-orders' },
            ]}
        >
            <Head title="Purchase Orders" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
                        <p className="text-muted-foreground">
                            Manage purchase orders from suppliers
                        </p>
                    </div>
                    {canCreate(userPermissions, 'purchase-orders') && (
                        <Button asChild>
                            <Link href={route('purchase-orders.create')}>Create Order</Link>
                        </Button>
                    )}
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
                            <CardTitle>All Orders</CardTitle>
                            <form method="get" className="flex gap-2">
                                <Select
                                    name="status"
                                    defaultValue={filters.status || 'none'}
                                >
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">All Statuses</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="ordered">Ordered</SelectItem>
                                        <SelectItem value="received">Received</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button type="submit" variant="secondary">
                                    Filter
                                </Button>
                                {filters.status && (
                                    <Button variant="outline" asChild>
                                        <Link href="/purchase-orders">Clear</Link>
                                    </Button>
                                )}
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {orders.data.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No purchase orders found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Order #
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Supplier
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Order Date
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Expected Delivery
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Items
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Total
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.data.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4">
                                                    <span className="font-medium">
                                                        PO-{order.id.toString().padStart(5, '0')}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    {order.supplier?.name || 'N/A'}
                                                </td>
                                                <td className="py-4">
                                                    {formatDate(order.order_date)}
                                                </td>
                                                <td className="py-4 text-muted-foreground">
                                                    {formatDate(order.expected_delivery)}
                                                </td>
                                                <td className="py-4">
                                                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                                                </td>
                                                <td className="py-4 text-right font-medium">
                                                    {formatCurrency(order.total)}
                                                </td>
                                                <td className="py-4">
                                                    <Badge
                                                        className={
                                                            statusColors[order.status] +
                                                            ' text-white'
                                                        }
                                                    >
                                                        {statusLabels[order.status] || order.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {canView(userPermissions, 'purchase-orders') && (
                                                            <Button
                                                                asChild
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        'purchase-orders.show',
                                                                        order.id
                                                                    )}
                                                                >
                                                                    View
                                                                </Link>
                                                            </Button>
                                                        )}
                                                        {canEdit(userPermissions, 'purchase-orders') && order.status === 'pending' && (
                                                            <>
                                                                <Button
                                                                    asChild
                                                                    size="sm"
                                                                    variant="outline"
                                                                >
                                                                    <Link
                                                                        href={route(
                                                                            'purchase-orders.edit',
                                                                            order.id
                                                                        )}
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </Button>
                                                                <form
                                                                    action={route(
                                                                        'purchase-orders.destroy',
                                                                        order.id
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
                                                                                    'Are you sure you want to delete this purchase order?'
                                                                                )
                                                                            ) {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </form>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {orders.links && orders.links.length > 3 && (
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-1">
                                    {orders.links.map((link, index) => (
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