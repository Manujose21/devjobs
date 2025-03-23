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
        "user_id",
        "visible"
    ];


    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function salary(){
        return $this->belongsTo(Salary::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function applications(){
        return $this->hasMany(UserVacant::class);
    }
}
