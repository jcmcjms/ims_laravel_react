import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type Auth, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, Shield, Key, Package, Tags, Building2, Truck, Boxes, ShoppingCart, ArrowLeftRight, BarChart3, Settings } from 'lucide-react';
import AppLogo from './app-logo';
import { useMemo } from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Users',
        url: '/users',
        icon: Users,
        permission: 'view-users',
    },
    {
        title: 'Roles',
        url: '/roles',
        icon: Shield,
        permission: 'view-roles',
    },
    {
        title: 'Permissions',
        url: '/permissions',
        icon: Key,
        permission: 'view-permissions',
    },
];

const imsNavItems: NavItem[] = [
    {
        title: 'Categories',
        url: '/categories',
        icon: Tags,
        permission: 'view-categories',
    },
    {
        title: 'Products',
        url: '/products',
        icon: Package,
        permission: 'view-products',
    },
    {
        title: 'Suppliers',
        url: '/suppliers',
        icon: Truck,
        permission: 'view-suppliers',
    },
    {
        title: 'Warehouses',
        url: '/warehouses',
        icon: Building2,
        permission: 'view-warehouses',
    },
    {
        title: 'Inventory',
        url: '/inventory',
        icon: Boxes,
        permission: 'view-inventory',
    },
    {
        title: 'Purchase Orders',
        url: '/purchase-orders',
        icon: ShoppingCart,
        permission: 'view-purchase-orders',
    },
    {
        title: 'Stock Movements',
        url: '/stock-movements',
        icon: ArrowLeftRight,
        permission: 'view-stock-movements',
    },
];

const reportNavItems: NavItem[] = [
    {
        title: 'Inventory Valuation',
        url: '/reports/inventory-valuation',
        icon: BarChart3,
        permission: 'view-reports',
    },
    {
        title: 'Low Stock Report',
        url: '/reports/low-stock',
        icon: BarChart3,
        permission: 'view-reports',
    },
    {
        title: 'Stock Movements',
        url: '/reports/stock-movements',
        icon: BarChart3,
        permission: 'view-reports',
    },
];

const settingsNavItems: NavItem[] = [
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
        permission: 'view-settings',
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const props = usePage().props as unknown as { auth: Auth };
    const userPermissions: string[] = props.auth?.user?.permissions || [];

    // Filter nav items based on user permissions
    const filteredAdminItems = useMemo(() =>
        adminNavItems.filter(item => !item.permission || userPermissions.includes(item.permission)),
        [userPermissions]
    );

    const filteredImsItems = useMemo(() =>
        imsNavItems.filter(item => !item.permission || userPermissions.includes(item.permission)),
        [userPermissions]
    );

    const filteredReportItems = useMemo(() =>
        reportNavItems.filter(item => !item.permission || userPermissions.includes(item.permission)),
        [userPermissions]
    );

    const filteredSettingsItems = useMemo(() =>
        settingsNavItems.filter(item => !item.permission || userPermissions.includes(item.permission)),
        [userPermissions]
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                {filteredAdminItems.length > 0 && (
                    <SidebarGroup className="px-2 py-0">
                        <SidebarGroupLabel>Administration</SidebarGroupLabel>
                        <SidebarMenu>
                            {filteredAdminItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={false}>
                                        <Link href={item.url} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                )}

                {filteredImsItems.length > 0 && (
                    <SidebarGroup className="px-2 py-0">
                        <SidebarGroupLabel>Inventory Management</SidebarGroupLabel>
                        <SidebarMenu>
                            {filteredImsItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={false}>
                                        <Link href={item.url} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                )}

                {filteredReportItems.length > 0 && (
                    <SidebarGroup className="px-2 py-0">
                        <SidebarGroupLabel>Reports</SidebarGroupLabel>
                        <SidebarMenu>
                            {filteredReportItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={false}>
                                        <Link href={item.url} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                )}

                {filteredSettingsItems.length > 0 && (
                    <SidebarGroup className="px-2 py-0">
                        <SidebarGroupLabel>Settings</SidebarGroupLabel>
                        <SidebarMenu>
                            {filteredSettingsItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={false}>
                                        <Link href={item.url} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
