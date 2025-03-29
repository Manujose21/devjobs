import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function Notification({notifications}) {
    console.log(notifications);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Notificaciones
                </h2>
            }
        >
            <Head title="Notificaciones" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <p>Notificaciones</p>
                        { notifications.length > 0 ? 
                            <>
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="mb-4 p-2 border-b-[1px] border-gray-300">
                                        <p><span className="font-bold">Tienes un postulante para la vacante: </span>{notification.data.vacant_name}</p>
                                    </div>
                                ))}
                            </> : <p>No hay notificaciones</p>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}