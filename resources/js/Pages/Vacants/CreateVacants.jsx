import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
export default function CreateVacants({ salaries, categories }) {

    const { data, setData, post, errors, reset, wasSuccessful} = useForm({
        title: '',
        company: '',
        category: '',
        last_day: '',
        description: '',
        salary: '',
        image: ''
    });

    const [ preview, setPreview ] = useState(null)

    const submit = (e) => {
        e.preventDefault();
        
        post(route('vacants.store'));

        if(wasSuccessful){
            reset();
        }
    }

    const showImageSelected = (e) => {
        setData("image", e.target.files[0] )
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Crear Vacante
                </h2>
            }
        >
            <Head title="Crear Vacante" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                        <form onSubmit={submit} className='max-w-lg mx-auto flex flex-col gap-2'>
                            <h1 className='mb-4 text-2xl'>Informacion de la vacante</h1>
                            <div>
                                <InputLabel 
                                    htmlFor="title" 
                                    value="Titulo de la vacante"
                                />
                                <TextInput 
                                    onChange={e => setData('title', e.target.value)} 
                                    id="title" 
                                    type="text" 
                                    className="mt-1 block w-full"
                                    value={data.title}
                                />
                                <InputError message={errors.title} />
                            </div>
                            <div>
                                <InputLabel htmlFor="company" value="Empresa"/>
                                <TextInput
                                    onChange={e => setData('company', e.target.value)} 
                                    placeholder="Example: Google, Facebook, Netflix, Spotify..." 
                                    id="company" 
                                    type="text" 
                                    className="mt-1 block w-full"
                                    value={data.company}
                                />
                                <InputError message={errors.company} />

                            </div>
                            <div>
                                <InputLabel htmlFor="category" value="Categoria de la vacante"/>
                                <select 
                                    onChange={e => setData('category', e.target.value)}
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm font-medium text-gray-700' 
                                    name="category" 
                                    id="category"
                                    value={data.category}
                                >
                                    <option value="">Selecciona una categoria</option>
                                    {
                                        categories.map(({ id , category}) => (
                                            <option key={id} value={id}>{category}</option>
                                        ))
                                    }
                                </select>
                                <InputError message={errors.category} />
                                
                            </div>
                            <div>
                                <InputLabel htmlFor="last-day" value="Ultimo dia para postularse"/>
                                <TextInput id="last-day" type="date" onChange={ e => setData("last_day", e.target.value) } className="mt-1 block w-full" value={data.last_day} />
                                <InputError message={errors.last_day} />
                            </div>
                            <div>
                                <InputLabel htmlFor="salary" value="Salario"/>
                                <select 
                                    id="salary" 
                                    type="text" 
                                    onChange={e => setData('salary', e.target.value)} 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm font-medium text-gray-700"
                                    value={data.salary}
                                >
                                    <option value="">Selecciona un salario</option>
                                    {
                                        salaries.map(salary => (
                                            <option key={salary.id} value={salary.id}>{salary.salary}</option>
                                        ))
                                    }
                                </select>
                                <InputError message={errors.salary} />
                            </div>
                            <div>
                                <InputLabel htmlFor="desc" value="Descripcion de la vacante"/>
                                <textarea 
                                    onChange={e => setData('description', e.target.value)} 
                                    className='h-60 mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm font-medium text-gray-700 ' 
                                    name="description" 
                                    id="desc"
                                    value={data.description}
                                ></textarea>
                                <InputError message={errors.description} />
                            </div>
                            <div>
                                <InputLabel value="Imagen"/>
                                <input type="file" onChange={ showImageSelected }/>
                                {
                                    preview &&
                                    <img src={preview} className='mt-2 max-w-72 rounded-md shadow-md' alt='imagen seleccionada' />
                                }
                            </div>
                            <div className='flex justify-end'>
                                <PrimaryButton className='mt-4'>Publicar vacante</ PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
