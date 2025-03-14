<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacant extends Model
{
    //

    protected $fillable = [
        "title",
        "company",
        "last_day",
        "description",
        "image",
        "category_id",
        "salary_id",
        "user_id"
    ];


    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function salary(){
        return $this->belongsTo(Salary::class);
    }
}
