<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',   // ID of the related package
        'tour_guide_id', // ID of the related tour guide
        'user_id',       // ID of the user who created the review
        'rating',        // Rating (1-5)
        'review',        // Review text
    ];

    /**
     * Relationship with Package
     */
    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    /**
     * Relationship with TourGuide
     */
    public function tourGuide()
    {
        return $this->belongsTo(TourGuide::class);
    }

    /**
     * Relationship with User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
