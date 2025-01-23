import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import '../../css/Cosmetics.css';
import { format } from 'date-fns';

const CosmeticsPage = ({ auth }) => {

    const [finances, setFinances] = useState([]);
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({ amount: '' });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData(date, currentPage);
    }, [currentPage]);

    const handleChangeDate = (selectedDate) => {
        setDate(selectedDate);
        setCurrentPage(1); // Reset to first page on date change
        fetchData(selectedDate, 1);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchData = async (date, page) => {
        try {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            
            const response = await fetch('/getFinancesReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ date: formattedDate, page, limit: 10 }),
            });

            if (!response.ok) {
                throw new Error('An error occurred. Try again!');
            }

            const data = await response.json();
            setFinances(data.finances);
            setTotalPages(data.totalPages === 0 ? 1 : data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="container">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Finansije</h2>
                </div>
            }
        >
            <Head title="Finansije" />
            <div className="lg:w-1/2 lg:mx-auto m-3">
                <DatePicker selected={date} onChange={handleChangeDate} />
            </div>
            <div className="flex flex-col m-2">
                <div className="overflow-x-auto w-full mx-auto md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
                    <div className="min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th scope="col" className="md:px-6 py-3 text-center text-xs font-bold uppercase border-r">Datum</th>
                                    <th scope="col" className="md:px-6 py-3 text-center text-xs font-bold uppercase border-r">Ukupan iznos pazara sa kozmetikom</th>
                                    <th scope="col" className="md:px-6 py-3 text-center text-xs font-bold uppercase border-r">Kucano</th>
                                    <th scope="col" className="md:px-6 py-3 text-center text-xs font-bold uppercase border-r">Keš</th>
                                    <th scope="col" className="md:px-6 py-3 text-center text-xs font-bold uppercase border-r">Rashodi</th>
                                    <th scope="col" className="md:px-6 py-3 text-center text-xs font-bold uppercase">Koverta</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {finances && finances.length > 0 ? (
                                    finances.map(item => (
                                        <tr key={item.id}>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                                {format(new Date(item.date), 'd.M.yyyy')}
                                            </td>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                                {item.total}
                                            </td>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                                {item.register_amount}
                                            </td>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                                {item.cash_amount}
                                            </td>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                                {item.expense_amount}
                                            </td>
                                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                                {item.envelope}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 ">
                                            Nema podataka za ovaj datum.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 mx-1 border border-gray-300 rounded-md"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                         Prethodna
                    </button>
                    <span className="px-4 py-2 mx-1">{currentPage} / {totalPages}</span>
                    <button
                        className="px-4 py-2 mx-1 border border-gray-300 rounded-md"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Sljedeća
                    </button>
                </div>
            </div>
        </Authenticated>
    );
};

export default CosmeticsPage;
