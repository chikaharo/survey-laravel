<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    //
    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => [
                'required',
                'confirmed'
            ]
        ]);


        $user = User::create([
            'name' => $data['name'],
            'email' => $data[
                'email'
            ],
            'password' => $data['password']
        ]);
        $token = $user->createToken('token-name', ['server:update'])->plainTextToken;
        // $token = 'fdhsof70238723';

        return response([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            "email" => "required|email|string|exists:users,email",
            "password" => "required",
            "remember" => "boolean"
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        // dump($credentials);

        if(!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        // if(Auth::attempt([
        //     'email' => $credentials['email'],
        //     'password' => $credentials['password'],
        // ])) {
        //     return response([
        //         'error' => 'The Provided credentials are not correct'
        //     ], 422);
        // }
        $user = Auth::user();
        $token = $user->createToken('token-name', ['server:update'])->plainTextToken;
        
        return response([
            "token" => $token,
            "user" => $user
        ]);
    }

    public function logout(Request $request) {
        // Auth::logout();
 
        // $request->session()->invalidate();
     
        // $request->session()->regenerateToken();

        $user = Auth::user();
        $user->currentAccessToken()->delete();
     
        return response(['success' => true]);
    } 
}
