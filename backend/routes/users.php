<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/**
 * Sanctum (SPA) usa cookies de sesión.
 * Lado frontend: primero GET /sanctum/csrf-cookie, luego POST /login.
 */

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required','email'],
        'password' => ['required'],
    ]);

    if (! Auth::attempt($credentials, remember: true)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $request->session()->regenerate();

    return response()->json([
        'message' => 'Logged in',
        'user' => Auth::user(),
    ]);
})->middleware('web');

Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Logged out']);
})->middleware('web');


Route::get('/api/user', function (Request $request) {
    return $request->user();
});