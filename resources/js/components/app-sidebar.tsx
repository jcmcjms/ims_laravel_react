import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Users, Shield, Key, Package, Tags, Building2, Truck, Boxes, ShoppingCart, ArrowLeftRight, BarChart3 } from 'lucide-react';
import AppLogo from './app-logo';

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
    },
    {
        title: 'Roles',
        url: '/roles',
        icon: Shield,
    },
    {
        title: 'Permissions',
        url: '/permissions',
        icon: Key,
    },
];

const imsNavItems: NavItem[] = [
    {
        title: 'Categories',
        url: '/categories',
        icon: Tags,
    },
    {
        title: 'Products',
        url: '/products',
        icon: Package,
    },
    {
        title: 'Suppliers',
        url: '/suppliers',
        icon: Truck,
    },
    {
        title: 'Warehouses',
        url: '/warehouses',
        icon: Building2,
    },
    {
        title: 'Inventory',
        url: '/inventory',
        icon: Boxes,
    },
    {
        title: 'Purchase Orders',
        url: '/purchase-orders',
        icon: ShoppingCart,
    },
    {
        title: 'Stock Movements',
        url: '/stock-movements',
        icon: ArrowLeftRight,
    },
];

const reportNavItems: NavItem[] = [
    {
        title: 'Inventory Valuation',
        url: '/reports/inventory-valuation',
        icon: BarChart3,
    },
    {
        title: 'Low Stock Report',
        url: '/reports/low-stock',
        icon: BarChart3,
    },
    {
        title: 'Stock Movements',
        url: '/reports/stock-movements',
        icon: BarChart3,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
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

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Administration</SidebarGroupLabel>
                    <SidebarMenu>
                        {adminNavItems.map((item) => (
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

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Inventory Management</SidebarGroupLabel>
                    <SidebarMenu>
                        {imsNavItems.map((item) => (
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

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Reports</SidebarGroupLabel>
                    <SidebarMenu>
                        {reportNavItems.map((item) => (
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
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
