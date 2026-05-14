import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import { HTMLAttributes } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    id: string;
    value: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    required?: boolean;
}

/**
 * Reusable select field component that wraps Label + Select + Error message
 */
export default function SelectField({
    label,
    id,
    value,
    onValueChange,
    options,
    placeholder = 'Select an option',
    error,
    required = false,
    className,
    ...props
}: SelectFieldProps) {
    return (
        <div className={cn('grid gap-2', className)} {...props}>
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
                value={value}
                onValueChange={onValueChange}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
}