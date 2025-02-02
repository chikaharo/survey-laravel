<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyDashboardResource;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function index(Request $request) { 
        $user = $request->user();
        $totalSurveys = Survey::query()->where('user_id', $user->id)->count(); 
        $latestSurvey = Survey::query()->where('user_id', $user->id)->orderBy("created_at", "DESC")->first();
        $totalAnswers = SurveyAnswer::query()->join('surveys', 'survey_id', '=', 'surveys.id')->where('surveys.user_id', $user->id)->count();
        $latestAnswers  = SurveyAnswer::query()->join('surveys', 'survey_id', '=', 'surveys.id')->where('surveys.user_id', $user->id)->orderBy('end_date', 'DESC')->limit(5)->getModels('survey_answers.*');
        return [
            'totalSurveys' => $totalSurveys,
            'latestSurvey' => $latestSurvey ? new SurveyDashboardResource($latestSurvey) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => $latestAnswers ? SurveyAnswerResource::collection($latestAnswers) : null,

        ];
    } 
}
