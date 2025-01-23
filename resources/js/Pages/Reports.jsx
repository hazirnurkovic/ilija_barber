import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import '../../css/Cosmetics.css';

const ReportsPage = ({ auth }) => {
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
            const startYear = startDate.getFullYear();
            const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
            const startDay = startDate.getDate().toString().padStart(2, '0');
            const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
            
            const endYear = endDate.getFullYear();
            const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
            const endDay = endDate.getDate().toString().padStart(2, '0');
            const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;

            const response = await fetch('/getReportsDataForRangeOfDates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
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
            setReports(data.earnings.barber_shop_earnings);
            setCosmetics(data.cosmetics);

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
            <div className="w-1/2 mx-auto">
                <div className="flex flex-col m-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    <button
                        onClick={handleSubmit}
                        className="text-white font-bold py-3 px-10 lg:w-52"
                        style={{
                            backgroundColor: '#3498db',
                            borderRadius: '20px',
                            height: "45px"
                        }}
                    >
                        Filtriraj
                    </button>
                </div>
            </div>
                <div className="m-2">
                    <div className="m-1.5 overflow-x-auto w-full">
                        <div className="p-1.5 lg:w-1/2 xl:w-1/2 mx-auto">
                            {showTable && (
                            <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th scope="col"
                                            className="lg:px-6 py-3 text-center text-xs font-bold uppercase">Barberi
                                        </th>
                                        <th scope="col"
                                            className="lg:px-6 py-3 text-center text-xs font-bold uppercase">Ukupno
                                        </th>
                                        <th scope='col'
                                            className="lg:px-6 py-3 text-center text-xs font-bold uppercase">Obračun zarada
                                        </th> <th scope='col'
                                            className="lg:px-6 py-3 text-center text-xs font-bold uppercase">Ukupno nakon zarada
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {reports && reports.length > 0 || cosmetics ? (
                                        <>
                                            {reports.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center">
                                                        {item.user.first_name}
                                                    </td>
                                                    <td className="lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center">
                                                        {item.total}
                                                    </td>
                                                    <td className="lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center">
                                                        {item.barber_total}
                                                    </td>
                                                    <td className="lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center">
                                                        {item.barber_shop_earning}
                                                    </td>
                                                </tr>
                                            ))}
                                            {auth.user?.is_admin ?
                                                (
                                                    <>
                                                        <tr className="bg-gray-200">
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-800 text-center">
                                                                Kozmetika
                                                            </td>
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-800 text-center">
                                                                {cosmetics}
                                                            </td>
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-800 text-center">

                                                            </td>
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-800 text-center">

                                                            </td>
                                                        </tr>

                                                        <tr className="bg-gray-300">
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-xl font-bold text-red-700 text-center">
                                                                Ukupno
                                                            </td>
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-xl font-bold text-red-700 text-center">
                                                                {reports.reduce((total, item) => total + Number(item.total), 0) + Number(cosmetics)}
                                                            </td>
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-xl font-bold text-red-700 text-center">
                                                                {reports.reduce((total, item) => total + Number(item.barber_total), 0)}
                                                            </td>
                                                            <td className="lg:px-6 py-4 whitespace-nowrap text-xl font-bold text-red-700 text-center">
                                                                {reports.reduce((total, item) => total + Number(item.barber_shop_earning), 0) + Number(cosmetics)}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : null
                                            }
                                        </>
                                    ) : (
                                        <tr>
                                            <td className="lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center">
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
