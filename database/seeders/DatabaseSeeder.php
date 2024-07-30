<?php

namespace Database\Seeders;

use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $user = User::factory()->create();

        $survey = Survey::factory(10)->create([
            'user_id' => $user->id,
            'title' => 'Sample Survey',
            'slug' => 'sample-survey',
            'status' => 1,
            'description' => 'This is a sample survey',
        ]);

        // Create survey questions
        $questions = SurveyQuestion::factory()->count(5)->create([
            'survey_id' => $survey->id,
        ]);

        // Create survey answers
        $answers = SurveyAnswer::factory()->count(10)->create([
            'survey_id' => $survey->id,
        ]);

        // Assign answers to questions
        foreach ($questions as $question) {
            $question->answers()->sync($answers->random(rand(1, 5))->pluck('id'));
        }
    }
}
