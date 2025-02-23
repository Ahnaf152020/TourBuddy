<?php

namespace App\Services;

use App\Models\Skill;
use App\Models\TourGuide;

class SkillService
{
    /**
     * Create a new skill for a tour guide.
     */
    public function createSkill($data)
    {
        return Skill::create($data);
    }

    /**
     * Get all skills for a specific tour guide.
     */
    public function getSkillsByGuideId($guideId)
    {
        return Skill::where('guide_id', $guideId)->get();
    }

    /**
     * Get all skills with tour guide details using Eloquent relationships.
     */
    public function getSkillsWithGuides()
    {
        return Skill::with('tourGuide')->get();
    }

    /**
     * Update an existing skill.
     */
    public function updateSkill($id, $data)
    {
        $skill = Skill::find($id);
        if ($skill) {
            $skill->update($data);
        }
        return $skill;
    }

    /**
     * Delete a skill.
     */
    public function deleteSkill($id)
    {
        return Skill::destroy($id) > 0;
    }
}
