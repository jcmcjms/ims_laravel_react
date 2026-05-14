import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Category {
    id: number;
    name: string;
    description: string | null;
    parent_id: number | null;
}

interface CategoriesEditProps {
    category: Category;
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
    {
        title: 'Edit Category',
        href: '/categories/edit',
    },
];

export default function CategoriesEdit({ category, categories }: CategoriesEditProps) {
    const { props } = usePage();

    const { data, setData, put, errors, processing } = useForm({
        name: category.name || '',
        description: category.description || '',
        parent_id: category.parent_id?.toString() || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('categories.update', category.id), {
            onSuccess: () => {
                toast.success('Category updated', {
                    description: 'The category has been updated successfully.',
                });
            },
            onError: (errors) => {
                toast.error('Failed to update category', {
                    description: Object.values(errors).flat().join(', ') || 'An error occurred.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />

            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/categories">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
                        <p className="text-muted-foreground">Update category information</p>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Information</CardTitle>
                            <CardDescription>
                                Update the category details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Category name"
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
                                        placeholder="Category description"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="parent_id">Parent Category</Label>
                                    <Select value={data.parent_id} onValueChange={(value) => setData('parent_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a parent category (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">None</SelectItem>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.parent_id} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Category'}
                                    </Button>
                                    <Button type="button" variant="outline" asChild>
                                        <Link href="/categories">Cancel</Link>
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