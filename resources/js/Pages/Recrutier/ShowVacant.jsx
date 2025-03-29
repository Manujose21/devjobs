
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from  "@/Components/InputLabel";
import TextInput from  "@/Components/TextInput";
import { useForm, usePage, Head } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect } from "react";
import Swal from "sweetalert2";
export default function ShowVacant({ vacant, categories, salaries }) {

    const { data, setData, put } = useForm({
        title: vacant.title,
        description: vacant.description,
        salary: vacant.salary_id,
        category: vacant.category_id,
        company: vacant.company,
        last_day: vacant.last_day,
        visible: vacant.visible
    });

    const { flash } = usePage().props;
    

    useEffect(() => {
        if(flash.success){
            Swal.fire({
                icon: 'success',
                title: 'Actualizado correctamente',
                text: flash.success,
                timer: 2500,
            })
        }
    }, [flash]);
    

    const submit = (e) => {
        e.preventDefault();
       
        put(route('vacants.update', vacant));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Show Vacant - {vacant.title}
                </h2>
            }
        >
            <Head title="Show Vacant" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg bg-white p-6">
                        <form onSubmit={e => submit(e)} className="mx-auto max-w-xl">
                            
                            <div className="mb-6">
                                <InputLabel
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Title
                                </InputLabel>
                                <TextInput
                                    className="w-full "
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                ></TextInput>
                            </div>

                            <div className="mb-6">
                                <InputLabel
                                    htmlFor="company"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Empresa
                                </InputLabel>
                                <TextInput
                                    className="w-full "
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                ></TextInput>
                            </div>  
                            
                            <div className="mb-6">
                                <InputLabel
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Category
                                </InputLabel>
                                <select 
                                    onChange={e => setData('category', e.target.value)}
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm font-medium text-gray-700' 
                                    name="category" 
                                    id="category"
                                    value={data.category}
                                >
                                    {
                                        categories.map(({ id , category}) => (
                                            <option key={id} value={id}>{category}</option>
                                        ))
                                    }
                                </select>
                            </div>  
                            
                            <div className="mb-6">
                                <InputLabel htmlFor="last-day" value="Ultimo dia para postularse"/>
                                <TextInput id="last-day" type="date" onChange={ e => setData("last_day", e.target.value) } className="mt-1 block w-full" value={data.last_day} />
                            </div>  
                            
                            <div className="mb-6">
                               <InputLabel htmlFor="salary" value="Salario"/>
                                <select 
                                    id="salary" 
                                    type="text" 
                                    onChange={e => setData('salary', e.target.value)} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm font-medium text-gray-700"
                                    value={data.salary}
                                >
                                    {
                                        salaries.map(salary => (
                                            <option key={salary.id} value={salary.id}>{salary.salary}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-6">
                                <InputLabel htmlFor="desc" value="Descripcion de la vacante"/>
                                <textarea 
                                    onChange={e => setData('description', e.target.value)} 
                                    className='h-60 mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm font-medium text-gray-700 ' 
                                    name="description" 
                                    id="desc"
                                    value={data.description}
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <div>
                                    {
                                        vacant.image &&
                                        <>
                                            <InputLabel value="Imagen"/>
                                            <img src={vacant.image} className='mt-2 max-w-72 rounded-md shadow-md' alt='imagen seleccionada' />
                                        </>
                                    }
                                </div>

                            </div>

                            <div className="mb-6">
                                <div>
                                    <label htmlFor={vacant.id} className="flex items-center cursor-pointer relative mb-4">
                                        <input
                                            type="checkbox" 
                                            id={vacant.id} 
                                            className="sr-only" 
                                            onChange={(e) => setData('visible', e.target.checked)}
                                            checked={data.visible}
                                        />
                                        <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                                        <span className="ml-3 text-gray-900 text-sm font-medium">{data.visible ? 'Desactivar' : 'Activar'} vacante</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <PrimaryButton type="submit"  className='mr-2 bg'>
                                   Editar vacante
                                </PrimaryButton>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}