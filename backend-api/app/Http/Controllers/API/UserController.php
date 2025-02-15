<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(Request $request)
    {
        $response = $this->userService->register($request->all());
        return response()->json($response, $response['success'] ? 201 : 400);
    }

    public function login(Request $request)
    {
        $response = $this->userService->login($request->all());
        return response()->json($response, $response['success'] ? 200 : 400);
    }

    public function logout()
    {
        $response = $this->userService->logout();
        return response()->json($response);
    }
}
