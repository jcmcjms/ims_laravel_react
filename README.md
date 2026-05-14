# Laravel IMS - Inventory Management System

A modern inventory management system built with Laravel 12, Inertia.js, React 19, and Tailwind CSS v4. Features a beautiful UI with shadcn/ui components, Sonner toast notifications, and a comprehensive role-based access control system.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Laravel 12 (PHP 8.2+) |
| **Frontend** | React 19 with TypeScript and Inertia.js |
| **Styling** | Tailwind CSS v4 with CSS-based configuration |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Toast Notifications** | Sonner |
| **Build Tool** | Vite 6 |
| **Auth** | Laravel Breeze (Inertia) |
| **Routing** | Inertia.js + Ziggy |
| **Icons** | Lucide React |
| **Database** | SQLite (default) / MySQL / PostgreSQL |
| **Testing** | Pest PHP |

## Requirements

- **PHP**: 8.2 or higher
- **Node.js**: 18+ (for frontend build)
- **npm** or **yarn**: Latest version
- **Composer**: 2.x

## The Problem We Solve

Poor inventory management is one of the most common operational failures in small and medium-sized businesses. When inventory tracking is manual, fragmented, or nonexistent, businesses pay the price in lost sales, wasted products, and inefficient operations.

### Common Pain Points

- **Manual tracking errors**: Spreadsheets and paper-based logs introduce human error. A misplaced decimal, a skipped row, or an outdated figure can cascade into ordering mistakes, stockouts, or overstocking that ties up capital for months.
- **Stockouts**: Running out of a key item mid-demand cycle means lost sales, frustrated customers, and emergency reorder costs. Businesses without real-time visibility often discover a stockout only when a customer is standing at the counter.
- **Overstocking**: Excess inventory silently drains resources — storage costs, insurance, spoilage, and obsolescence. Many SMBs are unaware of how much working capital is frozen in slow-moving or obsolete stock.
- **Poor visibility across locations**: When inventory is spread across multiple warehouses, shelves, or bins with no unified view, teams make decisions based on incomplete or outdated information.
- **Lack of accountability**: Without an audit trail, it's nearly impossible to answer "who adjusted this stock?" or "where did this discrepancy come from?" This creates risk during audits and makes accountability diffuse.
- **Disconnected systems**: Point-of-sale, e-commerce, accounting, and procurement tools that don't communicate create reconciliation nightmares and data silos that erode trust in reported numbers.

### The Cost of Poor Inventory Management

Inventory management failures carry real financial consequences:

- **Lost revenue**: Businesses lose an estimated **5–10% of their inventory value annually** to waste, spoilage, and obsolescence (illustrative estimate based on industry surveys — actual figures vary by sector).
- **Emergency orders**: Stockouts often trigger expensive expedited shipping and rush orders, significantly inflating the cost of goods sold.
- **Labor inefficiency**: Staff spend hours reconciling spreadsheets, answering "is this in stock?" questions, and chasing down discrepancies that a proper system would prevent.
- **Compliance risk**: Industries with regulatory requirements — food, pharmaceuticals, chemicals — face fines and operational shutdowns when inventory records don't satisfy audit requirements.

### Why Businesses Struggle

Most SMBs start with spreadsheets because they're cheap, familiar, and "good enough" — until they aren't. As order volume grows, product SKUs multiply, and warehouse count increases, the spreadsheet approach collapses under its own weight. Off-the-shelf enterprise software is often prohibitively expensive, overly complex, or packed with features a small team will never use. There is a gap between a fragile spreadsheet and an overwhelming ERP — and that gap is exactly where Laravel IMS lives.

## Real-World Implementation Research

Modern inventory management systems are built around a few well-established principles. Understanding these helps frame the design decisions behind a production-ready IMS.

### Industry Best Practices

- **Just-In-Time (JIT)**: Stock arrives exactly when needed for production or sale, minimizing holding costs. JIT requires reliable suppliers, accurate demand forecasting, and a system that can track reorder points precisely. It works best in stable supply chain environments.
- **ABC Analysis**: Inventory is classified by importance — A items (high value, low volume) get tight control and frequent counts; C items (low value, high volume) get simpler tracking; B items fall in between. This ensures effort is concentrated where it matters most.
- **Cycle Counting**: Rather than shutting down for a full annual inventory count, teams count a subset of inventory on a rotating schedule. This keeps inventory records accurate without disrupting operations.
- **FIFO (First In, First Out)**: Especially critical in perishable and time-sensitive industries, FIFO ensures oldest stock is used or sold first, reducing spoilage and waste. An IMS that tracks stock movements by timestamp makes FIFO enforcement straightforward.
- **Safety Stock Planning**: Maintaining a buffer above the minimum stock level accounts for demand variability and supply lead time. Effective safety stock calculations reduce both stockouts and overstocking.

### What Successful IMS Implementations Include

Every operation is different, but high-performing inventory management systems share a common feature set:

| Capability | Why It Matters |
|------------|----------------|
| **Multi-warehouse tracking** | Distributed inventory requires knowing what stock is where, without manually aggregating spreadsheets |
| **Low stock alerts** | Proactive notification prevents stockouts before they happen, rather than reacting after the fact |
| **Purchase order workflow** | Formalized PO creation, approval, and receiving reduces errors and ensures inventory updates trace back to a source |
| **Stock movement audit trail** | Every change to inventory is logged with timestamp, user, and reason — essential for accountability and debugging |
| **Reporting & valuation** | Inventory valuation, movement history, and low-stock reports inform purchasing decisions and financial planning |
| **Role-based access control** | Different team members need different levels of access — a warehouse worker doesn't need the same permissions as an admin |

### Integration Requirements

A modern IMS rarely operates in isolation. Real-world implementations typically need to integrate with:

- **Point-of-Sale (POS) systems**: Sales transactions must decrement inventory automatically. A POS integration that syncs each sale to the IMS in real time (or near-real time) keeps stock levels accurate on the floor and in the back office.
- **E-commerce platforms**: Online orders pull from the same inventory pool. Without integration, businesses risk selling items that are out of stock or promising delivery dates that can't be met.
- **Accounting software**: Inventory valuation figures flow into balance sheets and cost-of-goods-sold calculations. Manual reconciliation between an IMS and accounting software is error-prone and time-consuming.
- **Supplier portals**: Some businesses integrate directly with supplier systems to automate purchase order generation based on reorder points and current demand.

### Compliance and Audit Trail Requirements

Regulated industries — food, pharmaceuticals, medical devices, chemicals — require inventory records that can withstand external audits. A compliant IMS implementation provides:

- **Immutable audit logs**: Stock movements should be append-only; corrections are made via new adjustment entries, not by modifying existing records.
- **User attribution**: Every action is tied to the user who performed it, with timestamp.
- **Document traceability**: Purchase orders, receiving records, and adjustment justifications should be linkable to the inventory changes they produce.
- **Report exports**: Audit-ready exports (CSV, PDF) allow auditors to review inventory data without requiring direct system access.

### Cloud vs. On-Premise Considerations

| Factor | Cloud | On-Premise |
|--------|-------|------------|
| **Initial cost** | Low — subscription model, no server hardware | Higher — servers, networking, IT staff |
| **Scalability** | Scales on demand | Requires hardware procurement and setup |
| **Maintenance** | Provider handles updates and uptime | Internal team manages patches, backups, upgrades |
| **Data control** | Data stored externally | Full ownership and physical control of data |
| **Internet dependency** | Required for access | Not required — works fully offline |
| **Customization** | Limited by SaaS constraints | Full control over code and configuration |
| **Best for** | Teams wanting minimal IT overhead | Organizations with strict data sovereignty or unique customization needs |

Laravel IMS supports both deployment models. The default SQLite configuration is ideal for local development and single-server on-premise deployments, while switching to MySQL or PostgreSQL enables cloud-hosted production deployments with proper connection pooling and scaling.

## What Makes Us Outstanding

Laravel IMS is not a generic inventory template — it is a purpose-built system with design decisions that reflect the realities of real inventory operations. Here's what sets it apart:

### Permission System: 40 Granular Controls

Most inventory systems offer simple role-based access (admin, manager, viewer). Laravel IMS goes further with **40 individual permissions** organized across 10 categories — from `view-users` and `create-products` to `view-inventory-valuation-report` and `adjust-inventory`. This means you can give a warehouse team member exactly the access they need for their role, and nothing more. No other open-source Laravel IMS offers this level of access control granularity.

### Multi-Warehouse with Per-Warehouse Thresholds

Many systems track total stock but lose visibility when inventory is distributed across locations. Laravel IMS tracks **stock levels per warehouse independently**, with **minimum stock thresholds per product per warehouse**. If product A has a minimum of 10 units at Warehouse East and 5 at Warehouse West, the system treats those as separate thresholds — because they are.

### Complete Audit Trail on Every Stock Movement

Every change to inventory — purchases, sales, adjustments, and returns — is recorded as a **stock movement** with:

- Movement type and quantity
- Reference type and ID (e.g., linked to a purchase order)
- User who initiated the change
- Timestamp
- Optional notes

This makes it possible to reconstruct the exact history of any item's stock level at any point in time.

### Purchase Order Workflow with Partial Receiving

Laravel IMS implements a realistic purchase order lifecycle: create a PO, send it to a supplier, receive the order (potentially in partial shipments — some items received, others backordered), and have inventory automatically updated when each shipment arrives. This mirrors how real supply chains behave and ensures your stock records reflect reality, not optimistic assumptions.

### Low Stock Alerts and Reporting

The system continuously evaluates stock levels against minimum thresholds and generates a **Low Stock Report** that surfaces exactly which items need reorder attention and in what quantity. Combined with the inventory valuation report, you have the data to make purchasing decisions based on actual value and actual need — not gut feel.

### Real-Time Feedback: Flash Messages and Toast Notifications

Every create, update, and delete operation produces a **Sonner toast notification** confirming the action. Form submissions trigger **session flash messages** on redirect. The result is an interface that feels responsive and alive — you always know whether your action succeeded, what it changed, and when to expect to see the updated data.

### Dark/Light Mode with System-Aware Theme

The UI detects your operating system's color scheme preference and defaults to it. Users can override to light or dark mode, and the preference persists. No jarring flash of wrong theme on page load — the theme is resolved server-side and applied before the page renders.

### Modern, Maintainable Tech Stack

- **React 19** with TypeScript for type-safe, component-driven frontend development
- **Tailwind CSS v4** with CSS-based configuration for a design system that is easy to extend
- **shadcn/ui** (Radix UI primitives) for accessible, customizable components that don't ship unnecessary weight
- **Inertia.js** for seamless SPA navigation without the complexity of a separate API layer
- **Laravel 12** for a backend that follows modern PHP best practices

### SQLite Default — Production-Ready Database Flexibility

The project defaults to **SQLite** for zero-configuration local development. When you're ready to move to production, switch the `DB_CONNECTION` in `.env` to `mysql` or `pgsql` — no code changes required. The same schema and migrations work across all three database engines.

### Self-Registration Disabled by Default

User registration is **disabled** out of the box. Only administrators can create accounts, preventing unauthorized sign-ups in production deployments. This is a security posture that most SaaS inventory tools charge extra for or don't offer at all.

### Built on Laravel 12 Best Practices

The codebase follows the patterns that Laravel 12 encourages:

- **Migrations** for all schema changes — never modify the database directly
- **Eloquent models** with proper relationships and scopes
- **Form Request validation** on all inputs
- **Policy classes** for authorization logic
- **Route model binding** for clean controller signatures
- **Database seeders** for repeatable, consistent development environments

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
- **PO Receiving**: Mark purchase orders as received and automatically update inventory

### Stock Operations
- **Stock Movements**: Track all inventory changes (purchase, sale, adjustment, return)
- **Stock Adjustments**: Manual inventory corrections with notes
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
- **Data Tables**: Sortable, filterable data tables with shadcn/ui components

### User Management & Security
- **Role-Based Access Control**: Four predefined roles with specific permissions
- **40 Granular Permissions**: Fine-grained control over every action in the system
- **User Management**: Full CRUD for system users with role assignment
- **Profile Settings**: User profile, password, and appearance management

## Roles & Permissions

### Predefined Roles

| Role | Description | Permission Count |
|------|-------------|------------------|
| **Admin** | Full system access with all permissions | 40 |
| **Manager** | View/Create/Edit access, no delete permissions | 27 |
| **Warehouse Staff** | Inventory and stock operations focus | 10 |
| **Viewer** | Read-only access to all data | 16 |

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

### 40 Granular Permissions

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
- `/dashboard` - Real-time metrics, recent activity, quick stats

### Inventory Management
- `/categories` - Category management with hierarchical structure
- `/products` - Product catalog with SKU, pricing, and images
- `/warehouses` - Warehouse locations management
- `/inventory` - Stock levels per warehouse with min stock thresholds

### Supply Chain
- `/suppliers` - Supplier directory with contact information
- `/purchase-orders` - Purchase order management
- `/purchase-orders/{id}` - Purchase order details with line items
- `/purchase-orders/{id}/edit` - Edit purchase order

### Stock Operations
- `/stock-movements` - Stock movement history
- `/stock-movements/adjust` - Stock adjustment form

### Reports
- `/reports/inventory-valuation` - Inventory value by product/warehouse
- `/reports/low-stock` - Items below minimum stock level
- `/reports/stock-movements` - Historical stock movements with filters

### User Management
- `/users` - User list with role assignments
- `/users/create` - Create new user
- `/users/{id}/edit` - Edit user
- `/roles` - Role management with permission assignment
- `/roles/create` - Create new role
- `/roles/{id}/edit` - Edit role permissions
- `/permissions` - Permission management

### Settings
- `/settings/profile` - User profile settings
- `/settings/password` - Password change
- `/settings/appearance` - Theme preferences (light/dark/system)

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
copy .env.example .env

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
type nul > database\database.sqlite
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
- Queue worker for background jobs

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
│   │       │   ├── AuthenticatedSessionController.php
│   │       │   ├── ConfirmablePasswordController.php
│   │       │   ├── EmailVerificationNotificationController.php
│   │       │   ├── EmailVerificationPromptController.php
│   │       │   ├── NewPasswordController.php
│   │       │   ├── PasswordResetLinkController.php
│   │       │   └── VerifyEmailController.php
│   │       ├── Settings/
│   │       │   ├── PasswordController.php
│   │       │   └── ProfileController.php
│   │       ├── CategoryController.php
│   │       ├── DashboardController.php
│   │       ├── InventoryController.php
│   │       ├── PermissionController.php
│   │       ├── ProductController.php
│   │       ├── PurchaseOrderController.php
│   │       ├── ReportController.php
│   │       ├── RoleController.php
│   │       ├── StockMovementController.php
│   │       ├── SupplierController.php
│   │       ├── UserManagementController.php
│   │       └── WarehouseController.php
│   └── Models/
│       ├── Category.php
│       ├── Inventory.php
│       ├── Permission.php
│       ├── Product.php
│       ├── PurchaseOrder.php
│       ├── PurchaseOrderItem.php
│       ├── Role.php
│       ├── StockMovement.php
│       ├── Supplier.php
│       ├── User.php
│       └── Warehouse.php
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2026_05_13_000003_create_categories_table.php
│   │   ├── 2026_05_13_000004_create_warehouses_table.php
│   │   ├── 2026_05_13_000005_create_suppliers_table.php
│   │   ├── 2026_05_13_000006_create_products_table.php
│   │   ├── 2026_05_13_000007_create_inventory_table.php
│   │   ├── 2026_05_13_000008_create_purchase_orders_table.php
│   │   ├── 2026_05_13_000009_create_purchase_order_items_table.php
│   │   ├── 2026_05_13_000010_create_stock_movements_table.php
│   │   ├── 2026_05_14_000001_create_roles_table.php
│   │   ├── 2026_05_14_000002_create_permissions_table.php
│   │   ├── 2026_05_14_000003_create_role_permissions_table.php
│   │   ├── 2026_05_14_000004_create_model_has_roles_table.php
│   │   ├── 2026_05_14_000005_create_model_has_permissions_table.php
│   │   └── 2026_05_14_000006_add_fields_to_users_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── PermissionSeeder.php
│       └── RoleSeeder.php
├── resources/
│   ├── css/
│   │   └── app.css
│   └── js/
│       ├── app.tsx
│       ├── ssr.jsx
│       ├── components/
│       │   ├── ui/           # shadcn/ui components
│       │   └── *.tsx         # Custom components
│       ├── hooks/
│       │   └── use-appearance.tsx
│       ├── layouts/
│       │   ├── app-layout.tsx
│       │   ├── auth-layout.tsx
│       │   ├── auth/
│       │   └── settings/
│       ├── lib/
│       │   └── utils.ts
│       └── pages/
│           ├── dashboard.tsx
│           ├── Users/
│           ├── Categories/
│           ├── Products/
│           ├── Warehouses/
│           ├── Suppliers/
│           ├── Inventory/
│           ├── PurchaseOrders/
│           ├── StockMovements/
│           ├── Reports/
│           ├── Roles/
│           ├── Permissions/
│           ├── auth/
│           └── settings/
├── routes/
│   ├── web.php
│   ├── auth.php
│   └── settings.php
├── components.json
├── vite.config.js
├── package.json
└── composer.json
```

## Database Schema

```
users
├── id, name, email, password, timestamps
├── role_id (foreign key → roles.id, nullable)
├── is_active (boolean)
├── phone (nullable)
├── address (nullable)
└── avatar (nullable)

roles
├── id, name (unique), guard_name, description, timestamps

permissions
├── id, name (unique), guard_name, description, timestamps

role_permissions
├── id, role_id (foreign key → roles.id), permission_id (foreign key → permissions.id), timestamps

model_has_roles
├── id, role_id (foreign key → roles.id), model_type, model_id, timestamps

model_has_permissions
├── id, permission_id (foreign key → permissions.id), model_type, model_id, timestamps

categories
├── id, name, description (nullable), parent_id (self-referential → categories.id, nullable), timestamps
└── Indexes: parent_id, created_at

products
├── id, name, sku (unique), description (nullable), category_id (foreign key → categories.id, nullable)
├── unit_price (decimal, default 0), cost_price (decimal, default 0)
├── image (nullable)
└── timestamps
└── Indexes: category_id, sku, name, created_at

warehouses
├── id, name, location, timestamps

suppliers
├── id, name, contact_person (nullable), email (nullable), phone (nullable), address (nullable), timestamps

inventory
├── id, product_id (foreign key → products.id), warehouse_id (foreign key → warehouses.id)
├── quantity (integer, default 0, check >= 0)
├── min_stock_level (integer, default 0, check >= 0)
├── timestamps
└── Unique constraint on (product_id, warehouse_id)
└── Indexes: warehouse_id, quantity, created_at

purchase_orders
├── id, supplier_id (foreign key → suppliers.id)
├── order_date, expected_delivery (dates)
├── status (enum: pending, ordered, received, cancelled)
├── notes (nullable)
└── timestamps

purchase_order_items
├── id, purchase_order_id (foreign key → purchase_orders.id)
├── product_id (foreign key → products.id)
├── quantity, unit_price
├── received_quantity (default 0)
└── timestamps

stock_movements
├── id, product_id (foreign key → products.id), warehouse_id (foreign key → warehouses.id)
├── movement_type (enum: purchase, sale, adjustment, return)
├── quantity
├── reference_type (string, nullable), reference_id (bigint, nullable)
├── notes (nullable)
└── timestamps
└── Indexes: product_id, warehouse_id, movement_type, (reference_type, reference_id), created_at
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | IMS | Application name |
| `APP_ENV` | local | Environment (local/production) |
| `APP_KEY` | - | Application encryption key |
| `APP_DEBUG` | true | Debug mode |
| `APP_TIMEZONE` | UTC | Application timezone |
| `APP_URL` | http://localhost | Application URL |
| `DB_CONNECTION` | sqlite | Database driver |
| `SESSION_DRIVER` | database | Session driver |
| `SESSION_LIFETIME` | 120 | Session lifetime in minutes |
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
- `POST /purchase-orders/{id}/receive` - Mark PO as received

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
- `PATCH /settings/profile` - Update profile
- `DELETE /settings/profile` - Delete account
- `GET /settings/password` - Password settings page
- `PUT /settings/password` - Update password
- `GET /settings/appearance` - Appearance settings

### Authentication
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `POST /logout` - End session
- `GET /forgot-password` - Password reset request
- `POST /forgot-password` - Send reset email
- `GET /reset-password/{token}` - Reset password page
- `POST /reset-password` - Update password
- `GET /verify-email` - Email verification prompt
- `GET /verify-email/{id}/{hash}` - Verify email
- `POST /email/verification-notification` - Resend verification
- `GET /confirm-password` - Confirm password
- `POST /confirm-password` - Confirm password

## Authentication

The application uses Laravel Breeze with Inertia.js for authentication:

- **Login**: `GET /login`, `POST /login`
- **Password Reset**: `GET /forgot-password`, `POST /forgot-password`
- **Email Verification**: `GET /verify-email`, `POST /verification-notification`
- **Logout**: `POST /logout`

### Self-Registration

**Self-registration is disabled.** To create an account, please contact the administrator at admin@ims.com.

The registration routes (`/register`) redirect to the login page with a message directing users to contact admin for account creation.

## Default User

After seeding, you can login with:

- **Email**: `admin@ims.com`
- **Password**: `@temp123`

## Deployment

### Production Checklist

1. **Environment**
   ```bash
   copy .env.example .env
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