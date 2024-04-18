import { useEffect } from "react";


const ArticlesComponent = ({cosmetics}) => {
    return (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-blue-500 text-white">
                <tr>
                    <th scope="col"
                        className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Naziv Artikla
                    </th>
                    <th scope="col"
                        className=" md:px-6 lg:px-6 xl:px-6 2xl:px-6 py-3 text-center text-xs font-bold uppercase border-r">Status
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
    );
}

export default ArticlesComponent;