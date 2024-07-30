<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $survey = $this->route('survey');
        if($this->user()->id !== $survey->user_id) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'title' => 'required|string|max:1000',
            'image' => 'string|nullable',
            'user_id' => 'exists:users,id',
            'status' => 'required|boolean',
            'questions' => 'array',
            'description' => 'nullable|string',
            'expire_date' => 'nullable|date|after:tommorow'
        ];
    }
}
