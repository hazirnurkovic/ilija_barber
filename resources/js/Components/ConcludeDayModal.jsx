import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/CosmeticsFormModal.css';
import Swal from "sweetalert2";
import { PacmanLoader } from 'react-spinners';

const ConcludeDayModal = ({ closeModal, auth, date }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async(data) => {
        data.amount = Number(data.amount);
        setLoading(true);
        try {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const dataToSubmit = {
                ...data,
                date:formattedDate
            }

            const response = await fetch('/finances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
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


        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error: ${error}`,
            });
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                {loading && (
                    <div className="spinner-overlay">
                        <PacmanLoader size={70} color="#2be625"/>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Kucano:
                        </label>
                        <input {
                            ...register('amount', { required: "Ovo polje je obavezno",
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Molimo unesite numeričku vrijednost"
                                }
                            })
                        }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                         />
                        {errors.amount && (<p className="text-red-500 text-xs italic">{errors.amount.message}</p>)}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Obračunaj
                        </button>
                        <button onClick={closeModal} className="inline-block cancel_button align-baseline font-bold text-sm text-white bg-red-500 hover:red-blue-700 ml-2">
                            Poništi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ConcludeDayModal;
