import { useEffect, useState } from "react";
import CosmeticsFormModal from "./CosmeticsFormModal";
import { Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";


const ArticlesComponent = ({cosmetics, auth}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowData, setRowData] = useState(null);

    const { success, error } = usePage().props;

    useEffect(() => {
        // Display success message if it exists
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Uspješno!',
                text: success,
            });
        }

        // Display error message if it exists
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text: error,
            });
        }
    }, [success, error]);

    const openModal = (data) => {
        console.log(data);
        setRowData(data);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <button onClick={() => openModal(null)} className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 mb-3 rounded-10">Dodaj</button>
            {isModalOpen && 
                <CosmeticsFormModal
                    auth={auth}
                    closeModal={closeModal}
                    rowData={rowData}
                />
            }
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Naziv Artikla
                        </th>
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Status
                        </th>
                        <th scope="col"
                            className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Ažuriraj / Obriši
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cosmetics && cosmetics.length > 0 ? (
                        cosmetics.map(item => {
                            // Determine label and color based on item.status
                            let label = item.status === 1 ? 'Aktivan' : 'Neaktivan';
                            let color = item.status === 1 ? 'green' : 'red';

                            return (
                                <tr key={item.id}>
                                    <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                        {item.name}
                                    </td>
                                    <td className={`md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 whitespace-nowrap text-sm text-center font-medium border-r text-${color}-700`}>
                                        {label}
                                    </td>
                                    <td className="lg:px-6 py-3 whitespace-nowrap text-center text-sm font-medium  flex flex-col items-center">
                                        <button className="bg-blue-500 mb-2 w-24 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded"
                                                onClick={() => openModal(item)}
                                        >
                                            Ažuriraj
                                        </button>
                                        
                                        <Link className="bg-red-500 mb-2 w-24 hover:bg-red-300 text-white font-bold py-1 px-2 rounded"
                                            as='button'
                                            method='delete'
                                            href={route('cosmetics.destroy', {cosmetic: item.id})}
                                            onClick={(e) => {
                                                if (!window.confirm("Da li ste sigurni da zelite da obrišete artikal?")) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Obriši
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    ) : 
                    (
                        <tr>
                            <td className="md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 border-r">
                                Nema unijetih artikala
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default ArticlesComponent;