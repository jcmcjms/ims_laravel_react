# Laravel IMS - Inventory Management System

A modern inventory management system built with Laravel 12, Inertia.js, React 19, and Tailwind CSS v4. Features a beautiful UI with shadcn/ui components, Sonner toast notifications, and a comprehensive role-based access control system.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Laravel 12 (PHP 8.2+) |
| **Frontend** | React 19 with TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Toast Notifications** | Sonner |
| **Build Tool** | Vite 6 |
| **Auth** | Laravel Breeze (Inertia) |
| **Routing** | Inertia.js + Ziggy |
| **Database** | SQLite (default) / MySQL / PostgreSQL |
| **Testing** | Pest PHP |

## Requirements

- **PHP**: 8.2 or higher
- **Node.js**: 18+ (for frontend build)
- **npm** or **yarn**: Latest version
- **Composer**: 2.x

## Features

### Core Inventory Management
- **Categories**: Hierarchical category management with parent-child relationships
- **Products**: Full product catalog with SKU, pricing (unit/cost), and images
- **Warehouses**: Multi-warehouse support for inventory distribution
- **Inventory Tracking**: Per-warehouse stock levels with minimum stock thresholds

### Supply Chain
- **Suppliers**: Supplier directory with contact information and management
- **Purchase Orders**: Create, track, and manage purchase orders with line items
- **Purchase Order Items**: Line items with quantity tracking and received quantities

### Stock Operations
- **Stock Movements**: Track all inventory changes (purchase, sale, adjustment, return, transfer)
- **Stock Adjustments**: Manual inventory adjustments with notes and audit trail
- **Low Stock Alerts**: Automatic detection of items below minimum stock level

### Reporting & Analytics
- **Inventory Valuation Report**: Current inventory value by product/warehouse
- **Low Stock Report**: Items needing reorder attention with quantities
- **Stock Movements Report**: Historical view of all inventory changes with filters

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: System-aware theme with manual toggle
- **Toast Notifications**: Sonner-powered toast notifications for all actions
- **Flash Messages**: Session flash messages on form submissions
- **Pagination**: Built-in pagination on all list pages
- **Search**: Search functionality on list pages for easy filtering
- **Modern Components**: shadcn/ui components with Tailwind CSS

### User Management & Security
- **Role-Based Access Control**: Four predefined roles with specific permissions
- **32 Granular Permissions**: Fine-grained control over every action in the system
- **User Management**: Full CRUD for system users with role assignment
- **Profile Settings**: User profile and password management

## Roles & Permissions

### Predefined Roles

| Role | Description | Permission Count |
|------|-------------|------------------|
| **Admin** | Full system access with all permissions | 40 |
| **Manager** | View/Create/Edit access, no delete permissions | 25 |
| **Warehouse Staff** | Inventory and stock operations focus | 10 |
| **Viewer** | Read-only access to all data | 15 |

### Role Details

#### Admin
- Complete access to all system features
- Can manage users, roles, and permissions
- Can create, edit, and delete all records
- Full access to reports and settings

#### Manager
- Can manage: products, categories, warehouses, suppliers, inventory, purchase orders
- Can view: users, roles, reports, settings
- **Cannot delete** any records
- Can adjust inventory quantities

#### Warehouse Staff
- Focus on day-to-day inventory operations
- Can view/create/edit inventory records
- Can record stock movements
- Can view: products, warehouses, suppliers (for reference)
- No access to user management, roles, or reports

#### Viewer
- Read-only access to all operational data
- Can view all reports
- Perfect for stakeholders, auditors, or managers needing visibility

### 32 Granular Permissions

| Category | Permissions |
|----------|-------------|
| **User Management** | `view-users`, `create-users`, `edit-users`, `delete-users` |
| **Role Management** | `view-roles`, `create-roles`, `edit-roles`, `delete-roles` |
| **Category Management** | `view-categories`, `create-categories`, `edit-categories`, `delete-categories` |
| **Product Management** | `view-products`, `create-products`, `edit-products`, `delete-products` |
| **Warehouse Management** | `view-warehouses`, `create-warehouses`, `edit-warehouses`, `delete-warehouses` |
| **Supplier Management** | `view-suppliers`, `create-suppliers`, `edit-suppliers`, `delete-suppliers` |
| **Inventory Management** | `view-inventory`, `create-inventory`, `edit-inventory`, `adjust-inventory` |
| **Purchase Orders** | `view-purchase-orders`, `create-purchase-orders`, `edit-purchase-orders`, `delete-purchase-orders` |
| **Stock Movements** | `view-stock-movements`, `create-stock-movements` |
| **Reports** | `view-reports`, `view-inventory-valuation-report`, `view-low-stock-report`, `view-stock-movements-report` |
| **Settings** | `view-settings`, `edit-settings` |

## Pages & Navigation

### Dashboard
- Real-time metrics overview
- Recent activity timeline
- Quick stats (total products, low stock alerts, pending orders)

### Inventory Management
- `/categories` - Product category management
- `/products` - Product catalog with SKU and pricing
- `/warehouses` - Warehouse locations management
- `/inventory` - Stock levels per warehouse

### Supply Chain
- `/suppliers` - Supplier directory
- `/purchase-orders` - Purchase order management
- `/purchase-orders/{id}` - Purchase order details with line items

### Stock Operations
- `/stock-movements` - Stock movement history
- `/stock-movements/adjust` - Stock adjustment form

### Reports
- `/reports/inventory-valuation` - Inventory value by product/warehouse
- `/reports/low-stock` - Items below minimum stock level
- `/reports/stock-movements` - Historical stock movements

### User Management
- `/users` - User list and management
- `/roles` - Role management with permission assignment
- `/permissions` - Permission management

### Settings
- `/settings/profile` - User profile settings
- `/settings/password` - Password change
- `/settings/appearance` - Theme preferences

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd laravel-ims
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node Dependencies

```bash
npm install
```

### 4. Environment Setup

Copy the example environment file and configure your database:

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Database Configuration

The project defaults to SQLite for local development. To use MySQL or PostgreSQL, update your `.env` file:

**SQLite (default)**
```env
DB_CONNECTION=sqlite
```

**MySQL**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_ims
DB_USERNAME=root
DB_PASSWORD=
```

**PostgreSQL**
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laravel_ims
DB_USERNAME=postgres
DB_PASSWORD=
```

### 6. Create Database

**For SQLite:**
```bash
touch database/database.sqlite
```

**For MySQL/PostgreSQL:**
Create the database using your database management tool.

### 7. Run Migrations

```bash
php artisan migrate
```

### 8. Seed Database

Seed the database with default roles and permissions, plus a default admin user:

```bash
php artisan db:seed
```

**Default Admin Credentials:**
- Email: `admin@ims.com`
- Password: `@temp123`

## Running the Application

### Development Mode

Run all services concurrently (Laravel server, queue worker, and Vite):

```bash
npm run dev
# or
composer dev
```

This starts:
- Laravel development server at `http://localhost:8000`
- Vite dev server with hot reload
- Automatically opens in your browser

### Individual Services

**Laravel Server:**
```bash
php artisan serve
```

**Vite (Frontend):**
```bash
npm run dev
```

**Queue Worker:**
```bash
php artisan queue:listen
```

### Production Build

```bash
npm run build
```

## Available Commands

### NPM Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run build:ssr` | Build with server-side rendering |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

### Composer Commands

| Command | Description |
|---------|-------------|
| `composer dev` | Run all services concurrently |
| `composer dump-autoload` | Regenerate autoload files |
| `php artisan migrate` | Run database migrations |
| `php artisan db:seed` | Seed database with test data |
| `php artisan db:seed --class=ClassName` | Seed specific seeder |
| `php artisan migrate:fresh` | Drop all tables and re-migrate |
| `php artisan migrate:fresh --seed` | Fresh migrate with seeding |
| `php artisan test` | Run tests |
| `php artisan route:list` | List all routes |

## Project Structure

```
laravel-ims/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── Auth/
│   │       ├── Settings/
│   │       └── *.php
│   ├── Models/
│   │   ├── Category.php
│   │   ├── Inventory.php
│   │   ├── Permission.php
│   │   ├── Product.php
│   │   ├── PurchaseOrder.php
│   │   ├── PurchaseOrderItem.php
│   │   ├── Role.php
│   │   ├── StockAdjustment.php
│   │   ├── StockMovement.php
│   │   ├── Supplier.php
│   │   ├── User.php
│   │   └── Warehouse.php
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── PermissionSeeder.php
│       └── RoleSeeder.php
├── resources/
│   ├── css/
│   │   └── app.css
│   └── js/
│       ├── app.tsx
│       ├── components/
│       │   ├── ui/
│       │   └── *.tsx
│       ├── hooks/
│       ├── layouts/
│       ├── lib/
│       └── pages/
├── routes/
│   ├── web.php
│   ├── auth.php
│   └── settings.php
├── config/
├── vite.config.js
├── tailwind.config.js
├── components.json
└── package.json
```

## Database Schema

```
users
├── id, name, email, password, timestamps
├── role_id (foreign key)

roles
├── id, name (unique), guard_name, description, timestamps

permissions
├── id, name (unique), guard_name, description, timestamps

role_permissions
├── id, role_id, permission_id, timestamps

model_has_roles
├── id, role_id, model_type, model_id, timestamps

model_has_permissions
├── id, permission_id, model_type, model_id, timestamps

categories
├── id, name, description, parent_id (self-referential), timestamps

products
├── id, name, sku (unique), description, category_id
├── unit_price, cost_price, image, timestamps

warehouses
├── id, name, location, contact_info, timestamps

suppliers
├── id, name, contact_person, email, phone, address, timestamps

inventory
├── id, product_id, warehouse_id
├── quantity, min_stock_level, timestamps
└── [unique constraint on product_id + warehouse_id]

purchase_orders
├── id, supplier_id, order_date, expected_delivery
├── status (pending|ordered|received|cancelled), notes, timestamps

purchase_order_items
├── id, purchase_order_id, product_id
├── quantity, unit_price, received_quantity, timestamps

stock_movements
├── id, product_id, warehouse_id, movement_type
├── quantity, reference_type, reference_id, notes, timestamps
└── [movement_type: purchase|sale|adjustment|return|transfer]

stock_adjustments
├── id, user_id, reason, timestamps
└── [tracks manual inventory corrections]
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | Laravel | Application name |
| `APP_ENV` | local | Environment (local/production) |
| `APP_KEY` | - | Application encryption key |
| `APP_DEBUG` | true | Debug mode |
| `APP_TIMEZONE` | UTC | Application timezone |
| `APP_URL` | http://localhost | Application URL |
| `DB_CONNECTION` | sqlite | Database driver |
| `SESSION_DRIVER` | database | Session driver |
| `QUEUE_CONNECTION` | database | Queue driver |
| `CACHE_STORE` | database | Cache driver |
| `BCRYPT_ROUNDS` | 12 | Password hashing rounds |

## API Routes

### Dashboard
- `GET /dashboard` - Dashboard with metrics and recent activity

### User Management
- `GET /users` - List users (paginated)
- `POST /users` - Create user
- `GET /users/{id}` - Show user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Roles & Permissions
- `GET /roles` - List roles
- `POST /roles` - Create role
- `GET /roles/{id}` - Show role
- `PUT /roles/{id}` - Update role
- `DELETE /roles/{id}` - Delete role
- `GET /permissions` - List all permissions
- `POST /permissions` - Create permission
- `PUT /permissions/{id}` - Update permission
- `DELETE /permissions/{id}` - Delete permission

### Inventory Management
- `GET /categories` - List categories
- `POST /categories` - Create category
- `GET /categories/{id}` - Show category
- `PUT /categories/{id}` - Update category
- `DELETE /categories/{id}` - Delete category

- `GET /products` - List products (paginated, searchable)
- `POST /products` - Create product
- `GET /products/{id}` - Show product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

- `GET /warehouses` - List warehouses
- `POST /warehouses` - Create warehouse
- `GET /warehouses/{id}` - Show warehouse
- `PUT /warehouses/{id}` - Update warehouse
- `DELETE /warehouses/{id}` - Delete warehouse

- `GET /suppliers` - List suppliers
- `POST /suppliers` - Create supplier
- `GET /suppliers/{id}` - Show supplier
- `PUT /suppliers/{id}` - Update supplier
- `DELETE /suppliers/{id}` - Delete supplier

- `GET /inventory` - List inventory (paginated, searchable)
- `POST /inventory` - Create inventory record
- `GET /inventory/{id}` - Show inventory
- `PUT /inventory/{id}` - Update inventory
- `DELETE /inventory/{id}` - Delete inventory

### Supply Chain
- `GET /purchase-orders` - List purchase orders (paginated)
- `POST /purchase-orders` - Create purchase order
- `GET /purchase-orders/{id}` - Show purchase order with items
- `PUT /purchase-orders/{id}` - Update purchase order
- `DELETE /purchase-orders/{id}` - Delete purchase order

### Stock Operations
- `GET /stock-movements` - List stock movements (paginated, searchable)
- `POST /stock-movements` - Create stock movement
- `GET /stock-movements/adjust` - Stock adjustment form
- `POST /stock-movements/adjust` - Submit stock adjustment

### Reports
- `GET /reports/inventory-valuation` - Inventory valuation report
- `GET /reports/low-stock` - Low stock report
- `GET /reports/stock-movements` - Stock movements report

### Settings
- `GET /settings/profile` - Profile settings page
- `PUT /settings/profile` - Update profile
- `GET /settings/password` - Password settings page
- `PUT /settings/password` - Update password
- `GET /settings/appearance` - Appearance settings

## Authentication

The application uses Laravel Breeze with Inertia.js for authentication:

- **Login**: `GET /login`, `POST /login`
- **Register**: `GET /register`, `POST /register`
- **Password Reset**: `GET /forgot-password`, `POST /forgot-password`
- **Email Verification**: `GET /verify-email`, `POST /verification-notification`
- **Logout**: `POST /logout`

## Default User

After seeding, you can login with:

- **Email**: `admin@ims.com`
- **Password**: `@temp123`

## Deployment

### Production Checklist

1. **Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate --force
   ```

2. **Database**
   ```bash
   php artisan migrate --force
   php artisan db:seed --force  # If needed
   ```

3. **Storage Link**
   ```bash
   php artisan storage:link
   ```

4. **Build Frontend**
   ```bash
   npm run build
   ```

5. **Optimize**
   ```bash
   php artisan optimize
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

6. **Permissions**
   ```bash
   chmod -R 775 storage bootstrap/cache
   ```

### Server Requirements

- PHP 8.2+
- MySQL 8.0+ / PostgreSQL 13+ / SQLite 3.8+
- Node.js 18+
- Composer 2.x
- Redis (optional, for caching/queues)

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).