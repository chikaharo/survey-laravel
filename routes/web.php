<?php

use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

Route::get('/', function () {
    return view('welcome');
});

Route::Get('/register', function() {
    return 'Hello';
});

// Route::post('/register', [AuthController::class, 'register'])->withMiddleware(function (Middleware $middleware) {
//     $middleware->validateCsrfTokens(except: [
//         'stripe/*',
//         'http://localhost:5173/*',
//         'http://example.com/foo/*',
//     ]);
// });