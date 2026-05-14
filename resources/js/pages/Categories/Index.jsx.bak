import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CategoriesIndex({ categories }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const renderCategory = (category, depth = 0) => {
        return (
            <div key={category.id} className="mb-2">
                <Card className={depth > 0 ? 'ml-6' : ''}>
                    <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium"
                                >
                                    {category.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{category.name}</h3>
                                    {category.description && (
                                        <p className="text-sm text-muted-foreground">{category.description}</p>
                                    )}
                                    {category.parent && (
                                        <p className="text-xs text-muted-foreground">
                                            Parent: {category.parent.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant="secondary">
                                    {category.products_count || 0} products
                                </Badge>
                                <div className="flex gap-2">
                                    <Button asChild size="sm" variant="outline">
                                        <Link href={route('categories.edit', category.id)}>
                                            Edit
                                        </Link>
                                    </Button>
                                    <form
                                        action={route('categories.destroy', category.id)}
                                        method="post"
                                        className="inline"
                                    >
                                        <input type="hidden" name="_method" value="delete" />
                                        <Button
                                            type="submit"
                                            size="sm"
                                            variant="destructive"
                                            onClick={(e) => {
                                                if (!confirm('Are you sure you want to delete this category?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {category.children && category.children.length > 0 && (
                    <div className="mt-2">
                        {category.children.map((child) => renderCategory(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Categories', href: '/categories' },
            ]}
        >
            <Head title="Categories" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                        <p className="text-muted-foreground">Manage your product categories</p>
                    </div>
                    <Button asChild>
                        <Link href={route('categories.create')}>Add Category</Link>
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
                        <CardTitle>All Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {categories.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No categories found. Create your first category to get started.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {categories.map((category) => renderCategory(category))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}