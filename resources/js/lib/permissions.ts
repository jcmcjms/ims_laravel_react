/**
 * Permission utility functions for checking user permissions
 *
 * These helpers check if a user has specific permissions based on their
 * permission array from the authenticated user.
 */

/**
 * Check if user has a specific permission
 * @param permissions - Array of user permissions
 * @param permission - Permission string to check (e.g., 'create-users')
 * @returns boolean - True if user has the permission
 */
export function hasPermission(permissions: string[], permission: string): boolean {
    return permissions.includes(permission);
}

/**
 * Check if user can create a resource
 * @param permissions - Array of user permissions
 * @param resource - Resource name (e.g., 'users' → checks for 'create-users')
 * @returns boolean - True if user can create the resource
 */
export function canCreate(permissions: string[], resource: string): boolean {
    return permissions.includes(`create-${resource}`);
}

/**
 * Check if user can edit a resource
 * @param permissions - Array of user permissions
 * @param resource - Resource name (e.g., 'users' → checks for 'edit-users')
 * @returns boolean - True if user can edit the resource
 */
export function canEdit(permissions: string[], resource: string): boolean {
    return permissions.includes(`edit-${resource}`);
}

/**
 * Check if user can delete a resource
 * @param permissions - Array of user permissions
 * @param resource - Resource name (e.g., 'users' → checks for 'delete-users')
 * @returns boolean - True if user can delete the resource
 */
export function canDelete(permissions: string[], resource: string): boolean {
    return permissions.includes(`delete-${resource}`);
}

/**
 * Check if user can view a resource
 * @param permissions - Array of user permissions
 * @param resource - Resource name (e.g., 'users' → checks for 'view-users')
 * @returns boolean - True if user can view the resource
 */
export function canView(permissions: string[], resource: string): boolean {
    return permissions.includes(`view-${resource}`);
}

/**
 * Check if user has any CRUD permission for a resource
 * @param permissions - Array of user permissions
 * @param resource - Resource name to check all CRUD permissions for
 * @returns boolean - True if user has at least one CRUD permission
 */
export function hasAnyPermission(permissions: string[], resource: string): boolean {
    return (
        permissions.includes(`view-${resource}`) ||
        permissions.includes(`create-${resource}`) ||
        permissions.includes(`edit-${resource}`) ||
        permissions.includes(`delete-${resource}`)
    );
}