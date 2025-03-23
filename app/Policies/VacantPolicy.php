<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\UserRole;

class VacantPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {}

    public function viewAny(User $user) {
        return $user->rol === UserRole::RECRUTIER;
    }

    public function viewCandidates(User $user) {
        return $user->rol === UserRole::CANDIDATE;
    }
    // public function destroy(User $user, Vacant $vacant) {
    //     dd($user, $vacant);
    //     return $user->id === $vacant->user_id;
    // }

}
