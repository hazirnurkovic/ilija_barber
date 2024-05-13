import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import ProcurementsFormModal from "./ProcurementsFormModal";
import Swal from "sweetalert2";


const ProcurementsComponent = ({auth, cosmetics}) => {
    const [procurements, setProcurements] = useState([]);
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

    const deleteProcurement = async (procurementId) => {
        try {
            const response = await fetch(`/cosmetics_procurements/${procurementId}`, {
                method: 'DELETE',
            });
            const responseData = await response.json(); 

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Greška: ${responseData.message}`,
                });
            } else {
                Swal.fire({
                    title: "Uspješno!",
                    text: responseData.message,
                    icon: "success"
                });

                // Remove the deleted procurement from state
                setProcurements(prevProcurements => prevProcurements.filter(procurement => procurement.id !== procurementId));
            }
        } catch (error) {
            console.error('Greška prilikom brisanja nabavke:', error);
        }
    };


    return (
        <>
            <button onClick={()=>openModal(null)} className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 mb-3 rounded-10">Dodaj</button>
            {isModalOpen && 
                <ProcurementsFormModal
                    auth={auth}
                    closeModal={closeModal}
                    rowData={rowData}
                    cosmetics={cosmetics}
                    date={date}
                    updateProcurements={setProcurements}
                />
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
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Datum
                        </th>
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Ažuriraj / Obriši
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {procurements && procurements.length > 0 ? (
                        procurements.map(procurement => {
                            return (
                                <tr key={procurement.id}>
                                    <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                        {procurement.cosmetics.name}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {procurement.quantity}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {procurement.purchase_price}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {procurement.total}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r`}>
                                        {procurement.date}
                                    </td>
                                    <td className="lg:px-6 py-3 whitespace-nowrap text-center text-sm font-medium  flex flex-col items-center">
                                        <button className="bg-blue-500 mb-2 w-24 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => openModal(procurement)}
                                        >
                                            Ažuriraj
                                        </button>
                                        <button 
                                            className="bg-red-500 mb-2 w-24 hover:bg-red-300 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => {
                                                if (window.confirm("Da li ste sigurni da želite da obrišete nabavku?")) {
                                                    deleteProcurement(procurement.id);
                                                }
                                            }}
                                        >
                                            Obriši
                                        </button>
                                        
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