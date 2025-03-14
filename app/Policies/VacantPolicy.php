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

    public function create(User $user) {
        return $user->rol === UserRole::RECRUTIER;
    }

}
