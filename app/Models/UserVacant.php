<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVacant extends Model
{
    //

    protected $fillable = [
        'user_id',
        'vacant_id',
        'cv',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function vacant(){
        return $this->belongsTo(Vacant::class);
    }


}
