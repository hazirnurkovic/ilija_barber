import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import '../../css/CosmeticsFormModal.css';
import Swal from "sweetalert2";

const ExpensesFormModal = ({ closeModal, auth }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onSubmit = async(data) => {
        if (!(auth.user && auth.user.is_admin)) {
            return;
        }
        data.price = Number(data.price);
        data.date = selectedDate;
        
        try {
            const response = await fetch('/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
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
            setTimeout(() => {
                window.location.reload();
            }, 2000);

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
                    Naziv
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
                    Datum
                </label>
                <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sačuvaj
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

export default ExpensesFormModal;
