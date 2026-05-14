/**
 * Permission utility functions for checking user permissions
 */

/**
 * Check if user has a specific permission
 */
export function hasPermission(permissions: string[], permission: string): boolean {
    return permissions.includes(permission);
}

/**
 * Check if user can create a resource
 */
export function canCreate(permissions: string[], resource: string): boolean {
    return permissions.includes(`create-${resource}`);
}

/**
 * Check if user can edit a resource
 */
export function canEdit(permissions: string[], resource: string): boolean {
    return permissions.includes(`edit-${resource}`);
}

/**
 * Check if user can delete a resource
 */
export function canDelete(permissions: string[], resource: string): boolean {
    return permissions.includes(`delete-${resource}`);
}

/**
 * Check if user can view a resource
 */
export function canView(permissions: string[], resource: string): boolean {
    return permissions.includes(`view-${resource}`);
}

/**
 * Check if user has any permission for a resource
 */
export function hasAnyPermission(permissions: string[], resource: string): boolean {
    return (
        permissions.includes(`view-${resource}`) ||
        permissions.includes(`create-${resource}`) ||
        permissions.includes(`edit-${resource}`) ||
        permissions.includes(`delete-${resource}`)
    );
}