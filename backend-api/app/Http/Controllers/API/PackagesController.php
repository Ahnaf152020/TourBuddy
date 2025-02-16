<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Package;
use Illuminate\Support\Facades\Validator;

class PackagesController extends Controller
{
    // Create a new package
    public function create(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'duration' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }

        // Create the package
        $package = Package::create([
            'price' => $request->price,
            'description' => $request->description,
            'duration' => $request->duration,
        ]);

        return response()->json([
            'message' => 'Package created successfully!',
            'package' => $package,
        ], 201);
    }

    // Get all packages
    public function index()
    {
        $packages = Package::all();

        return response()->json([
            'packages' => $packages,
        ]);
    }

    // Update a package
    public function update(Request $request, $id)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'duration' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }

        $package = Package::find($id);
        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found!',
            ], 404);
        }

        // Update the package
        $package->update([
            'price' => $request->price,
            'description' => $request->description,
            'duration' => $request->duration,
        ]);

        return response()->json([
            'message' => 'Package updated successfully!',
            'package' => $package,
        ]);
    }

    // Delete a package
    public function destroy($id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found!',
            ], 404);
        }

        $package->delete();

        return response()->json([
            'message' => 'Package deleted successfully!',
        ]);
    }
}
