import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import '../../css/Cosmetics.css';
import ExpensesFormModal from "@/Components/ExpensesFormModal.jsx";
import Swal from 'sweetalert2';
const Expenses = ({initialExpenses, auth}) => {
    const isAdmin = auth.user.is_admin;
    const [expenses, setExpenses] = useState([initialExpenses]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({ name: '', price: '' });

    const { success, error } = usePage().props;

    useEffect(() => {
        // Display success message if it exists
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Uspješno!',
                text: success,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        // Display error message if it exists
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text: error,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }, [success, error]);


    useEffect(() => {
        fetchData(date);
    }, [date]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPrice('');
        setName('');
    };
    const handleChangeDate = (selectedDate) => {
        setDate(selectedDate);
        fetchData(selectedDate);
    };

    const fetchData = async (date) => {
        try {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const response = await fetch('/getExpenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({date: formattedDate}),
            });
            if (!response.ok) {
                throw new Error('Greška! Pokušajte ponovo!')
            }

            const data = await response.json();
            setExpenses(data.expenses);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Authenticated
            user={auth.user}

            header={
                <div className="container">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Troškovi</h2>
                    {isAdmin && (
                    <button onClick={openModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                        Unesi trošak
                    </button>
                    )}
                    {isModalOpen &&
                        <ExpensesFormModal
                            auth={auth}
                            closeModal={closeModal}
                        />
                    }
                </div>
            }

        >
            <Head title="Troškovi"/>
            <div className="lg:w-1/2 lg:mx-auto m-3">
                <DatePicker selected={date} onChange={handleChangeDate}/>
            </div>
            <div className="flex flex-col m-2">
                <div className="overflow-x-auto w-full  mx-auto md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
                    <div className="min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Naziv Troška
                                        </th>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Cijena Troška
                                        </th>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Ažuriraj / Obriši podatke
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {expenses && expenses.length > 0 ? (
                                    expenses.map(item => (
                                        <tr key={item.id}>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                                {item.name}
                                            </td>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                                {item.price}
                                            </td>
                                            <td className="lg:px-6 py-3 whitespace-nowrap text-center text-sm font-medium  flex flex-col items-center">
                                                <Link
                                                    className="bg-blue-500 mb-2 w-24 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded"
                                                    as='button'
                                                    href=''
                                                >
                                                    Ažuriraj
                                                </Link>

                                                <Link className="bg-red-500 mb-2 w-24 hover:bg-red-300 text-white font-bold py-1 px-2 rounded"
                                                    as='button'
                                                    method='delete'
                                                    href={route('expenses.destroy', {expense: item})}
                                                    onClick={(e) => {
                                                        if (!window.confirm("Da li ste sigurni da želite da obrišete barbera?")) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Obriši
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                            Nema podataka za ovaj datum.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className='md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 text-center  font-bold text-gray-800 border-r'>
                                            Ukupno:
                                        </td>
                                        <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 text-center  font-bold text-gray-800 border-r">
                                            {
                                                expenses.length > 0 ? (expenses.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2) ) : ('0.00')
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

export default Expenses;
