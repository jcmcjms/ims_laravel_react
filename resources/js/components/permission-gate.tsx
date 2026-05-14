import { usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface PermissionGateProps {
    permission: string;
    children: ReactNode;
}

/**
 * Conditionally renders children only if user has the specified permission
 *
 * @example
 * <PermissionGate permission="create-users">
 *   <Button>Create User</Button>
 * </PermissionGate>
 */
export default function PermissionGate({ permission, children }: PermissionGateProps) {
    const { props } = usePage();
    const userPermissions = props.auth?.user?.permissions || [];

    if (!userPermissions.includes(permission)) {
        return null;
    }

    return <>{children}</>;
}