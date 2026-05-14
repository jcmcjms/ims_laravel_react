<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex, nofollow">
        <title>Access Denied - {{ config('app.name', 'IMS') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Instrument Sans', 'system-ui', 'sans-serif],
                        },
                    },
                },
            }
        </script>
        <style>
            body {
                font-family: 'Instrument Sans', system-ui, sans-serif;
            }
        </style>
    </head>
    <body class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Card Container -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <!-- Red accent bar at top -->
                <div class="h-2 bg-gradient-to-r from-red-500 via-rose-500 to-red-600"></div>

                <div class="p-8 text-center">
                    <!-- Shield/Lock Icon -->
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>

                    <!-- Error Code -->
                    <div class="mb-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                            Error 403
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                        Access Denied
                    </h1>

                    <!-- Message -->
                    <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        You don't have permission to access this page. If you believe this is an error, please contact your administrator or request additional permissions.
                    </p>

                    <!-- Divider -->
                    <div class="border-t border-slate-200 dark:border-slate-700 my-6"></div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="{{ route('dashboard') }}"
                           class="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Back to Dashboard
                        </a>

                        <button onclick="history.back()"
                                class="inline-flex items-center justify-center px-5 py-2.5 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-lg border border-slate-300 dark:border-slate-600 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                            </svg>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>

            <!-- Footer Note -->
            <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                Need help? Contact <a href="mailto:support@example.com" class="text-slate-700 dark:text-slate-300 hover:underline">support@example.com</a>
            </p>
        </div>
    </body>
</html>