<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth; // Import JWTAuth
use Illuminate\Support\Facades\Auth; // Import Auth

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Create user if validation passes
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
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
    
        // Attempt login for the user
        $credentials = $validator->validated();
        if (!$token = JWTAuth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], ['guard' => 'user'])) { // Ensure the 'user' guard is used
            return response()->json([
                'success' => false,
                'msg' => 'Invalid credentials',
            ], 401);
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

    //logout-api method
    public function logout()
    {

try{
    auth()->logout();
    return response()->json(['success'=> true,'msg'=> 'User logged out!']);

}catch(\Exception $e){

    return response()->json(['success'=> false,'msg'=> $e->getMessage()]);
}
        // Attempt login and generate token



    }



}
