<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\SkillService;
use Illuminate\Support\Facades\Validator;

class SkillsController extends Controller
{
    protected $skillService;

    public function __construct(SkillService $skillService)
    {
        $this->skillService = $skillService;
    }

    /**
     * Create a skill for a tour guide.
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guide_id' => 'required|exists:tour_guides,id',
            'years_of_experience' => 'required|integer|min:1',
            'language_proficiency' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 400);
        }

        $skill = $this->skillService->createSkill($request->all());

        return response()->json([
            'message' => 'Skill added successfully!',
            'skill' => $skill,
        ], 201);
    }

    /**
     * Get all skills for a specific tour guide.
     */
    public function index($guideId)
    {
        $skills = $this->skillService->getSkillsByGuideId($guideId);
        return response()->json([
            'skills' => $skills,
        ]);
    }

    /**
     * Get all skills along with tour guide details.
     */
    public function getSkillsWithGuides()
    {
        $skills = $this->skillService->getSkillsWithGuides();
        return response()->json([
            'skills' => $skills,
        ]);
    }

    /**
     * Update a skill.
     */
    public function update(Request $request, $id)
    {
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

        $skill = $this->skillService->updateSkill($id, $request->all());

        if (!$skill) {
            return response()->json([
                'success' => false,
                'message' => 'Skill not found!',
            ], 404);
        }

        return response()->json([
            'message' => 'Skill updated successfully!',
            'skill' => $skill,
        ]);
    }

    /**
     * Delete a skill.
     */
    public function destroy($id)
    {
        $deleted = $this->skillService->deleteSkill($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Skill not found!',
            ], 404);
        }

        return response()->json([
            'message' => 'Skill deleted successfully!',
        ]);
    }
}
