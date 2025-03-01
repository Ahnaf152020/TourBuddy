<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    // Define the fillable attributes to prevent mass-assignment vulnerabilities
    protected $fillable = [
        'package_id',
        'user_id',  // Assuming you have a User model for users
        'rating',
        'review',
    ];

    /**
     * Relationship with Package (A review belongs to a package)
     */
    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    /**
     * Relationship with User (A review belongs to a user)
     */
    public function user()
    {
        return $this->belongsTo(User::class); // Assuming you have a User model
    }

    /**
     * Prevent recursion in JSON output by hiding specific relationships
     */
    public function toArray()
    {
        $array = parent::toArray();

        // Fetch the user without causing recursion
        $array['user'] = $this->user()->first(); // Fetch the user

        // Fetch the package without causing recursion
        $array['package'] = $this->package()->first(); // Fetch the package

        // Optionally, you can choose to hide full relationships like 'user' or 'package' 
        // from the JSON output instead of including them as separate objects.
        // $this->makeHidden(['user', 'package']); 

        return $array;
    }
}
