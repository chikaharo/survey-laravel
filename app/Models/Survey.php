<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory, HasSlug;

    const TEXT_TYPE = 'text';
    const TEXTAREA_TYPE = 'textarea';
    const SELECT_TYPE = 'select';
    const RADIO_TYPE = 'radio';
    const CHECKBOX_TYPE = 'checkbox';

    protected $fillable = ['user_id', 'title', 'image', 'slug', 'status', 'description', 'expire_date'];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function questions() {
        return $this->hasMany(SurveyQuestion::class);
    }
    public function answers() {
        return $this->hasMany(SurveyAnswer::class);
    }
}
