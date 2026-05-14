<?php

namespace Database\Seeders;

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
        // Seed permissions first, then roles
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
        ]);

        // Create or find the admin user and assign Admin role
        // Note: The Admin role is already created by RoleSeeder with all permissions
        $adminRole = Role::where('name', 'Admin')->first();

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