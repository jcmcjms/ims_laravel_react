<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     * Registration is disabled - redirect to login.
     */
    public function create(): RedirectResponse
    {
        return redirect()->route('login')->with('info', 'Self-registration is disabled. Please contact admin@ims.com to create an account.');
    }

    /**
     * Handle an incoming registration request.
     * Registration is disabled - redirect to login.
     */
    public function store(Request $request): RedirectResponse
    {
        return redirect()->route('login')->with('info', 'Self-registration is disabled. Please contact admin@ims.com to create an account.');
    }
}
