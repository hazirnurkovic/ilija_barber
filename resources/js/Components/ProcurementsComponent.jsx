import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';


const ProcurementsComponent = ({auth}) => {
    const [procurements, setProcurements] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchData(date);
    }, []);

    const handleChangeDate = (selectedDate) => {
        setDate(selectedDate);
        fetchData(selectedDate);
    };

    const fetchData = async (date) => {
        try {
            const formattedDate = date.toISOString().slice(0, 10);
            const response = await fetch('/getProcurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: formattedDate }),
            });
            if (!response.ok) {
                throw new Error('Došlo je do greške, pokušajte ponovo!')
            }

            const data = await response.json();
            setProcurements(data.procurements);

        } catch (error) {
            throw new Error('Došlo je do greške, pokušajte ponovo!' + error)
        }
    };


    return (
        <>
            <div className="lg:w-1/2 mb-2">
                <DatePicker selected={date} onChange={handleChangeDate} />
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Artikal
                        </th>
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Količina
                        </th>
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Nabavna cijena
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {procurements && procurements.length > 0 ? (
                        procurements.map(procurement => {
                            return (
                                <tr key={procurement.id}>
                                    <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                        {procurement.name}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {procurement.quantity}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {procurement.purchase_price}
                                    </td>
                                </tr>
                            );
                        })
                    ) : 
                    (
                        <tr>
                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                Nema unijetih nabavki
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default ProcurementsComponent;