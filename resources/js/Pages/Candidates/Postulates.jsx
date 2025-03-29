import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head } from "@inertiajs/react";
export default function Postulates({ postulates }) {
    return (

        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Postulaciones
                </h2>
            }
        >
            <Head title="Dashboard"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {
                        postulates.map(postulate => (
                            <div 
                                    className='flex flex-col gap-2 sm:flex-row rounded-md justify-between p-6 bg-white border-b border-gray-200' 
                                    key={postulate.id}
                                >
                                    
                                    <div>
                                        <h2 className='font-bold'>{postulate.title}</h2>
                                        <p className='text-gray-700 '>{ postulate.category_name } - {postulate.salary_pay}</p>
                                        <p className='text-gray-600 text-sm'>{postulate.company}</p>
                                    </div>
                                </div>
                        ))
                    }
                </div>
            </div>
        </AuthenticatedLayout>

    );
}