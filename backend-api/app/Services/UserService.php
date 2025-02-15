<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserService
{
    public function register($data)
    {
        // Validate request data
        $validator = Validator::make($data, [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6|confirmed',
             'role' => 'sometimes|string|in:admin,user',
        ]);

        if ($validator->fails()) {
            return ['success' => false, 'errors' => $validator->errors()];
        }

        // Create user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
             'role' => $data['role'] ?? 'user',
        ]);

        return ['success' => true, 'message' => 'User registered successfully!', 'user' => $user];
    }

    public function login($data)
    {
        $validator = Validator::make($data, [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return ['success' => false, 'errors' => $validator->errors()];
        }

        if (!$token = JWTAuth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return ['success' => false, 'msg' => 'Invalid credentials'];
        }

        $user = auth()->user();

        return ['success' => true, 'token' => $token, 'role' => $user->role, 'expires_in' => JWTAuth::factory()->getTTL() * 60];
    }

    public function logout()
    {
        try {
            auth()->logout();
            return ['success' => true, 'msg' => 'User logged out!'];
        } catch (\Exception $e) {
            return ['success' => false, 'msg' => $e->getMessage()];
        }
    }
}
