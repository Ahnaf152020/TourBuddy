<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TourGuideService;

class TourGuidesController extends Controller
{
    protected $tourGuideService;

    public function __construct(TourGuideService $tourGuideService)
    {
        $this->tourGuideService = $tourGuideService;
    }

    public function register(Request $request)
    {
        $response = $this->tourGuideService->register($request->all());
        return response()->json($response, $response['success'] ? 201 : 400);
    }

    public function login(Request $request)
    {
        $response = $this->tourGuideService->login($request->all());
        return response()->json($response, $response['success'] ? 200 : 400);
    }

    public function logout()
    {
        $response = $this->tourGuideService->logout();
        return response()->json($response);
    }



    public function getAllTourGuides()
    {
        return response()->json($this->tourGuideService->getAllTourGuides());
    }


}
