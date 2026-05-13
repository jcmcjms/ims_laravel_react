# Inventory Management System (IMS) - Specification

## 1. Project Overview

- **Project Name**: Inventory Management System (IMS)
- **Type**: Web Application (Laravel 12 + React/Inertia)
- **Core Functionality**: A comprehensive inventory management system for tracking products, categories, inventory levels, suppliers, purchase orders, and stock movements
- **Target Users**: Small to medium businesses needing to manage their inventory

## 2. Technology Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React with Inertia.js
- **Database**: PostgreSQL
- **Authentication**: Laravel Breeze (or built-in auth)
- **Password**: @temp123

## 3. Core Features

### 3.1 Product Management
- Create, read, update, delete products
- Product fields: name, SKU, description, category, unit_price, cost_price, image
- Product search and filtering
- Product variant support (size, color, etc.)

### 3.2 Category Management
- Hierarchical category structure (parent/child)
- Category CRUD operations
- Category-based product filtering

### 3.3 Inventory Management
- Track inventory levels per product per warehouse
- Set minimum stock threshold alerts
- Stock adjustment (add/remove stock)
- Inventory history/audit trail

### 3.4 Supplier Management
- Supplier CRUD operations
- Contact information (name, email, phone, address)
- Supplier-based product linking

### 3.5 Purchase Orders
- Create purchase orders from suppliers
- PO fields: supplier, date, expected delivery, status, items
- PO statuses: pending, ordered, received, cancelled
- Receive inventory from PO

### 3.6 Stock Movements
- Track all stock in/out movements
- Movement types: purchase, sale, adjustment, return
- Movement history with timestamps

### 3.7 Dashboard
- Overview of total products, low stock items
- Recent stock movements
- Quick stats (total inventory value, top categories)

### 3.8 Reports
- Inventory valuation report
- Low stock report
- Stock movement history

## 4. Database Schema

### Tables
- `products` - id, name, sku, description, category_id, unit_price, cost_price, image, created_at, updated_at
- `categories` - id, name, description, parent_id, created_at, updated_at
- `inventory` - id, product_id, warehouse_id, quantity, min_stock_level, created_at, updated_at
- `warehouses` - id, name, location, created_at, updated_at
- `suppliers` - id, name, contact_person, email, phone, address, created_at, updated_at
- `purchase_orders` - id, supplier_id, order_date, expected_delivery, status, notes, created_at, updated_at
- `purchase_order_items` - id, purchase_order_id, product_id, quantity, unit_price, received_quantity
- `stock_movements` - id, product_id, warehouse_id, movement_type, quantity, reference_type, reference_id, notes, created_at
- `users` - Laravel default

## 5. UI/UX Requirements

- Clean, modern interface using Laravel's UI patterns
- Responsive design (mobile-friendly)
- Data tables with sorting, filtering, pagination
- Form validation with error messages
- Confirmation dialogs for destructive actions
- Toast notifications for success/error feedback

## 6. Acceptance Criteria

- [ ] User can manage categories (CRUD)
- [ ] User can manage products (CRUD) with image upload
- [ ] User can manage warehouses
- [ ] User can manage suppliers (CRUD)
- [ ] User can create and manage purchase orders
- [ ] User can view and manage inventory levels
- [ ] Dashboard displays key metrics
- [ ] Stock movements are tracked
- [ ] Low stock alerts are displayed
- [ ] All forms have proper validation
- [ ] Application is responsive