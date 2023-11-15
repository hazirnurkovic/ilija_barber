import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Barbers = ({ users, auth }) => {

    const handleOnDelete = (userId) => {
        if(confirm('Da li ste siguri da želite da obrišete ovog barbera?'))
        {
            fetch('delete_barber', {
                method: 'POST',
                body: JSON.stringify({
                    id: userId
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                // Check if the response is ok
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    };

    return (
       <Authenticated
        user={auth.user}
       >

        <Head title="Barberi" />

        <div className="overflow-x-auto">
            <div className="sm:px-6 lg:px-8 mb-4 mt-4">
                    <Link href={route('create_barber.create')} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Dodaj Barbera
                    </Link>
                </div>
            <div className="sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">Ime i Prezime / Korisničko ime</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">Mail/Telefon</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border">Ažuriraj / Obriši podatke</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user.id}>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border text-center">
                                        <div className="font-medium text-gray-900">{user.first_name} {user.last_name}</div>
                                        <div>{user.username}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border text-center">
                                        <div>{user.email}</div>
                                        <div>{user.telephone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium border flex flex-col items-center">
                                            <Link
                                                className="bg-blue-500 mb-2 w-24 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                href={route('create_barber.edit', {create_barber: user.id})}
                                            >
                                                Ažuriraj
                                            </Link>
                                            <button
                                                className="bg-blue-500 w-24 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                onClick={()=> handleOnDelete(user.id)}
                                            >
                                                Obriši
                                            </button>
                                        </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

       </Authenticated>
    );
};

export default Barbers;