import AllUsersAppointmentsTable from '@/Components/AllUsersAppointmentsTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/DatePickerStyles.css';
import Swal from 'sweetalert2';


export default function Dashboard({ auth }) {
    const { success, error } = usePage().props;

    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState();

    useEffect(() => {
        fetchData(date);
    }, []);

    useEffect(() => {
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: success,
            });
        }
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error,
            });
        }
    }, [success, error]);

    const fetchData = async (date) => {
        try {
            const formatted = formatDate(date);
            let apiEndpoint = '/getAllAppointmentsForSpecificDate';
            if (auth.user.is_admin !== 1) {
                apiEndpoint = '/getAllAppointmentsForSpecificDateForUser';
            }
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({date: formatted})
            });
            if (!response.ok) {
                throw new Error('An error occured. Try again!')
            }

            const data = await response.json();
            setUsers(data.users);
            setAppointments(data.appointments);
            setFormattedDate(formatted);

        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        fetchData(selectedDate);
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Termini</h2>}
        >
            <Head title="Termini" />
            <div className="date-picker-container mt-2">
                <DatePicker selected={date}  onChange={handleDateChange}/>
                {auth.user.is_admin ? (
                    <Link method="post" as='button' href={route('send_daily_report_email', {date: formattedDate})} className="text-white font-bold py-3 ml-3 px-10 lg:w-52 bg-red-500">
                        Zakljuci dan
                    </Link>
                ) : ''}
            </div>

            <AllUsersAppointmentsTable
                users={users}
                appointments={appointments}
                date={formattedDate}
                auth={auth}
            />

        </AuthenticatedLayout>
    );
}
