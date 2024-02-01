import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import '../../css/Cosmetics.css';
import CosmeticsFormModal from "@/Components/CosmeticsFormModal.jsx";
const CosmeticsPage = ({users, auth}) => {
    const isAdmin = auth.user.is_admin;
    const [cosmetics, setCosmetics] = useState([]); // For storing cosmetics data
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState(new Date()); // For storing the selected date
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPrice('');
        setName('');
        setQuantity('');
    };
    const handleChangeDate = (selectedDate) => {
        setDate(selectedDate);
        fetchData(selectedDate);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const fetchData = async (date) => {
        try {
            const formattedDate = date.toISOString().slice(0,10);
            const response = await fetch('/getCosmetics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({date: formattedDate}),
            });
            if (!response.ok) {
                throw new Error('An error occured. Try again!')
            }

            const data = await response.json();
            setCosmetics(data.cosmetics);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Authenticated
            user={auth.user}

            header={
                <div className="container">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Kozmetika</h2>
                    {isAdmin && (
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Prodaja
                    </button>
                    )}
                    {isModalOpen &&
                        <CosmeticsFormModal
                        auth={auth}
                        closeModal={closeModal}
                        />}
                </div>
            }

        >
            <Head title="Kozmetika"/>
            <div className="flex space-x-4 m-3">
                <DatePicker selected={date} onChange={handleChangeDate}/>
            </div>
            <div className="flex flex-col m-2">
                <div className="-m-1.5 overflow-x-auto w-full md:-1/2">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold uppercase">Naziv Artikla
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold uppercase">Cijena
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold uppercase">Količina
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-bold uppercase">Ukupno
                                    </th>

                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {cosmetics && cosmetics.length > 0 ? (
                                    cosmetics.map(item => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                {item.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                {item.quantity * item.price}
                                            </td>


                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                            Nema podataka za ovaj datum.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan="2"></td>
                                    {/* Empty tds for the previous columns */}
                                    <td className="px-6 py-4  text-right font-bold text-gray-800 ">
                                        Ukupno: {
                                        cosmetics
                                            .map(item => item.quantity * item.price)
                                            .reduce((prev, curr) => prev + curr, 0)
                                    }
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>

    );
};

export default CosmeticsPage;
