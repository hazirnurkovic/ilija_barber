import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex items-center justify-center">
                    <Link href="/">
                        <ApplicationLogo className="w-[300px] h-[300px] fill-current text-gray-500"/>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
