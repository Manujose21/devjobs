import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
export default function SearchedVacants({vacants}) {
    // console.log("vacants" , vacants);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Searched Vacants
                </h2>
            }
        >
            <Head
                title="Searched Vacants"
            />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg ">
                        <p className="py-6 border-b text-gray-600 ">
                            Vacantes Abiertas {vacants.length}
                        </p>
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
                                    </div>
                                    <div className='flex flex-col gap-4 items-center'>
                                        <div className="flex gap-3">
                                            <PrimaryButton className='mr-2 bg'>
                                                <Link href={route('vacants.postulate', vacant)}  className='p-2  rounded'>Postularme</Link>
                                            </PrimaryButton>
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