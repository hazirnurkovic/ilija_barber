import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
//import WarehouseFormModal from "./WarehouseFormModal";


const WarehouseComponent = () => {
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (date) => {
        try {
            const response = await fetch('/warehouse', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Došlo je do greške, pokušajte ponovo!')
            }

            const data = await response.json();
            setWarehouses(data.warehouses);

        } catch (error) {
            throw new Error('Došlo je do greške, pokušajte ponovo!' + error)
        }
    };


    return (
        <>
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
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Datum
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {warehouses && warehouses.length > 0 ? (
                        warehouses.map(warehouse => {
                            return (
                                <tr key={warehouse.id}>
                                    <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                        {warehouse.cosmetics.name}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {warehouse.quantity}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {warehouse.purchase_price}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {warehouse.date}
                                    </td>
                                </tr>
                            );
                        })
                    ) : 
                    (
                        <tr>
                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                Nema artikala u magazinu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default WarehouseComponent;