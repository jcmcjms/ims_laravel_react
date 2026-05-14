import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

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
import { Checkbox } from '@/components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
    id: number;
    name: string;
    description: string | null;
}

interface RolesCreateProps {
    permissions: Permission[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Create Role',
        href: '/roles/create',
    },
];

export default function RolesCreate({ permissions }: RolesCreateProps) {
    const { props } = usePage();
    const userPermissions = props.auth?.user?.permissions || [];

    useEffect(() => {
        if (!userPermissions.includes('create-roles')) {
            router.visit('/unauthorized');
        }
    }, [userPermissions]);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    // Group permissions by their first segment (e.g., "users", "products", etc.)
    const groupedPermissions = permissions.reduce((acc, permission) => {
        const parts = permission.name.split('.');
        const category = parts[0] || 'other';

        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    const toggleSection = (category: string) => {
        setOpenSections(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        description: '',
        permissions: [] as number[],
    });

    const handlePermissionToggle = (permissionId: number, checked: boolean) => {
        const currentPermissions = [...data.permissions];
        if (checked) {
            currentPermissions.push(permissionId);
        } else {
            const index = currentPermissions.indexOf(permissionId);
            if (index > -1) {
                currentPermissions.splice(index, 1);
            }
        }
        setData('permissions', currentPermissions);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('roles.store'), {
            onSuccess: () => {
                toast.success('Role created', {
                    description: 'The role has been created successfully.',
                });
            },
            onError: (errors) => {
                toast.error('Failed to create role', {
                    description: Object.values(errors).flat().join(', ') || 'An error occurred.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />

            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/roles">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Role</h1>
                        <p className="text-muted-foreground">Add a new role with permissions</p>
                    </div>
                </div>

                <div className="max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Information</CardTitle>
                            <CardDescription>
                                Enter the details for the new role and select permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Role Name *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., admin, manager, editor"
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
                                            placeholder="Brief description"
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label>Permissions</Label>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Select the permissions to assign to this role
                                        </p>
                                    </div>

                                    {Object.keys(groupedPermissions).length === 0 ? (
                                        <p className="text-muted-foreground py-4">
                                            No permissions available. Please create permissions first.
                                        </p>
                                    ) : (
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {Object.entries(groupedPermissions).map(([category, perms]) => (
                                                <Collapsible
                                                    key={category}
                                                    open={openSections[category] ?? false}
                                                    onOpenChange={() => toggleSection(category)}
                                                >
                                                    <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium bg-muted rounded-md hover:bg-muted/80">
                                                        <span className="capitalize">{category}</span>
                                                        {openSections[category] ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent className="space-y-2 mt-2">
                                                        {perms.map((permission) => (
                                                            <div
                                                                key={permission.id}
                                                                className="flex items-center gap-2 ml-2"
                                                            >
                                                                <Checkbox
                                                                    id={`permission-${permission.id}`}
                                                                    checked={data.permissions.includes(permission.id)}
                                                                    onCheckedChange={(checked) =>
                                                                        handlePermissionToggle(permission.id, checked as boolean)
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={`permission-${permission.id}`}
                                                                    className="text-sm cursor-pointer"
                                                                >
                                                                    {permission.name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            ))}
                                        </div>
                                    )}
                                    <InputError message={errors.permissions} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Role'}
                                    </Button>
                                    <Button type="button" variant="outline" asChild>
                                        <Link href="/roles">Cancel</Link>
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