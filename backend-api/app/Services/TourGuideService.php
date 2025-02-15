<?php

namespace App\Services;

use App\Models\TourGuide;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class TourGuideService
{
    public function register($data)
    {
        // Validate request data
        $validator = Validator::make($data, [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:tour_guides',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'required|string',
            'experience' => 'required|string',
            'language' => 'required|string',
            'location' => 'required|string',
              'role' => 'string|in:tour_guide',
        ]);

        if ($validator->fails()) {
            return ['success' => false, 'errors' => $validator->errors()];
        }

        // Create tour guide
        $tourGuide = TourGuide::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phone' => $data['phone'],
            'experience' => $data['experience'],
            'language' => $data['language'],
            'location' => $data['location'],
            'role' => $data['role'] ?? 'tour_guide',
        ]);

        return ['success' => true, 'message' => 'Tour guide registered successfully!', 'tour_guide' => $tourGuide];
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

        $tourGuide = TourGuide::where('email', $data['email'])->first();

        if (!$tourGuide || !Hash::check($data['password'], $tourGuide->password)) {
            return ['success' => false, 'msg' => 'Invalid credentials'];
        }

        if (!$token = JWTAuth::fromUser($tourGuide)) {
            return ['success' => false, 'msg' => 'Could not create token'];
        }

        return ['success' => true, 'token' => $token,'role' => $tourGuide->role, 'expires_in' => JWTAuth::factory()->getTTL() * 60];
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return ['success' => true, 'msg' => 'Tour guide logged out!'];
        } catch (\Exception $e) {
            return ['success' => false, 'msg' => $e->getMessage()];
        }
    }
}
