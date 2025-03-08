<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * User Registration
     */
    public function register(Request $request)
    {
        $response = $this->userService->register($request->all());
        return response()->json($response, $response['success'] ? 201 : 400);
    }

    /**
     * User Login
     */
    public function login(Request $request)
    {
        $response = $this->userService->login($request->all());
        return response()->json($response, $response['success'] ? 200 : 400);
    }

    /**
     * Get Authenticated User Profile
     */
    public function profile()
    {
        $user = Auth::guard('api')->user(); // Use 'api' guard for users

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        return response()->json(['success' => true, 'user' => $user]);
    }

    /**
     * User Logout
     */
    public function logout()
    {
        $response = $this->userService->logout();
        return response()->json($response);
    }
}
