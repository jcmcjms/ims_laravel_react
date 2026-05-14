import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function WarehousesEdit({ warehouse }) {
    const { props } = usePage();
    const userPermissions = props.auth?.user?.permissions || [];

    useEffect(() => {
        if (!userPermissions.includes('edit-warehouses')) {
            router.visit('/unauthorized');
        }
    }, [userPermissions]);

    const { data, setData, put, errors, processing } = useForm({
        name: warehouse.name || '',
        location: warehouse.location || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('warehouses.update', warehouse.id), {
            onSuccess: () => {
                // Form will redirect on success
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Warehouses', href: '/warehouses' },
                { title: 'Edit Warehouse', href: `/warehouses/${warehouse.id}/edit` },
            ]}
        >
            <Head title="Edit Warehouse" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('warehouses.index')}>
                            Back
                        </Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Warehouse</CardTitle>
                            <CardDescription>
                                Update the warehouse details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Warehouse name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Warehouse address or location description (optional)"
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-destructive">{errors.location}</p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('warehouses.index')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : 'Save Changes'}
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