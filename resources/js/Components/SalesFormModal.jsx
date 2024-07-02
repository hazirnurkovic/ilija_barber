import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/CosmeticsFormModal.css';
import Swal from "sweetalert2";

const SalesFormModal = ({ closeModal, auth, rowData, date, updateSales}) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [warehouses, setWarehouses] = useState([]);
    const method = rowData ? 'PUT' : 'POST';

    useEffect(() => {
        fetchData();
    },[])
    
    useEffect(() => {
        if (rowData) {
            setValue('cosmetics_warehouse_id', rowData.cosmetics_warehouse_id);
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
            setWarehouses(data.warehouses);
        } catch (error) {
            throw new Error('Došlo je do greške, pokušajte ponovo!' + error)
        }
    };

    const onSubmit = async(data) => {
        if (!(auth.user && auth.user.is_admin)) {
            console.error('Neautorizovan pristup');
            return;
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        data.date = formattedDate;
        data.sell_price = Number(data.sell_price);
        data.quantity = Number(data.quantity);
        data.cosmetics_warehouse_id = Number(data.cosmetics_warehouse_id);
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
                    updateSales(prevSales => [...prevSales, result.sale]);
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
                        <select 
                            {...register('cosmetics_warehouse_id', { required: true })} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Odaberi...</option>
                            {warehouses?.map(warehouse => (
                                <option 
                                    key={warehouse.id} 
                                    value={warehouse.id}
                                    selected={warehouse.id === rowData?.cosmetics_warehouse_id ? true : false}
                                >
                                    {warehouse.cosmetics.name + " - " + warehouse.date + ' - ' + warehouse.quantity}
                                </option>
                            ))}
                        </select>
                        {errors.cosmetics_warehouse_id && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Prodajna cijena
                        </label>
                        <input {
                            ...register('sell_price', { required: "Ovo polje je obavezno",
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Molimo unesite numeričku vrijednost"
                                }
                            })
                        } 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                        {errors.sell_price && (<p className="text-red-500 text-xs italic">{errors.sell_price.message}</p>)}
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

export default SalesFormModal;
