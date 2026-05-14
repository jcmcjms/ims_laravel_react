import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Lock, AlertTriangle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Password updated successfully', {
                    description: 'Your password has been changed.',
                });
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                toast.error('Failed to update password', {
                    description: errorMessages[0] || 'Something went wrong.',
                });

                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Security Notice Card */}
                    <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10">
                        <CardContent className="flex items-start gap-4 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <p className="font-medium text-amber-800 dark:text-amber-200">Security Recommendation</p>
                                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                                    Use a long, random password to keep your account secure. We recommend at least 12 characters with a mix of letters, numbers, and symbols.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Password Update Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Update Password</CardTitle>
                                    <CardDescription>Change your password to keep your account secure</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <form onSubmit={updatePassword}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current_password">Current password</Label>
                                    <Input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your current password"
                                        className={cn(errors.current_password && 'border-destructive')}
                                    />
                                    <InputError message={errors.current_password} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">New password</Label>
                                    <Input
                                        id="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Enter your new password"
                                        className={cn(errors.password && 'border-destructive')}
                                    />
                                    <InputError message={errors.password} />
                                    <p className="text-xs text-muted-foreground">
                                        Minimum 8 characters with at least one number and one special character.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirm new password</Label>
                                    <Input
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Confirm your new password"
                                        className={cn(errors.password_confirmation && 'border-destructive')}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t bg-muted/50 px-6 py-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update password'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}