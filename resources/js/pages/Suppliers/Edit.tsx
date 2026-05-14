import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SuppliersEdit({ supplier }) {
    const { props } = usePage();
    const userPermissions = props.auth?.user?.permissions || [];

    useEffect(() => {
        if (!userPermissions.includes('edit-suppliers')) {
            router.visit('/unauthorized');
        }
    }, [userPermissions]);

    const { data, setData, patch, errors, processing } = useForm({
        name: supplier.name || '',
        contact_person: supplier.contact_person || '',
        email: supplier.email || '',
        phone: supplier.phone || '',
        address: supplier.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('suppliers.update', supplier.id), {
            onSuccess: () => {
                // Form will redirect on success
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Suppliers', href: '/suppliers' },
                { title: 'Edit Supplier', href: `/suppliers/${supplier.id}/edit` },
            ]}
        >
            <Head title="Edit Supplier" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('suppliers.index')}>Back</Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Supplier</CardTitle>
                            <CardDescription>
                                Update supplier information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Supplier Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Enter supplier name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_person">Contact Person</Label>
                                    <Input
                                        id="contact_person"
                                        type="text"
                                        value={data.contact_person}
                                        onChange={(e) =>
                                            setData('contact_person', e.target.value)
                                        }
                                        placeholder="Enter contact person name (optional)"
                                    />
                                    {errors.contact_person && (
                                        <p className="text-sm text-destructive">
                                            {errors.contact_person}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="supplier@example.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        placeholder="+1 (555) 000-0000 (optional)"
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-destructive">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        placeholder="Enter supplier address (optional)"
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-destructive">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('suppliers.index')}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Supplier'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}