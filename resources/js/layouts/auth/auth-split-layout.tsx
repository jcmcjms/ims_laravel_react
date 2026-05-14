import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh w-full">
            {/* Left side - Hero section with branding */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-[58%] relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

                {/* Animated gradient orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-4 -top-4 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute -bottom-8 -right-4 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" style={{ animationDelay: '1s' }} />
                    <div className="absolute left-1/3 top-1/2 h-64 w-64 animate-pulse rounded-full bg-purple-500/10 blur-3xl" style={{ animationDelay: '2s' }} />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Content */}
                <div className="relative z-10 flex w-full flex-col justify-between p-12">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                            <AppLogoIcon className="h-8 w-8 fill-current text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-semibold tracking-tight text-white">IMS</span>
                            <span className="text-xs font-medium text-white/60">Inventory Management</span>
                        </div>
                    </Link>

                    {/* Center content */}
                    <div className="space-y-6">
                        {/* Decorative icon */}
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tight text-white xl:text-4xl">
                                Streamline Your Inventory Management
                            </h2>
                            <p className="max-w-lg text-lg text-white/70">
                                Take control of your stock, track movements in real-time, and make data-driven decisions with our comprehensive IMS solution.
                            </p>
                        </div>

                        {/* Feature list */}
                        <div className="grid gap-4 pt-4">
                            {[
                                { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Real-time Analytics' },
                                { icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', label: 'Multi-warehouse Support' },
                                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Role-based Access' },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-colors hover:bg-white/10"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                                        <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-white/90">{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-sm text-white/50">
                        <span>Secured with enterprise-grade encryption</span>
                        <span className="mx-2">·</span>
                        <span>99.9% Uptime SLA</span>
                    </div>
                </div>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Right side - Form section */}
            <div className="flex w-full flex-col justify-center lg:w-1/2 xl:w-[42%]">
                {/* Mobile logo */}
                <div className="absolute left-0 right-0 top-0 flex items-center gap-3 border-b border-border/50 bg-background/80 p-4 backdrop-blur-lg lg:hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 dark:bg-white">
                        <AppLogoIcon className="h-6 w-6 fill-current text-white dark:text-slate-900" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold tracking-tight">IMS</span>
                        <span className="text-xs text-muted-foreground">Inventory Management</span>
                    </div>
                </div>

                <div className="flex w-full flex-col justify-center px-8 py-12 sm:mx-auto sm:w-full sm:max-w-md sm:px-10 lg:p-12">
                    {/* Desktop header */}
                    <div className="mb-8 hidden lg:block">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 dark:bg-white">
                                <AppLogoIcon className="h-6 w-6 fill-current text-white dark:text-slate-900" />
                            </div>
                            <span className="text-xl font-semibold tracking-tight">IMS</span>
                        </div>
                    </div>

                    {/* Form header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                    </div>

                    {children}
                </div>

                {/* Footer */}
                <div className="flex w-full items-center justify-center px-8 py-6 text-center text-xs text-muted-foreground">
                    <span>&copy; {new Date().getFullYear()} Inventory Management System. All rights reserved.</span>
                </div>
            </div>
        </div>
    );
}