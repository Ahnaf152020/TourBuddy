<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TourGuide; // Updated model name
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class TourGuidesController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:tour_guides',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }

        // Create tour guide if validation passes
        $tourGuide = TourGuide::create([ // Updated model name
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone, // Add phone field
            'experience' => $request->experience, // Add experience field
            'language' => $request->language, // Add language field
        ]);
        

        return response()->json([
            'message' => 'Tour guide registered successfully!',
            'tour_guide' => $tourGuide,
        ], 201);
    }

    // Login API
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }
    
        // Get the user from the database
        $tourGuide = TourGuide::where('email', $request->email)->first();
    
        if (!$tourGuide) {
            return response()->json([
                'success' => false,
                'msg' => 'Email not found',
            ], 401);
        }
    
        // Check if password matches
        if (!Hash::check($request->password, $tourGuide->password)) {
            return response()->json([
                'success' => false,
                'msg' => 'Invalid credentials',
            ], 401);
        }
    
        // Attempt login
        if (!$token = JWTAuth::fromUser($tourGuide)) {
            return response()->json([
                'success' => false,
                'msg' => 'Could not create token',
            ], 500);
        }
    
        return $this->respondWithToken($token);
    }
    

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
        ]);
    }

    // Logout API method
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken()); // Invalidate token for JWT
            return response()->json([
                'success' => true,
                'msg' => 'Tour guide logged out!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'msg' => $e->getMessage(),
            ]);
        }
    }
}
