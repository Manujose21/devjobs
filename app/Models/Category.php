<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //

    public function vacants(){
        return $this->hasMany(Vacant::class);
    }
}
