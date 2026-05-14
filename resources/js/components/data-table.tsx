import { Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

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
import { canCreate, canEdit, canDelete } from '@/lib/permissions';

interface Column<T> {
    key: string;
    label: string;
    render?: (item: T) => ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    title: string;
    description?: string;
    data: T[];
    columns: Column<T>[];
    primaryKey: keyof T;
    emptyMessage?: string;
    pagination?: {
        links: Array<{ label: string; url: string | null; active: boolean }>;
    };
    searchPlaceholder?: string;
    filters?: Record<string, string | null>;
    resource: string;
    createLink?: string;
    renderActions?: (item: T) => ReactNode;
}

function Pagination({ links }: { links: Array<{ label: string; url: string | null; active: boolean }> }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex justify-center mt-4">
            <div className="flex gap-1">
                {links.map((link, index) => (
                    <Button
                        key={index}
                        asChild
                        variant={link.active ? 'default' : 'outline'}
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
    );
}

export default function DataTable<T extends { [key: string]: unknown }>({
    title,
    description,
    data,
    columns,
    primaryKey,
    emptyMessage = 'No data found.',
    pagination,
    searchPlaceholder = 'Search...',
    filters = {},
    resource,
    createLink,
    renderActions,
}: DataTableProps<T>) {
    const { props } = usePage();
    const userPermissions = props.auth?.user?.permissions || [] as string[];

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    {description && (
                        <p className="text-muted-foreground">{description}</p>
                    )}
                </div>
                {createLink && canCreate(userPermissions, resource) && (
                    <Button asChild>
                        <Link href={createLink}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add {title.replace(/s$/, '')}
                        </Link>
                    </Button>
                )}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle>{title}</CardTitle>
                        <form method="get" className="flex gap-2">
                            <input
                                type="text"
                                name="search"
                                placeholder={searchPlaceholder}
                                defaultValue={filters.search || ''}
                                className="w-64 px-3 py-2 text-sm border rounded-md"
                            />
                            <Button type="submit" variant="secondary">
                                Search
                            </Button>
                            {filters.search && (
                                <Button variant="outline" asChild>
                                    <Link href={window.location.pathname}>Clear</Link>
                                </Button>
                            )}
                        </form>
                    </div>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHead key={column.key} className={column.className}>
                                        {column.label}
                                    </TableHead>
                                ))}
                                {(canEdit(userPermissions, resource) || canDelete(userPermissions, resource)) && (
                                    <TableHead className="text-right">Actions</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                                        {emptyMessage}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => (
                                    <TableRow key={String(item[primaryKey])}>
                                        {columns.map((column) => (
                                            <TableCell key={column.key} className={column.className}>
                                                {column.render
                                                    ? column.render(item)
                                                    : String(item[column.key] ?? '')}
                                            </TableCell>
                                        ))}
                                        {(canEdit(userPermissions, resource) || canDelete(userPermissions, resource)) && (
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {renderActions?.(item)}
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {pagination && <Pagination links={pagination.links} />}
                </CardContent>
            </Card>
        </div>
    );
}