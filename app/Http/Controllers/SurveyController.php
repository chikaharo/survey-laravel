<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str; 
use Illuminate\Validation\Rule;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->latest('created_at')->paginate(1));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request) 
    {
        //
        // $credentials = $request->validated();
        // $path = $request->file('image')->store('images');
        // $data['image'] = $path;
        $data = $request->validated();
        if(isset($data['image'])) {
            $path = $this->saveImage($data['image']);
            // $path = $request->file('image')->store('images');
            $data['image'] = $path;
        }
        $survey = Survey::create($data);

        // Create new question 
        foreach($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }
        return new SurveyResource($survey);
    }

    public function storeAnswer(StoreSurveyAnswerRequest $request, Survey $survey) {
        $validated = $request->validated();

        $surveyAnswer = SurveyAnswer::create([
            'survey_id' => $survey->id,
            'start_date' => date('Y-m-d H:i:s'),
            'end_date' => date('Y-m-d H:i:s'),
        ]);

        foreach($validated['answers'] as $questionId => $answer ) {
            $question = SurveyQuestion::where(['id' => $questionId, 'survey_id' => $survey->id])->get();
            if(!$question) {
                return response('Invalid question Id', 400); 
            }

            $data = [
                'survey_question_id' => $questionId,
                'survey_answer_id' => $surveyAnswer->id,
                'answer' => is_array($answer) ? json_encode($answer) : $answer
            ];

            SurveyQuestionAnswer::create($data);
        }

        return response("Create Answer successfully", 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
        //
        $user = $request->user();
        if($survey->user_id !== $user->id) {
            return abort(403, 'Unauthorized');
        }
        return new SurveyResource($survey);
    }

    public function showGuest(Survey $survey) {
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        //
        $user = $request->user();
        if($survey->user_id !== $user->id) {
            return abort(403, 'Unauthorized');
        }
        $data = $request->validated();
        if(isset($data['image']) && preg_match('/^data:image\/(\w+);base64,/', $data['image'], $type)) {

            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

           if($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
           }
        }
        $survey->update($data);

        $existingIds = $survey->questions()->pluck('id')->toArray();
        $newIds = Arr::pluck($data['questions'], 'id');
        $toDelete = array_diff($existingIds, $newIds);
        $toAdd = array_diff($newIds, $existingIds);
        if(!empty($toDelete)) {
            SurveyQuestion::destroy($toDelete);
        }

        #Create add questions
        foreach($data['questions'] as $question) {
            if(in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        #update existing questions
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach($survey->questions as $question) {
            if(isset($questionmap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }


        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {
        //
        Survey::destroy($survey->id);
        if(isset($survey->image)) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }
        return response()->json(['message' => "Delete succeed"]);
    }

    private function saveImage($image) {
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);

            if(!in_array($type, ['jpg', 'png', 'jpeg', 'gif'])) {
                throw new \Exception('invalid image type');
            }

            // $image = str_replace($image, ' ', '+');
            $image = base64_decode($image);
            if(!$image) {
                throw new \Exception('base64 decode failed');
            }

            
        } else {
            throw new \Exception('did not match data URI with image data');
        }
        $dir = 'images/';
            $file = Str::random(12) . "." . $type;
            $absolutePath = public_path($dir);
            $relativePath = $dir . $file;
            if(!File::exists($absolutePath)) {
                File::makeDirectory($absolutePath, 0755, true);
            }
            file_put_contents($relativePath, $image);
            return $relativePath; 
    }

    private function createQuestion($question) {
        if(is_array($question['data'])) {
            $question['data'] = json_encode($question['data']);
        }

        $validator = Validator::make($question, [
            'question' => 'string|required',
            'description' => 'string|nullable',
            'type' => ['required', Rule::in([
                Survey::TEXT_TYPE,
                Survey::TEXTAREA_TYPE,
                Survey::CHECKBOX_TYPE,
                Survey::RADIO_TYPE,
                Survey::SELECT_TYPE
            ])],
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
            ]);
        return SurveyQuestion::create($validator->validated());
    }

    private function updateQuestion(SurveyQuestion $question, $data) {
        if(is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
 
        $validator = Validator::make($data, [
            'question' => 'string|required',
            'description' => 'string|nullable',
            'type' => ['required', Rule::in([
                Survey::TEXT_TYPE,
                Survey::TEXTAREA_TYPE,
                Survey::CHECKBOX_TYPE,
                Survey::RADIO_TYPE,
                Survey::SELECT_TYPE 
            ])],
            'data' => 'present',
            'id' => 'exists:App\Models\SurveyQuestion,id'
            ]);
        return $question->update($validator->validated());
    }
}
