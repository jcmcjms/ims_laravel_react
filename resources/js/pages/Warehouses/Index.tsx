import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { canCreate, canEdit, canDelete } from '@/lib/permissions';

export default function WarehousesIndex({ warehouses, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const userPermissions = props.auth?.user?.permissions || [] as string[];

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
                        <p className="text-muted-foreground">
                            Manage your warehouse locations
                        </p>
                    </div>
                    {canCreate(userPermissions, 'warehouses') && (
                        <Button asChild>
                            <Link href={route('warehouses.create')}>Add Warehouse</Link>
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
                            <CardTitle>All Warehouses</CardTitle>
                            <form method="get" className="flex gap-2">
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search warehouses..."
                                    defaultValue={filters.search || ''}
                                    className="w-64"
                                />
                                <Button type="submit" variant="secondary">
                                    Search
                                </Button>
                                {filters.search && (
                                    <Button variant="outline" asChild>
                                        <Link href="/warehouses">Clear</Link>
                                    </Button>
                                )}
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {warehouses.data.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No warehouses found.
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
                                        {warehouses.data.map((warehouse) => (
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
                                                        {canEdit(userPermissions, 'warehouses') && (
                                                            <Button asChild size="sm" variant="outline">
                                                                <Link href={route('warehouses.edit', warehouse.id)}>
                                                                    Edit
                                                                </Link>
                                                            </Button>
                                                        )}
                                                        {canDelete(userPermissions, 'warehouses') && (
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
                        {warehouses.links && warehouses.links.length > 3 && (
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-1">
                                    {warehouses.links.map((link, index) => (
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