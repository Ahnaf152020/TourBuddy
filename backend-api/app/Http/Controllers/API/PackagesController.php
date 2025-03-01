<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PackageService;
use App\Models\Package;

class PackagesController extends Controller
{
    protected $packageService;

    public function __construct(PackageService $packageService)
    {
        $this->packageService = $packageService;
    }

    public function create(Request $request)
{
    // Validate request data
    $validator = $this->packageService->validatePackageData($request->all());

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors(),
        ], 400);
    }

    // Call service method to create package
    $package = $this->packageService->createPackage($request->all());

    return response()->json([
        'message' => 'Package created successfully!',
        'package' => $package
    ], 201);
}


    public function index()
    {
        $packages = $this->packageService->getAllPackages();

        return response()->json([
            'packages' => $packages,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = $this->packageService->validatePackageData($request->all());

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }

        $package = $this->packageService->updatePackage($id, $request->all());

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found!',
            ], 404);
        }

        return response()->json([
            'message' => 'Package updated successfully!',
            'package' => $package,
        ]);
    }

    public function destroy($id)
    {
        $deleted = $this->packageService->deletePackage($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found!',
            ], 404);
        }

        return response()->json([
            'message' => 'Package deleted successfully!',
        ]);
    }





}
