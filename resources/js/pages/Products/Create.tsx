import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function ProductsCreate({ categories }) {
    const { props } = usePage();
    const userPermissions = props.auth?.user?.permissions || [];

    useEffect(() => {
        if (!userPermissions.includes('create-products')) {
            router.visit('/unauthorized');
        }
    }, [userPermissions]);

    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        sku: '',
        description: '',
        category_id: '',
        unit_price: '',
        cost_price: '',
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                // Form will redirect on success
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Products', href: '/products' },
                { title: 'Create Product', href: '/products/create' },
            ]}
        >
            <Head title="Create Product" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('products.index')}>Back</Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Product</CardTitle>
                            <CardDescription>
                                Add a new product to your inventory
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="Product name"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sku">SKU *</Label>
                                        <Input
                                            id="sku"
                                            type="text"
                                            value={data.sku}
                                            onChange={(e) =>
                                                setData('sku', e.target.value)
                                            }
                                            placeholder="Product SKU"
                                            required
                                        />
                                        {errors.sku && (
                                            <p className="text-sm text-destructive">
                                                {errors.sku}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData('description', e.target.value)
                                        }
                                        placeholder="Product description (optional)"
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select
                                        value={data.category_id}
                                        onValueChange={(value) =>
                                            setData(
                                                'category_id',
                                                value === 'none' ? '' : value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">
                                                No Category
                                            </SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="unit_price">Unit Price *</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                $
                                            </span>
                                            <Input
                                                id="unit_price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.unit_price}
                                                onChange={(e) =>
                                                    setData(
                                                        'unit_price',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                className="pl-7"
                                                required
                                            />
                                        </div>
                                        {errors.unit_price && (
                                            <p className="text-sm text-destructive">
                                                {errors.unit_price}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cost_price">Cost Price *</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                $
                                            </span>
                                            <Input
                                                id="cost_price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.cost_price}
                                                onChange={(e) =>
                                                    setData(
                                                        'cost_price',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                className="pl-7"
                                                required
                                            />
                                        </div>
                                        {errors.cost_price && (
                                            <p className="text-sm text-destructive">
                                                {errors.cost_price}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Product Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Max file size: 2MB. Supported formats: JPG,
                                        PNG, GIF, WebP
                                    </p>
                                    {errors.image && (
                                        <p className="text-sm text-destructive">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>

                                {imagePreview && (
                                    <div className="space-y-2">
                                        <Label>Image Preview</Label>
                                        <div className="relative w-48 h-48 rounded-md overflow-hidden border">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setData('image', null);
                                                    document.getElementById(
                                                        'image'
                                                    ).value = '';
                                                }}
                                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-4">
                                    <Button asChild variant="outline">
                                        <Link href={route('products.index')}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Product'}
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