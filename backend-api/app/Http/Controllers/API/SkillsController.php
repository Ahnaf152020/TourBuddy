<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Models\TourGuide;
use Illuminate\Support\Facades\Validator;

class SkillsController extends Controller
{
    // Create skill for a tour guide
    public function create(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'guide_id' => 'required|exists:tour_guides,id', // Ensure guide_id exists in the tour_guides table
            'years_of_experience' => 'required|integer|min:1',
            'language_proficiency' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }

        // Create the skill
        $skill = Skill::create([
            'guide_id' => $request->guide_id,
            'years_of_experience' => $request->years_of_experience,
            'language_proficiency' => $request->language_proficiency,
        ]);

        return response()->json([
            'message' => 'Skill added successfully!',
            'skill' => $skill,
        ], 201);
    }

    // Get all skills for a tour guide
    public function index($guideId)
    {
        $skills = Skill::where('guide_id', $guideId)->get();

        return response()->json([
            'skills' => $skills,
        ]);
    }

    // Update a skill for a guide
    public function update(Request $request, $id)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'years_of_experience' => 'required|integer|min:1',
            'language_proficiency' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }

        $skill = Skill::find($id);
        if (!$skill) {
            return response()->json([
                'success' => false,
                'message' => 'Skill not found!',
            ], 404);
        }

        // Update the skill
        $skill->update([
            'years_of_experience' => $request->years_of_experience,
            'language_proficiency' => $request->language_proficiency,
        ]);

        return response()->json([
            'message' => 'Skill updated successfully!',
            'skill' => $skill,
        ]);
    }

    // Delete a skill for a guide
    public function destroy($id)
    {
        $skill = Skill::find($id);
        if (!$skill) {
            return response()->json([
                'success' => false,
                'message' => 'Skill not found!',
            ], 404);
        }

        $skill->delete();

        return response()->json([
            'message' => 'Skill deleted successfully!',
        ]);
    }
}
