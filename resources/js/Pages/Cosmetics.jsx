import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import '../../css/Cosmetics.css';
import CosmeticsFormModal from "@/Components/CosmeticsFormModal.jsx";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
const CosmeticsPage = ({ users, auth }) => {
    const isAdmin = auth.user.is_admin;
    const [cosmetics, setCosmetics] = useState([]); // For storing cosmetics data
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        fetchData(date);
    }, []);

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


    const fetchData = async (date) => {
        try {
            const formattedDate = date.toISOString().slice(0, 10);
            const response = await fetch('/getCosmetics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: formattedDate }),
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
                    {/* {isAdmin && (
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Prodaja
                    </button>
                    )}
                    {isModalOpen &&
                        <CosmeticsFormModal
                        auth={auth}
                        closeModal={closeModal}
                        />} */}
                    <div className="sm:hidden">
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            Artikli
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Nabavka</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')}>
                                        Magacin
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')}>
                                        Prodaja
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="hidden sm:block">
                        <div>
                            <NavLink>Artikli</NavLink>
                            <NavLink className="ml-5">Nabavka</NavLink>
                            <NavLink className="ml-5">Magacin</NavLink>
                            <NavLink className="ml-5">Prodaja</NavLink>
                        </div>
                    </div>

                </div>
            }

        >
            <Head title="Kozmetika" />
            <div className="lg:w-1/2 lg:mx-auto m-3">
                <DatePicker selected={date} onChange={handleChangeDate} />
            </div>
            <div className="flex flex-col m-2">
                <div className="overflow-x-auto w-full  mx-auto md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
                    <div className="min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden dark:border-gray-700"m >
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Naziv Artikla
                                        </th>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Cijena
                                        </th>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Količina
                                        </th>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Gratis
                                        </th>
                                        <th scope="col"
                                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase">Ukupno
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {cosmetics && cosmetics.length > 0 ? (
                                        cosmetics.map(item => (
                                            <tr key={item.id}>
                                                <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                                    {item.name}
                                                </td>
                                                <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                                    {item.price}
                                                </td>
                                                <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                                    {item.quantity}
                                                </td>
                                                <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                                    {item.gratis ? "Da" : "Ne"}
                                                </td>
                                                <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                                    {item.total}
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
                                        {/* Empty tds for the previous columns */}
                                        <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 text-center  font-bold text-gray-800 border-r">
                                            Ukupno: {
                                                cosmetics
                                                    .map(item => item.total)
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
