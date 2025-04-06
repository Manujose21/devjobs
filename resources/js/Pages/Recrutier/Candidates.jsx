
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function Candidates({ candidates, vacant }) {
    console.log(candidates);
    return (
        <AuthenticatedLayout 
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Candidates
                </h2>
            }
        >
            <Head title="Candidates"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    {
                        candidates.length == 0 ?
                        (

                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                <p className="text-center">No hay postulantes</p>
                            </div>
                        )
                        : <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <p>Estos son los candidatos para la vacante: <span className="font-bold">{vacant.title}</span></p>
                            {
                                candidates.map(candidate => (
                                    <div 
                                        className='flex flex-col gap-2 sm:flex-row rounded-md justify-between p-6 bg-white border-b border-gray-200' 
                                        key={candidate.id}
                                    >
                                        <div>
                                            <h2 className='font-bold'>Nombre: {candidate.name}</h2>
                                            <p className='text-gray-700 '>Correo: { candidate.email }</p>
                                        </div>
                                        <div>
                                            <a href={'storage/Cvs/'+candidate.cv}>ver cv</a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}