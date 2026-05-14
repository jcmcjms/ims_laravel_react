import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date string to a readable format
 * @example formatDate('2024-01-15') // 'Jan 15, 2024'
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Format a currency value
 * @example formatCurrency(1234.56) // '$1,234.56'
 */
export function formatCurrency(value: number | string): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(numValue);
}

/**
 * Truncate text to a specified length
 * @example truncate('Hello World', 5) // 'Hello...'
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Format a number with commas
 * @example formatNumber(1234567) // '1,234,567'
 */
export function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Pluralize a word based on count
 * @example pluralize('item', 1) // 'item'
 * @example pluralize('item', 5) // 'items'
 */
export function pluralize(word: string, count: number): string {
    return count === 1 ? word : word + 's';
}