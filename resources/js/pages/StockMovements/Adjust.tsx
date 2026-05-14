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
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StockMovementsAdjustProps {
    products: Array<{
        id: number;
        name: string;
        sku: string;
    }>;
    warehouses: Array<{
        id: number;
        name: string;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Stock Movements',
        href: '/stock-movements',
    },
    {
        title: 'Adjust Stock',
        href: '/stock-movements/adjust',
    },
];

export default function StockMovementsAdjust({ products, warehouses }: StockMovementsAdjustProps) {
    const { props } = usePage();
    const flash = props.flash || {};
    const errors = props.errors as Record<string, string>;

    const { data, setData, post, errors: formErrors, processing } = useForm({
        product_id: '',
        warehouse_id: '',
        quantity: '',
        type: 'add',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('stock-movements.adjust-store'), {
            onFinish: () => {
                if (Object.keys(formErrors).length === 0) {
                    // Reset form on success
                    setData({
                        product_id: '',
                        warehouse_id: '',
                        quantity: '',
                        type: 'add',
                        notes: '',
                    });
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adjust Stock" />

            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/stock-movements">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Adjust Stock</h1>
                        <p className="text-muted-foreground">Manually adjust inventory levels</p>
                    </div>
                </div>

                {(flash.success || flash.error) && (
                    <Alert variant={flash.error ? 'destructive' : 'default'}>
                        <AlertDescription>
                            {flash.success || flash.error}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stock Adjustment</CardTitle>
                            <CardDescription>
                                Add or remove inventory for a specific product and warehouse
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="product_id">Product *</Label>
                                        <Select
                                            value={data.product_id}
                                            onValueChange={(value) => setData('product_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem
                                                        key={product.id}
                                                        value={product.id.toString()}
                                                    >
                                                        {product.name} ({product.sku})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={formErrors.product_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="warehouse_id">Warehouse *</Label>
                                        <Select
                                            value={data.warehouse_id}
                                            onValueChange={(value) => setData('warehouse_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a warehouse" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {warehouses.map((warehouse) => (
                                                    <SelectItem
                                                        key={warehouse.id}
                                                        value={warehouse.id.toString()}
                                                    >
                                                        {warehouse.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={formErrors.warehouse_id} />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Adjustment Type *</Label>
                                        <Select
                                            value={data.type}
                                            onValueChange={(value) => setData('type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="add">Add Stock</SelectItem>
                                                <SelectItem value="remove">Remove Stock</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={formErrors.type} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="quantity">Quantity *</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', e.target.value)}
                                            placeholder="Enter quantity"
                                            required
                                        />
                                        <InputError message={formErrors.quantity} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Input
                                        id="notes"
                                        type="text"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Reason for adjustment (optional)"
                                    />
                                    <InputError message={formErrors.notes} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Processing...' : 'Submit Adjustment'}
                                    </Button>
                                    <Button type="button" variant="outline" asChild>
                                        <Link href="/stock-movements">Cancel</Link>
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