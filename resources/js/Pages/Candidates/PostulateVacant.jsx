import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
export default function PostulateVacant({vacant}) {

    const { data, setData, post } = useForm({
        "cv": null,
    });

    console.log(vacant);
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("vacants.apply", vacant.id));
    }

    return (
        <AuthenticatedLayout 
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Postulates
                </h2>
            }
        >
            <Head title="Postulates"/>
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Titulo</p>
                            <h1>{vacant.title}</h1>
                            <p className="font-bold">Descripcion</p>
                            <p>{vacant.description}</p>
                            <p className="font-bold">Salario</p>
                            <p>{vacant.salary_pay}</p>
                            <p>{vacant.category_name}</p>
                            <p className="font-bold">Empresa</p>
                            <p>{vacant.company}</p>
                            <p>{vacant.last_day}</p>
                            {
                                vacant.image &&
                                <img src={vacant.image} alt={`imagen de la vacante ${vacant.title}`} />
                            }
                            <form onSubmit={submit}>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="cv" className="font-bold text-lg"> Adjuntar CV</label>
                                    <input 
                                        required 
                                        type="file" 
                                        accept="application/pdf" 
                                        name="cv" 
                                        id="cv" 
                                        onChange={(e) => setData("cv", e.target.files[0])} 
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <PrimaryButton type="submit">
                                        Enviar postulacion
                                    </PrimaryButton> 
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}