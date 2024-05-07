import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/CosmeticsFormModal.css';
import Swal from "sweetalert2";

const SalesFormModal = ({ closeModal, auth, rowData, cosmetics, date, updateSales}) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const method = rowData ? 'PUT' : 'POST'; 

    useEffect(() => {
        fetchData();
    })
    
    useEffect(() => {
        if (rowData) {
            setValue('cosmetics_id', rowData.cosmetics_id);
            setValue('quantity', rowData.quantity);
            setValue('sell_price', rowData.sell_price);
            setValue('date', rowData.date);
        }
    }, [rowData, setValue]);

    const fetchData = async () => {
        try {
            const response = await fetch('/getWarehouseDataForSales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Došlo je do greške, pokušajte ponovo!')
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            throw new Error('Došlo je do greške, pokušajte ponovo!' + error)
        }
    };

    const onSubmit = async(data) => {
        if (!(auth.user && auth.user.is_admin)) {
            console.error('Neautorizovan pristup');
            return;
        }
        data.date = date;
        data.sell_price = Number(data.sell_price);
        data.quantity = Number(data.quantity);
        data.cosmetics_id = Number(data.cosmetics_id);
        try {
            let url = '/cosmetics_sales';
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
                if (method === 'PUT') {
                    updateSales(prevSales =>
                        prevSales.map(sale =>
                            sale.id === result.sale.id ? result.sale : sale
                        )
                    );
                } else {
                    updateSales(prevSales => [...prevSales, result.sales]);
                }
                closeModal();
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
                            Prodajna cijena
                        </label>
                        <input {...register('sell_price', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {errors.sell_price && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
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

export default SalesFormModal;
