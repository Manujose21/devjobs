import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
export default function Dashboard({ vacants }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        {
                            vacants.map(vacant => (
                                <div className='flex flex-col gap-2 sm:flex-row justify-between p-6 bg-white border-b border-gray-200' key={vacant.id}>
                                    
                                    <div>
                                        <h2 className='font-bold'>{vacant.title}</h2>
                                        <p className='text-gray-700 '>{ vacant.category } - {vacant.salary}</p>
                                        <p className='text-gray-600 text-sm'>{vacant.company}</p>
                                        <p>{}</p>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <PrimaryButton className='mr-2 bg'>Editar</PrimaryButton>
                                        <button className='text-red-600 px-4 py-2 rounded'>Eliminar</button>
                                        <a href="" className='text-blue-600 px-4 py-2  rounded'>Ver</a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
