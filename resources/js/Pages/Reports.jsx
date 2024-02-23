import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import '../../css/Cosmetics.css';
import CosmeticsFormModal from "@/Components/CosmeticsFormModal.jsx";
import {data} from "autoprefixer";

const ReportsPage = ({ users, auth }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reports, setReports] = useState([]);
    const [cosmetics, setCosmetics] = useState(0);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        fetchData(startDate, endDate);
        setShowTable(true);
    }, []);

    const fetchData = async (startDate, endDate) => {
        try {
            const formattedStartDate = startDate.toISOString().slice(0, 10);
            const formattedEndDate = endDate.toISOString().slice(0, 10);

            const response = await fetch('/getReportsDataForRangeOfDates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                }),
            });

            if (!response.ok) {
                throw new Error('An error occurred. Try again!');
            }

            const data = await response.json();
            setReports(data.appointments);
            setCosmetics(data.cosmetics_price);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = () => {
        fetchData(startDate, endDate);
        setShowTable(true);
    };

    return (
        <Authenticated
            user={auth.user}
            header={
            <div className="container">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Izvještaji</h2>
            </div>
        }
        >
            <Head title="Izvještaji" />
            <div className="container">
                <div className="flex space-x-4 m-3">
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Filtriraj
                    </button>
                </div>
            </div>
                <div className="flex flex-col m-2">
                    <div className="-m-1.5 overflow-x-auto w-full md:-1/2">
                        <div className="p-1.5 w-1/2 mx-auto  align-middle">
                            {showTable && (
                            <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-bold uppercase">Barberi
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-start text-xs font-bold uppercase">Ukupno
                                        </th>
                                        <th scope='col'
                                            className="px-6 py-3 text-start text-xs font-bold uppercase">Obračun zarada
                                        </th>
                                    </tr>
                                    </thead>
                                    
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {reports && reports.length > 0 || cosmetics ? (
                                        <>
                                            {reports.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                        {item.user.first_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                        {item.price}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                        {item.barber_total}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="bg-gray-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-800">
                                                    Kozmetika
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-800" colSpan={2}>
                                                    {cosmetics}
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-300">
                                                <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-red-700">
                                                    Ukupno
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-red-700">
                                                    {reports.reduce((total, item) => total + Number(item.price), 0) + Number(cosmetics)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-red-700">
                                                {reports.reduce((total, item) => total + Number(item.barber_total), 0)}
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                Nema podataka za ovaj datum.
                                            </td>
                                        </tr>
                                    )}


                                    </tbody>

                                </table>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
        </Authenticated>
    );
};

export default ReportsPage;
