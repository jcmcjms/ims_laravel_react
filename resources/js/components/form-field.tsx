import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { HTMLAttributes } from 'react';

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    id: string;
    error?: string;
    required?: boolean;
    children?: React.ReactNode;
}

/**
 * Reusable form field component that wraps Label + Input + Error message
 */
export default function FormField({
    label,
    id,
    error,
    required = false,
    children,
    className,
    ...props
}: FormFieldProps) {
    return (
        <div className={cn('grid gap-2', className)} {...props}>
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {children || (
                <Input
                    id={id}
                    type="text"
                />
            )}
            <InputError message={error} />
        </div>
    );
}

/**
 * Controlled form field with custom input component
 */
export function ControlledFormField({
    label,
    id,
    error,
    required = false,
    children,
    className,
    ...props
}: FormFieldProps) {
    return (
        <div className={cn('grid gap-2', className)} {...props}>
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {children}
            <InputError message={error} />
        </div>
    );
}