<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed permissions first
        $this->call([
            PermissionSeeder::class,
        ]);

        // Create Admin role with all permissions
        $adminRole = Role::firstOrCreate(
            ['name' => 'Admin', 'guard_name' => 'web'],
            ['description' => 'Full system access with all permissions']
        );

        // Assign all permissions to Admin role
        $allPermissions = Permission::where('guard_name', 'web')->get();
        $adminRole->syncPermissions($allPermissions);

        // Create or find the admin user and assign Admin role
        User::firstOrCreate(
            ['email' => 'admin@ims.com'],
            [
                'name' => 'Admin User',
                'email' => 'admin@ims.com',
                'password' => '@temp123',
                'role_id' => $adminRole->id,
            ]
        );

        // Update existing admin user without role to have Admin role
        $adminUser = User::where('email', 'admin@ims.com')->first();
        if ($adminUser && !$adminUser->role_id) {
            $adminUser->role_id = $adminRole->id;
            $adminUser->save();
        }
    }
}