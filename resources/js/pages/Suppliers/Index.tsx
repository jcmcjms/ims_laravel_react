import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { canCreate, canEdit, canDelete } from '@/lib/permissions';

export default function SuppliersIndex({ suppliers, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const userPermissions = props.auth?.user?.permissions || [] as string[];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Suppliers', href: '/suppliers' },
            ]}
        >
            <Head title="Suppliers" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
                        <p className="text-muted-foreground">
                            Manage your supplier contacts
                        </p>
                    </div>
                    {canCreate(userPermissions, 'suppliers') && (
                        <Button asChild>
                            <Link href={route('suppliers.create')}>Add Supplier</Link>
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
                            <CardTitle>All Suppliers</CardTitle>
                            <form method="get" className="flex gap-2">
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search by name, email, or contact..."
                                    defaultValue={filters.search || ''}
                                    className="w-64"
                                />
                                <Button type="submit" variant="secondary">
                                    Search
                                </Button>
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {suppliers.data.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No suppliers found. Create your first supplier to get started.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Name
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Contact Person
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Email
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Phone
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Products
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {suppliers.data.map((supplier) => (
                                            <tr
                                                key={supplier.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                                                            {supplier.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium">
                                                            {supplier.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    {supplier.contact_person ? (
                                                        <span className="text-sm">
                                                            {supplier.contact_person}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm">
                                                        {supplier.email}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    {supplier.phone ? (
                                                        <span className="text-sm">
                                                            {supplier.phone}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant="secondary">
                                                        {supplier.products_count || 0} products
                                                    </Badge>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex justify-end gap-2">
                                                        {canEdit(userPermissions, 'suppliers') && (
                                                            <Button
                                                                asChild
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        'suppliers.edit',
                                                                        supplier.id
                                                                    )}
                                                                >
                                                                    Edit
                                                                </Link>
                                                            </Button>
                                                        )}
                                                        {canDelete(userPermissions, 'suppliers') && (
                                                            <form
                                                                action={route(
                                                                    'suppliers.destroy',
                                                                    supplier.id
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
                                                                                'Are you sure you want to delete this supplier?'
                                                                            )
                                                                        ) {
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
                    </CardContent>
                </Card>

                {/* Pagination */}
                {suppliers.links && suppliers.links.length > 3 && (
                    <div className="flex justify-center">
                        <div className="flex gap-1">
                            {suppliers.links.map((link, index) => (
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