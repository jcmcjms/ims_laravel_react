import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function ProductsIndex({ products, categories, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Products', href: '/products' },
            ]}
        >
            <Head title="Products" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground">
                            Manage your product inventory
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('products.create')}>Add Product</Link>
                    </Button>
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
                            <CardTitle>All Products</CardTitle>
                            <form method="get" className="flex flex-wrap gap-2">
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search by name or SKU..."
                                    defaultValue={filters.search || ''}
                                    className="w-48"
                                />
                                <Select
                                    name="category_id"
                                    defaultValue={filters.category_id || ''}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Categories</SelectItem>
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
                                <Button type="submit" variant="secondary">
                                    Filter
                                </Button>
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {products.data.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No products found. Create your first product to get started.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Image
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Name
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                SKU
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Category
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Unit Price
                                            </th>
                                            <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                                                Cost Price
                                            </th>
                                            <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4">
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="h-12 w-12 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                                                            <span className="text-xs text-muted-foreground">
                                                                No Image
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    <span className="font-medium">
                                                        {product.name}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <Badge variant="outline">
                                                        {product.sku}
                                                    </Badge>
                                                </td>
                                                <td className="py-4">
                                                    {product.category ? (
                                                        <span className="text-sm">
                                                            {
                                                                product.category
                                                                    .name
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm">
                                                        $
                                                        {parseFloat(
                                                            product.unit_price
                                                        ).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-sm">
                                                        $
                                                        {parseFloat(
                                                            product.cost_price
                                                        ).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            asChild
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            <Link
                                                                href={route(
                                                                    'products.edit',
                                                                    product.id
                                                                )}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <form
                                                            action={route(
                                                                'products.destroy',
                                                                product.id
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
                                                                            'Are you sure you want to delete this product?'
                                                                        )
                                                                    ) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </form>
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
                {products.links && products.links.length > 3 && (
                    <div className="flex justify-center">
                        <div className="flex gap-1">
                            {products.links.map((link, index) => (
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