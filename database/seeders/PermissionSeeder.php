<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Seed the application's database with common inventory management permissions.
     */
    public function run(): void
    {
        $permissions = [
            // User Management
            [
                'name' => 'view-users',
                'guard_name' => 'web',
                'description' => 'View the list of users and their details',
            ],
            [
                'name' => 'create-users',
                'guard_name' => 'web',
                'description' => 'Create new user accounts',
            ],
            [
                'name' => 'edit-users',
                'guard_name' => 'web',
                'description' => 'Edit existing user information',
            ],
            [
                'name' => 'delete-users',
                'guard_name' => 'web',
                'description' => 'Delete user accounts from the system',
            ],

            // Role Management
            [
                'name' => 'view-roles',
                'guard_name' => 'web',
                'description' => 'View the list of roles and their permissions',
            ],
            [
                'name' => 'create-roles',
                'guard_name' => 'web',
                'description' => 'Create new roles with specific permissions',
            ],
            [
                'name' => 'edit-roles',
                'guard_name' => 'web',
                'description' => 'Edit existing roles and their permission assignments',
            ],
            [
                'name' => 'delete-roles',
                'guard_name' => 'web',
                'description' => 'Delete roles from the system',
            ],

            // Category Management
            [
                'name' => 'view-categories',
                'guard_name' => 'web',
                'description' => 'View the list of product categories',
            ],
            [
                'name' => 'create-categories',
                'guard_name' => 'web',
                'description' => 'Create new product categories',
            ],
            [
                'name' => 'edit-categories',
                'guard_name' => 'web',
                'description' => 'Edit existing product categories',
            ],
            [
                'name' => 'delete-categories',
                'guard_name' => 'web',
                'description' => 'Delete product categories from the system',
            ],

            // Product Management
            [
                'name' => 'view-products',
                'guard_name' => 'web',
                'description' => 'View the product catalog and details',
            ],
            [
                'name' => 'create-products',
                'guard_name' => 'web',
                'description' => 'Add new products to the inventory',
            ],
            [
                'name' => 'edit-products',
                'guard_name' => 'web',
                'description' => 'Edit product information and details',
            ],
            [
                'name' => 'delete-products',
                'guard_name' => 'web',
                'description' => 'Remove products from the inventory',
            ],

            // Warehouse Management
            [
                'name' => 'view-warehouses',
                'guard_name' => 'web',
                'description' => 'View the list of warehouses and their details',
            ],
            [
                'name' => 'create-warehouses',
                'guard_name' => 'web',
                'description' => 'Add new warehouses to the system',
            ],
            [
                'name' => 'edit-warehouses',
                'guard_name' => 'web',
                'description' => 'Edit warehouse information and settings',
            ],
            [
                'name' => 'delete-warehouses',
                'guard_name' => 'web',
                'description' => 'Delete warehouses from the system',
            ],

            // Supplier Management
            [
                'name' => 'view-suppliers',
                'guard_name' => 'web',
                'description' => 'View the list of suppliers and their details',
            ],
            [
                'name' => 'create-suppliers',
                'guard_name' => 'web',
                'description' => 'Add new suppliers to the system',
            ],
            [
                'name' => 'edit-suppliers',
                'guard_name' => 'web',
                'description' => 'Edit supplier information and contact details',
            ],
            [
                'name' => 'delete-suppliers',
                'guard_name' => 'web',
                'description' => 'Delete suppliers from the system',
            ],

            // Inventory Management
            [
                'name' => 'view-inventory',
                'guard_name' => 'web',
                'description' => 'View current inventory levels across warehouses',
            ],
            [
                'name' => 'create-inventory',
                'guard_name' => 'web',
                'description' => 'Add new inventory items or initial stock',
            ],
            [
                'name' => 'edit-inventory',
                'guard_name' => 'web',
                'description' => 'Edit inventory item details and allocations',
            ],
            [
                'name' => 'adjust-inventory',
                'guard_name' => 'web',
                'description' => 'Adjust inventory quantities for corrections or cycle counts',
            ],

            // Purchase Orders
            [
                'name' => 'view-purchase-orders',
                'guard_name' => 'web',
                'description' => 'View purchase orders and their statuses',
            ],
            [
                'name' => 'create-purchase-orders',
                'guard_name' => 'web',
                'description' => 'Create new purchase orders for suppliers',
            ],
            [
                'name' => 'edit-purchase-orders',
                'guard_name' => 'web',
                'description' => 'Edit existing purchase order details',
            ],
            [
                'name' => 'delete-purchase-orders',
                'guard_name' => 'web',
                'description' => 'Delete purchase orders from the system',
            ],

            // Stock Movements
            [
                'name' => 'view-stock-movements',
                'guard_name' => 'web',
                'description' => 'View stock movement history and logs',
            ],
            [
                'name' => 'create-stock-movements',
                'guard_name' => 'web',
                'description' => 'Record new stock movements between locations',
            ],

            // Reports
            [
                'name' => 'view-reports',
                'guard_name' => 'web',
                'description' => 'Access to general reports and analytics dashboard',
            ],
            [
                'name' => 'view-inventory-valuation-report',
                'guard_name' => 'web',
                'description' => 'View inventory valuation and cost reports',
            ],
            [
                'name' => 'view-low-stock-report',
                'guard_name' => 'web',
                'description' => 'View reports on low stock items and reorder alerts',
            ],
            [
                'name' => 'view-stock-movements-report',
                'guard_name' => 'web',
                'description' => 'View detailed stock movement analysis reports',
            ],

            // Settings
            [
                'name' => 'view-settings',
                'guard_name' => 'web',
                'description' => 'View system settings and configurations',
            ],
            [
                'name' => 'edit-settings',
                'guard_name' => 'web',
                'description' => 'Modify system settings and configurations',
            ],
        ];

        foreach ($permissions as $permissionData) {
            Permission::firstOrCreate(
                ['name' => $permissionData['name'], 'guard_name' => $permissionData['guard_name']],
                $permissionData
            );
        }
    }
}