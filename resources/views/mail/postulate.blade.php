<x-mail::message>
# Un nuevo postulante para {{ $vacantName }}
Tienes un nuevo postulante para la vacante {{ $vacantName }}
<x-mail::button :url="url('notifications')">
Ir a ver las notificaciones
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
