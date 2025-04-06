import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, Head } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import Swal from 'sweetalert2';
export default function Dashboard({ vacants }) {

    const showModalDelete = (id) => {
        Swal.fire({
            title: 'Estas seguro de eliminar?',
            text: "No podras revertir esta accion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);
                router.delete(`/vacants/${id}`);}
        })
    }

    console.log(vacants);

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
                                <div 
                                    className='flex flex-col gap-2 sm:flex-row justify-between p-6 bg-white border-b border-gray-200' 
                                    key={vacant.id}
                                >
                                    
                                    <div>
                                        <h2 className='font-bold'>{vacant.title}</h2>
                                        <p className='text-gray-700 '>{ vacant.category_name } - {vacant.salary_pay}</p>
                                        <p className='text-gray-600 text-sm'>{vacant.company}</p>
                                        <p className='text-gray-600 text-sm'>Esta visible: {vacant.visible ? "Si" : "No"}</p>
                                    </div>
                                    <div className='flex flex-col gap-4 items-center'>
                                        <div className="flex flex-col sm:flex-row  gap-3 w-full ">
                                            <Link className='w-full' href={route('candidates', vacant)}>
                                                <button className='w-full inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out'>
                                                    Candidatos
                                                </button>
                                            </Link>

                                            <Link href={route('vacants.show', vacant)} className='w-full rounded'>
                                                <PrimaryButton className='sm:mr-2 w-full'>
                                                    Editar
                                                </PrimaryButton>
                                            </Link>
                                            
                                            <button onClick={() => showModalDelete(vacant.id)} className='text-red-600 px-4 py-2 rounded'>Eliminar</button>
                                            
                                            
                                        </div>
                                        
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
