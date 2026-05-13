import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function WarehousesIndex({ warehouses }) {
    const { props } = usePage();
    const flash = props.flash || {};

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Warehouses', href: '/warehouses' },
            ]}
        >
            <Head title="Warehouses" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Warehouses</h1>
                        <p className="text-muted-foreground">Manage your warehouse locations</p>
                    </div>
                    <Button asChild>
                        <Link href={route('warehouses.create')}>Add Warehouse</Link>
                    </Button>
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
                        <CardTitle>All Warehouses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {warehouses.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No warehouses found. Create your first warehouse to get started.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Location</th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Inventory</th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {warehouses.map((warehouse) => (
                                            <tr key={warehouse.id} className="border-b last:border-0">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                                                            {warehouse.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium">{warehouse.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-muted-foreground">
                                                    {warehouse.location || '-'}
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant="secondary">
                                                        {warehouse.inventory_count || 0} items
                                                    </Badge>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button asChild size="sm" variant="outline">
                                                            <Link href={route('warehouses.edit', warehouse.id)}>
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <form
                                                            action={route('warehouses.destroy', warehouse.id)}
                                                            method="post"
                                                            className="inline"
                                                        >
                                                            <input type="hidden" name="_method" value="delete" />
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={(e) => {
                                                                    if (!confirm('Are you sure you want to delete this warehouse?')) {
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
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}