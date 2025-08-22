<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\UserController;
use App\Providers\RouteServiceProvider;

// Rutas de autenticación (sin middleware auth)
Route::get('/login', function (Request $request) {
    // Mejor práctica: usar Session en lugar de $_COOKIE directamente
    if (Auth::check()) {
        return response()->json([
            'message' => 'Already authenticated',
            'user' => Auth::user(),
            'session_id' => $request->session()->getId()
        ]);
    }
    
    return response()->json([
        'message' => 'Not authenticated',
        'session_id' => $request->session()->getId() ?? 'No session found'
    ]);
});

Route::post('/logout', function (Request $request) {
    // Mejor práctica: usar Laravel's logout
    if (Auth::check()) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
    
    return response()->json([
        'message' => 'Not authenticated'
    ], 401);
});

// Rutas protegidas con middleware auth
Route::middleware(['auth'])->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json([
            'message' => 'Authenticated user',
            'user' => Auth::user(),
            'session_id' => $request->session()->getId()
        ]);
    });
    
    Route::get('/profile', function () {
        return response()->json([
            'message' => 'User profile',
            'user' => Auth::user()
        ]);
    });
    
    Route::put('/profile', function (Request $request) {
        $user = Auth::user();
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
        ]);
        
        $user->update($validated);
        
        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    });
});

// Rutas adicionales que podrías necesitar
Route::middleware(['auth'])->group(function () {
    // Obtener todos los usuarios (requiere permisos adicionales)
    Route::get('/', function () {
        // En un caso real, esto debería tener middleware de autorización
        $users = \App\Models\User::paginate(10);
        
        return response()->json($users);
    });
    
    // Buscar usuarios
    Route::get('/search', function (Request $request) {
        $query = $request->get('q');
        
        $users = \App\Models\User::where('name', 'like', "%{$query}%")
            ->orWhere('email', 'like', "%{$query}%")
            ->paginate(10);
            
        return response()->json($users);
    });
});