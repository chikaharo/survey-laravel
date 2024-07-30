<?php

namespace App\Http\Resources;

use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyAnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            // 'survey' => SurveyResource::collection(Survey::query()->where('id', $this->survey_id)),
            'survey' => new SurveyResource($this->survey),
            'end_date' => $this->end_date
        ];
    }
}
