import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

interface UserData {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    avatar?: string;
    email_verified_at: string | null;
}

interface ProfileProps {
    mustVerifyEmail: boolean;
    status?: string;
    avatarUrl?: string;
    user: UserData;
}

export default function Profile({ mustVerifyEmail, status, avatarUrl, user }: ProfileProps) {
    const getInitials = useInitials();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl || null);

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        avatar: null as File | null,
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('avatar', file);
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profile updated successfully', {
                    description: 'Your profile changes have been saved.',
                });
                // Clear avatar from form data after successful upload
                setData('avatar', null);
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat();
                toast.error('Failed to update profile', {
                    description: errorMessages[0] || 'Something went wrong.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Avatar Card */}
                    <Card className="overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-20 w-20 overflow-hidden rounded-full border-2 border-border">
                                        <AvatarImage src={avatarPreview || undefined} alt={user.name} />
                                        <AvatarFallback className="rounded-lg bg-muted text-xl font-medium">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <button
                                        type="button"
                                        onClick={triggerFileInput}
                                        className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="sr-only"
                                    />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{user.name}</CardTitle>
                                    <CardDescription>Update your profile photo</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground">
                                Click the camera icon to upload a new photo. JPG, PNG, GIF or WebP up to 2MB.
                            </p>
                            {data.avatar && (
                                <p className="mt-2 text-sm font-medium text-primary">
                                    New photo selected: {data.avatar.name}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Profile Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your name and email address</CardDescription>
                        </CardHeader>
                        <form onSubmit={submit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Enter your full name"
                                        className={cn(errors.name && 'border-destructive')}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                        placeholder="Enter your email address"
                                        className={cn(errors.email && 'border-destructive')}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {mustVerifyEmail && user.email_verified_at === null && (
                                    <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                                        <p className="font-medium">Email unverified</p>
                                        <p className="mt-1">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={route('verification.send')}
                                                method="post"
                                                as="button"
                                                className="underline hover:text-amber-900 dark:hover:text-amber-100"
                                            >
                                                Click here to resend the verification email.
                                            </Link>
                                        </p>
                                        {status === 'verification-link-sent' && (
                                            <p className="mt-2 font-medium text-green-600 dark:text-green-400">
                                                A new verification link has been sent to your email address.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-end border-t bg-muted/50 px-6 py-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save changes'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* Contact Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Update your contact details</CardDescription>
                        </CardHeader>
                        <form onSubmit={submit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        autoComplete="tel"
                                        placeholder="Enter your phone number"
                                        className={cn(errors.phone && 'border-destructive')}
                                    />
                                    <InputError message={errors.phone} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        autoComplete="street-address"
                                        placeholder="Enter your address"
                                        className={cn(errors.address && 'border-destructive')}
                                    />
                                    <InputError message={errors.address} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t bg-muted/50 px-6 py-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save changes'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>

                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}