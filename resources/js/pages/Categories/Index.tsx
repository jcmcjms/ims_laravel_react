import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Pencil, Trash2, Plus } from 'lucide-react';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { canCreate, canEdit, canDelete } from '@/lib/permissions';

interface Category {
    id: number;
    name: string;
    description: string | null;
    parent_id: number | null;
    parent?: {
        id: number;
        name: string;
    } | null;
    children: Category[];
    products_count: number;
    created_at: string;
}

interface CategoriesIndexProps {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const { props } = usePage();
    const errors = props.errors as Record<string, string>;
    const flash = props.flash || {};
    const userPermissions = props.auth?.user?.permissions || [] as string[];
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
    };

    const renderCategoryRow = (category: Category, level = 0) => (
        <>
            <TableRow key={category.id}>
                <TableCell className={level > 0 ? 'pl-8' : ''}>
                    <span className={level > 0 ? 'text-muted-foreground' : ''}>
                        {category.name}
                    </span>
                </TableCell>
                <TableCell>{category.description || '-'}</TableCell>
                <TableCell>{category.parent?.name || '-'}</TableCell>
                <TableCell>{category.products_count}</TableCell>
                <TableCell>{formatDate(category.created_at)}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        {canEdit(userPermissions, 'categories') && (
                            <Button variant="outline" size="icon" asChild>
                                <Link href={`/categories/${category.id}/edit`}>
                                    <Pencil className="h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                        {canDelete(userPermissions, 'categories') && (
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteClick(category)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </TableCell>
            </TableRow>
            {category.children && category.children.map((child) => renderCategoryRow(child, level + 1))}
        </>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                        <p className="text-muted-foreground">Manage product categories</p>
                    </div>
                    {canCreate(userPermissions, 'categories') && (
                        <Button asChild>
                            <Link href="/categories/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Link>
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
                        <CardTitle>All Categories</CardTitle>
                        <CardDescription>
                            A list of all categories in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Parent</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No categories found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    categories.map((category) => renderCategoryRow(category))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this category? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {categoryToDelete && (
                        <div className="py-4">
                            <p className="font-medium">{categoryToDelete.name}</p>
                            {categoryToDelete.products_count > 0 && (
                                <p className="text-sm text-destructive mt-2">
                                    This category has {categoryToDelete.products_count} products and cannot be deleted.
                                </p>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <DeleteCategoryForm categoryId={categoryToDelete?.id} onSuccess={() => setDeleteDialogOpen(false)} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

function DeleteCategoryForm({ categoryId, onSuccess }: { categoryId?: number; onSuccess: () => void }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (!categoryId) return;

        destroy(route('categories.destroy', categoryId), {
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