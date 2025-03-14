<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //
    protected $fillable = [
        "bio",
        "image",
        "phone",
        "country",
        "user_id"
    ];
}
