import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/CosmeticsFormModal.css';
import Swal from "sweetalert2";

const ProcurementsFormModal = ({ closeModal, auth, rowData, cosmetics, date }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const method = rowData ? 'PUT' : 'POST'; 

    // Set initial form values based on rowData
    useEffect(() => {
        if (rowData) {
            setValue('cosmetics_id', rowData.cosmetics_id);
            setValue('quantity', rowData.quantity);
            setValue('purchase_price', rowData.purchase_price);
            setValue('date', rowData.date);
        }
    }, [rowData, setValue]);

    const onSubmit = async(data) => {
        if (!(auth.user && auth.user.is_admin)) {
            console.error('Neautorizovan pristup');
            return;
        }
        data.date = date;
        try {
            let url = '/cosmetics_procurements';
            if (method === 'PUT') {
                url += `/${rowData.id}`;
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Greška: ${result.message}`,
                });
            } else {
                Swal.fire({
                    title: "Uspješno!",
                    text: result.message,
                    icon: "success"
                });
                closeModal();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Greška: ${error}`,
            });
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Atikal
                        </label>
                        <select {...register('cosmetics_id', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {cosmetics.map(cosmetic => (
                                <option key={cosmetic.id} value={cosmetic.id}>{cosmetic.name}</option>
                            ))}
                        </select>
                        {errors.cosmetics_id && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nabavna cijena
                        </label>
                        <input {...register('purchase_price', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.purchase_price && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Količina
                        </label>
                        <input {...register('quantity', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.quantity && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
                    </div>

                    
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {method === 'PUT' ? 'Ažuriraj' : 'Sačuvaj'}
                        </button>
                        <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Poništi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProcurementsFormModal;
