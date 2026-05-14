import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Key } from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Permission {
    id: number;
    name: string;
    description: string | null;
    guard_name: string;
    roles_count: number;
    created_at: string;
}

interface PermissionsIndexProps {
    permissions: Permission[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
    },
];

export default function PermissionsIndex({ permissions }: PermissionsIndexProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [permissionToDelete, setPermissionToDelete] = useState<Permission | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDeleteClick = (permission: Permission) => {
        setPermissionToDelete(permission);
        setDeleteDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />

            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
                        <p className="text-muted-foreground">Manage system permissions and access controls</p>
                    </div>
                    <Button asChild>
                        <Link href="/permissions/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Permission
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Permissions</CardTitle>
                        <CardDescription>
                            A list of all permissions available in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Guard</TableHead>
                                    <TableHead>Roles</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No permissions found. Create your first permission to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    permissions.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Key className="h-4 w-4 text-muted-foreground" />
                                                    {permission.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {permission.description || (
                                                    <span className="text-muted-foreground">No description</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {permission.guard_name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {permission.roles_count} role{permission.roles_count !== 1 ? 's' : ''}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{formatDate(permission.created_at)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="outline" size="icon" asChild>
                                                        <Link href={`/permissions/${permission.id}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => handleDeleteClick(permission)}
                                                        disabled={permission.roles_count > 0}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Permission</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this permission? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {permissionToDelete && (
                        <div className="py-4">
                            <p className="font-medium">{permissionToDelete.name}</p>
                            {permissionToDelete.description && (
                                <p className="text-sm text-muted-foreground">{permissionToDelete.description}</p>
                            )}
                            {permissionToDelete.roles_count > 0 && (
                                <p className="text-sm text-destructive mt-2">
                                    This permission is assigned to {permissionToDelete.roles_count} role(s) and cannot be deleted.
                                </p>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        {permissionToDelete && permissionToDelete.roles_count === 0 && (
                            <DeletePermissionForm permissionId={permissionToDelete.id} onSuccess={() => setDeleteDialogOpen(false)} />
                        )}
                        {permissionToDelete && permissionToDelete.roles_count > 0 && (
                            <Button variant="destructive" disabled>
                                Delete
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

function DeletePermissionForm({ permissionId, onSuccess }: { permissionId: number; onSuccess: () => void }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        destroy(route('permissions.destroy', permissionId), {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <Button variant="destructive" onClick={handleDelete}>
            Delete
        </Button>
    );
}