<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    //
    public function vacants(){
        return $this->hasMany(Vacant::class);
    }
}
