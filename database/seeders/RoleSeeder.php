<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's database with default roles.
     * Each role has a clear responsibility and specific permission set.
     */
    public function run(): void
    {
        // ============================================================
        // ADMIN ROLE - Full system access with all permissions
        // ============================================================
        $adminRole = Role::firstOrCreate(
            ['name' => 'Admin', 'guard_name' => 'web'],
            ['description' => 'Full system access with all permissions']
        );

        // Assign all permissions to Admin role
        $allPermissions = Permission::where('guard_name', 'web')->pluck('id')->toArray();
        $adminRole->syncPermissions($allPermissions);

        // ============================================================
        // MANAGER ROLE - View/Create/Edit but NO delete permissions
        // ============================================================
        // Managers can manage: products, categories, warehouses, suppliers, inventory
        // Managers can view: users, roles, reports, settings
        // Managers CANNOT delete: users, roles, categories, products, warehouses, suppliers, purchase orders

        $managerPermissions = [
            // User Management - View only (no create, edit, delete)
            'view-users',

            // Role Management - View only (no create, edit, delete)
            'view-roles',

            // Category Management - Full management except delete
            'view-categories',
            'create-categories',
            'edit-categories',

            // Product Management - Full management except delete
            'view-products',
            'create-products',
            'edit-products',

            // Warehouse Management - Full management except delete
            'view-warehouses',
            'create-warehouses',
            'edit-warehouses',

            // Supplier Management - Full management except delete
            'view-suppliers',
            'create-suppliers',
            'edit-suppliers',

            // Inventory Management - Full access including adjust
            'view-inventory',
            'create-inventory',
            'edit-inventory',
            'adjust-inventory',

            // Purchase Orders - Full management except delete
            'view-purchase-orders',
            'create-purchase-orders',
            'edit-purchase-orders',

            // Stock Movements - View and create only
            'view-stock-movements',
            'create-stock-movements',

            // Reports - View only
            'view-reports',
            'view-inventory-valuation-report',
            'view-low-stock-report',
            'view-stock-movements-report',

            // Settings - View only (cannot modify system settings)
            'view-settings',
        ];

        $managerRole = Role::firstOrCreate(
            ['name' => 'Manager', 'guard_name' => 'web'],
            ['description' => 'Operational management with create/edit permissions but no delete access']
        );

        $managerPermissionIds = Permission::whereIn('name', $managerPermissions)
            ->where('guard_name', 'web')
            ->pluck('id')
            ->toArray();
        $managerRole->syncPermissions($managerPermissionIds);

        // ============================================================
        // WAREHOUSE STAFF ROLE - Focus on inventory and stock operations
        // ============================================================
        // Warehouse staff handle day-to-day inventory operations
        // Can view/create/edit inventory and stock movements
        // Can view: products, warehouses, suppliers (for reference)
        // No access to: user management, role management, reports, settings

        $warehouseStaffPermissions = [
            // Inventory Management - View, create, edit (for stock counts and corrections)
            'view-inventory',
            'create-inventory',
            'edit-inventory',
            'adjust-inventory',

            // Stock Movements - View and create (for recording movements)
            'view-stock-movements',
            'create-stock-movements',

            // Products - View only (for referencing product details)
            'view-products',

            // Warehouses - View only (for knowing where to move stock)
            'view-warehouses',

            // Suppliers - View only (for reference when receiving goods)
            'view-suppliers',
        ];

        $warehouseStaffRole = Role::firstOrCreate(
            ['name' => 'Warehouse Staff', 'guard_name' => 'web'],
            ['description' => 'Inventory and stock operations focus with day-to-day warehouse tasks']
        );

        $warehouseStaffPermissionIds = Permission::whereIn('name', $warehouseStaffPermissions)
            ->where('guard_name', 'web')
            ->pluck('id')
            ->toArray();
        $warehouseStaffRole->syncPermissions($warehouseStaffPermissionIds);

        // ============================================================
        // VIEWER ROLE - Read-only access to all data
        // ============================================================
        // Viewers can see all operational data but cannot modify anything
        // Perfect for stakeholders, auditors, or managers who need visibility

        $viewerPermissions = [
            // User Management - View only
            'view-users',

            // Role Management - View only
            'view-roles',

            // Category Management - View only
            'view-categories',

            // Product Management - View only
            'view-products',

            // Warehouse Management - View only
            'view-warehouses',

            // Supplier Management - View only
            'view-suppliers',

            // Inventory Management - View only
            'view-inventory',

            // Purchase Orders - View only
            'view-purchase-orders',

            // Stock Movements - View only
            'view-stock-movements',

            // Reports - View only (all report types)
            'view-reports',
            'view-inventory-valuation-report',
            'view-low-stock-report',
            'view-stock-movements-report',

            // Settings - View only
            'view-settings',
        ];

        $viewerRole = Role::firstOrCreate(
            ['name' => 'Viewer', 'guard_name' => 'web'],
            ['description' => 'Read-only access to all system data for stakeholders and auditors']
        );

        $viewerPermissionIds = Permission::whereIn('name', $viewerPermissions)
            ->where('guard_name', 'web')
            ->pluck('id')
            ->toArray();
        $viewerRole->syncPermissions($viewerPermissionIds);
    }
}