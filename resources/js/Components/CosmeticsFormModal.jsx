import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import '../../css/CosmeticsFormModal.css';
import Swal from "sweetalert2";

const CosmeticsFormModal = ({ closeModal, auth }) => {
    console.log(auth.user)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onSubmit = async(data) => {
        if (!(auth.user && auth.user.is_admin)) {
            console.error('Unauthorized access');
            return;
        }
        data.price = Number(data.price);
        data.quantity = Number(data.quantity);
        data.sell_date = selectedDate;
        console.log(data)
        try {
            const response = await fetch('/cosmetics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result)
            if (!response.ok) {
                {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Greška: ${result.message}`,
                    });
                }
            } else
            {
                Swal.fire({
                    title: "Uspješno!",
                    text: result.message,
                    icon: "success"
                });
                closeModal();
            }


        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error: ${error}`,
            });
        }

    };

    return (
        <div className="modal-container">
            <div className="modal-content">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Naziv Artikla
                </label>
                <input {...register('name', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                {errors.name && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Cijena
                </label>
                <input {...register('price', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                {errors.price && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Količina
                </label>
                <input {...register('quantity', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                {errors.quantity && <p className="text-red-500 text-xs italic">Ovo polje je obavezno</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Datum prodaje
                </label>
                <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sačuvaj
                </button>
                <button onClick={closeModal} className="inline-block align-baseline font-bold text-sm text-white hover:bg-blue-700">
                    Poništi
                </button>
            </div>
        </form>
            </div>
        </div>
    );
}

export default CosmeticsFormModal;