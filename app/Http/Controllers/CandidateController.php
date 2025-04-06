<?php

namespace App\Http\Controllers;

use App\Models\UserVacant;
use App\Models\Vacant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    //

    public function index(Vacant $vacant)
    {

        $candidates = UserVacant::where("vacant_id", $vacant->id)
            ->join('users', 'user_vacants.user_id', '=', 'users.id')     
            ->get();

        return Inertia::render("Recrutier/Candidates", [
            "candidates" => $candidates,
            "vacant" => $vacant
        ]);
    }

}
