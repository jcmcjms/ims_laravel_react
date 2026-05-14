import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Permission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    roles: Array<{
        id: number;
        name: string;
    }>;
}

interface PermissionsEditProps {
    permission: Permission;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
    },
    {
        title: 'Edit Permission',
        href: '/permissions/edit',
    },
];

export default function PermissionsEdit({ permission }: PermissionsEditProps) {
    const { data, setData, patch, errors, processing } = useForm({
        name: permission.name,
        description: permission.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('permissions.update', permission.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Permission" />

            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/permissions">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Permission</h1>
                        <p className="text-muted-foreground">Update permission information</p>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Permission Information</CardTitle>
                            <CardDescription>
                                Update the details for this permission
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Permission Name *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., users.view, products.create"
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            type="text"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Brief description of what this permission allows"
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                </div>

                                {permission.roles.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Assigned to Roles</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {permission.roles.map((role) => (
                                                <span
                                                    key={role.id}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                                                >
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            This permission is assigned to {permission.roles.length} role(s). Changes to this permission will affect all assigned roles.
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Permission'}
                                    </Button>
                                    <Button type="button" variant="outline" asChild>
                                        <Link href="/permissions">Cancel</Link>
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