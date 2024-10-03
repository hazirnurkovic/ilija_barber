import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/CosmeticsFormModal.css';
import Swal from "sweetalert2";

const ProcurementsFormModal = ({ closeModal, auth, rowData, cosmetics, date, updateProcurements}) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const method = rowData ? 'PUT' : 'POST'; 

    
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nemate pravo pristupa!',
            });
            return;
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        data.date = formattedDate;
        data.purchase_price = Number(data.purchase_price);
        data.quantity = Number(data.quantity);
        data.cosmetics_id = Number(data.cosmetics_id);
        const selectedCosmetic = cosmetics.find(cosmetic => cosmetic.id === data.cosmetics_id);
        if (!selectedCosmetic) {
            console.error('Greška: Artikal nije pronađen');
            return;
        }
        data.name = selectedCosmetic.name;
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
                if (method === 'PUT') {
                    updateProcurements(prevProcurements =>
                        prevProcurements.map(procurement =>
                            procurement.id === result.procurement.id ? result.procurement : procurement
                        )
                    );
                } else {
                    updateProcurements(prevProcurements => [...prevProcurements, result.procurement]);
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
                                <option key="" value="">Odaberi artikal</option>
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
                        <input {
                            ...register('purchase_price', { required: "Ovo polje je obavezno",
                                pattern: {
                                    value: /^[0-9]+([.,][0-9]+)?$/,
                                    message: "Molimo unesite numeričku vrijednost"
                                }
                            })
                        } 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                        {errors.purchase_price && (<p className="text-red-500 text-xs italic">{errors.purchase_price.message}</p>)}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Količina
                        </label>
                        <input {
                            ...register('quantity', { required: "Ovo polje je obavezno",
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Molimo unesite numeričku vrijednost"
                                }
                            })
                        } 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                        {errors.quantity && (<p className="text-red-500 text-xs italic">{errors.quantity.message}</p>)}
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
