<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Postulate extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(int $vacantId, string $vacantName, int $userId)
    {
        //
        $this->vacantId = $vacantId;
        $this->vacantName = $vacantName;
        $this->userId = $userId;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)->markdown('mail.postulate', [
            'vacantName' => $this->vacantName
        ]);
    }


    public function toDatabase(object $notifiable): array
    {
        return [
            "vacant_id" => $this->vacantId,
            "vacant_name" => $this->vacantName,
            "user_id" => $this->userId
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
