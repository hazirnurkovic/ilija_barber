import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import '../../css/Cosmetics.css';
import Dropdown from '@/Components/Dropdown';
import ArticlesComponent from '@/Components/ArticlesComponent';
import ProcurementsComponent from '@/Components/ProcurementsComponent';
const CosmeticsPage = ({ auth, cosmetics }) => {
    const [activeLink, setActiveLink] = useState('artikli');
    return (
        <Authenticated
            user={auth.user}

            header={
                <div className="container">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Kozmetika</h2>
                    <div className="sm:hidden">
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="capitalize inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {activeLink}
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    {activeLink !== 'artikli' && (
                                        <button onClick={() => setActiveLink('artikli')} className={`dropdown-button block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${activeLink === 'artikli' && 'active'}`}>
                                            Artikli
                                        </button>
                                    )}
                                    <button onClick={() => setActiveLink('nabavka')} className={`dropdown-button block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${activeLink === 'nabavka' && 'active'}`}>
                                        Nabavka
                                    </button>
                                    <button onClick={() => setActiveLink('magacin')} className={`dropdown-button block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${activeLink === 'magacin' && 'active'}`}>
                                        Magacin
                                    </button>
                                    <button onClick={() => setActiveLink('prodaja')} className={`dropdown-button block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${activeLink === 'prodaja' && 'active'}`}>
                                        Prodaja
                                    </button>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="hidden sm:block">
                        <div>
                            <button onClick={() => setActiveLink('artikli')} className={`cosmetics_button inline-flex items-center ml-2 px-2 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${activeLink === 'artikli' && 'active' && 'border-indigo-400 text-gray-900 border-indigo-700'} ${activeLink !== 'artikli' && activeLink !== 'active' && 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'}`}> Artikli </button>
                            <button onClick={() => setActiveLink('nabavka')} className={`cosmetics_button inline-flex items-center ml-2 px-2 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${activeLink === 'nabavka' && 'active' && 'border-indigo-400 text-gray-900 border-indigo-700'} ${activeLink !== 'nabavka' && activeLink !== 'active' && 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'}`}> Nabavka </button>
                            <button onClick={() => setActiveLink('magacin')} className={`cosmetics_button inline-flex items-center ml-2 px-2 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${activeLink === 'magacin' && 'active' && 'border-indigo-400 text-gray-900 border-indigo-700'} ${activeLink !== 'magacin' && activeLink !== 'active' && 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'}`}> Magacin </button>
                            <button onClick={() => setActiveLink('prodaja')} className={`cosmetics_button inline-flex items-center ml-2 px-2 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${activeLink === 'prodaja' && 'active' && 'border-indigo-400 text-gray-900 border-indigo-700'} ${activeLink !== 'prodaja' && activeLink !== 'active' && 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'}`}> Prodaja </button>
                        </div>
                    </div>

                </div>
            }

        >
            <Head title={`Kozmetika - ${activeLink.toUpperCase()}`} />
            <div className="flex flex-col m-2">
                <div className="overflow-x-auto w-full  mx-auto md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
                    <div className="min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                            {activeLink === 'artikli' && <ArticlesComponent cosmetics={cosmetics} auth={auth}/>}
                            {activeLink === 'nabavka' && <ProcurementsComponent auth={auth}/>}
                            {/*
                            {activeLink === 'magacin' && <ArticlesComponent cosmetics={cosmetics}/>}
                            {activeLink === 'prodaja' && <ArticlesComponent cosmetics={cosmetics}/>} */}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>

    );
};

export default CosmeticsPage;
