import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
//import WarehouseFormModal from "./WarehouseFormModal";


const WarehouseComponent = ({auth, cosmetics}) => {
    const [warehouses, setWarehouses] = useState([]);
    const [date, setDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowData, setRowData] = useState(null);

    useEffect(() => {
        fetchData(date);
    }, []);

    const handleChangeDate = (selectedDate) => {
        setDate(selectedDate);
        fetchData(selectedDate);
    };

    const openModal = (data) => {
        setRowData(data);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const fetchData = async (date) => {
        try {
            const formattedDate = date.toISOString().slice(0, 10);
            const response = await fetch('/getWarehouses', {
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
            setWarehouses(data.warehosues);

        } catch (error) {
            throw new Error('Došlo je do greške, pokušajte ponovo!' + error)
        }
    };


    return (
        <>
            <button onClick={()=>openModal(null)} className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 mb-3 rounded-10">Dodaj</button>
            {isModalOpen && 
                // <WarehouseFormModal
                //     auth={auth}
                //     closeModal={closeModal}
                //     rowData={rowData}
                //     cosmetics={cosmetics}
                //     date={date}
                // />
            }
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
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Ukupno
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
                                        {warehouse.total}
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