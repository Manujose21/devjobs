<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    //

    public function __invoke() 
    {
        $notifications = auth()->user()->unreadNotifications;
        // clear notifications
        auth()->user()->unreadNotifications->markAsRead();

        return Inertia::render('Notification', [
            "notifications" => $notifications
        ]);

    }

}
