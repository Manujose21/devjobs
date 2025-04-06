import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
export default function Welcome({categories, salaries, vacants }) {

    const { data, setData, errors, post} = useForm({
        term: '',
        category: '',
        salary: ''
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('filter'), {
            data: {
                term: data.term,
                category: data.category,
                salary: data.salary
            }
        });
    }

    return (
        <>
            <AuthenticatedLayout>
                <Head title='Bienvenido' />
                <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
                    <div className=" max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                        <div className="relative">
                            <h2 className="text-center text-4xl leading-8 font-extrabold tracking-tight text-indigo-600 sm:text-6xl">Encuentra un trabajo en Tech de forma remota</h2>
                            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">Encuentra el trabajo de tus sueños en una empresa internacional; tenemos vacantes para front end developer, backend, devops, mobile y mucho más!</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 py-10 px-10">
                    <h2 className="text-2xl md:text-4xl text-gray-600 text-center font-extrabold my-5">Buscar y Filtrar Vacantes</h2>

                    <div className="max-w-7xl mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="md:grid md:grid-cols-3 gap-5">
                                <div className="mb-5">
                                    <label 
                                        className="block mb-1 text-sm text-gray-700 uppercase font-bold "
                                        htmlFor="termino">Término de Búsqueda
                                    </label>
                                    <input 
                                        id="termino"
                                        type="text"
                                        name="term"
                                        onChange={handleChange}
                                        value={data.term}
                                        placeholder="Buscar por Término: ej. Laravel"
                                        className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block mb-1 text-sm text-gray-700 uppercase font-bold">Categoría</label>
                                    <select className="border-gray-300 p-2 w-full" name="category" onChange={handleChange} value={data.category}>
                                        <option value="">--Seleccione--</option>
                                        {
                                            categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label className="block mb-1 text-sm text-gray-700 uppercase font-bold">Salario Mensual</label>
                                    <select  name="salary" onChange={handleChange} value={data.salary} className="border-gray-300 p-2 w-full">
                                        <option value="">-- Seleccione --</option>
                                        {
                                            salaries.map((salary) => (
                                                <option key={salary.id} value={salary.id}>{salary.salary}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <input 
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white text-sm font-bold px-10 py-2 rounded cursor-pointer uppercase w-full md:w-auto"
                                    value="Buscar"
                                />
                            </div>
                        </form>
                    </div>
                    <div className='mt-10'>
                        {
                            vacants.data.length > 0 ? (
                                vacants.data.map((vacant) => (
                                    <div 
                                        className='flex flex-col items-center rounded-md gap-2 sm:flex-row justify-between p-6 bg-white border-b border-gray-200' 
                                        key={vacant.id}
                                    >
                                        
                                        <div>
                                            <h3 className='text-2xl font-bold text-gray-800'>{vacant.title}</h3>
                                            <p className='text-gray-600'>{vacant.company}</p>
                                            <p className='text-gray-600'>{vacant.category.category}</p>
                                            <p className='text-gray-600'>{vacant.salary.salary}</p>
                                        </div>
                                        <div className='flex flex-col gap-4 items-center'>
                                            <div className="flex flex-col sm:flex-row  gap-3 w-full ">
                                                <Link href={route('vacants.postulate', vacant)}>
                                                    <PrimaryButton>
                                                        Ver vacante
                                                    </PrimaryButton>
                                                </Link>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            ))
                            : (
                                <div className='flex justify-center items-center h-96'>
                                    <p className='text-gray-500 text-lg'>No hay vacantes disponibles</p>
                                </div>
                            )
                        }                
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
