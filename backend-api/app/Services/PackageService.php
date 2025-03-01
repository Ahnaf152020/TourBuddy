<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PackageService
{
    public function validatePackageData($data)
    {
        return Validator::make($data, [
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'duration' => 'required|integer|min:1',
            'location' => 'required|string',
        ]);
    }

    public function createPackage($data)
    {
        $packageId = DB::table('package')->insertGetId([
            'price' => $data['price'],
            'description' => $data['description'],
            'duration' => $data['duration'],
            'location' => $data['location'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return DB::table('package')->where('id', $packageId)->first();
    }

    public function getAllPackages()
    {
        return DB::select("SELECT * FROM package");
    }

    public function updatePackage($id, $data)
    {
        $updated = DB::update(
            "UPDATE package SET price = ?, description = ?,location=?, duration = ?, updated_at = ? WHERE id = ?",
            [$data['price'], $data['description'], $data['location'],$data['duration'], now(), $id]
        );

        if ($updated) {
            return DB::table('package')->where('id', $id)->first();
        }

        return null;
    }

    public function deletePackage($id)
    {
        $deleted = DB::delete("DELETE FROM package WHERE id = ?", [$id]);

        return $deleted > 0;
    }
}
