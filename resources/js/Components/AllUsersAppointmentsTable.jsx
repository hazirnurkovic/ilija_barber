import React, { useState } from "react";
import '../../css/AllUsersAppointmentsTable.css'; // Import a CSS file for styling
import AppointmentsModal from "./AppointmentsModal";

const AllUsersAppointmentsTable = ({ users, appointments, date, auth }) => {
    const timeSlots = [];
    const startTime = new Date(`${date}T09:00:00`);
    const endTime = new Date(`${date}T19:30:00`);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isConcluded, setIsConcluded] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [price, setPrice] = useState('');
    const [appointmentId, setAppointmentId] = useState('');

    var totalPrice = 0;
    var visible = '';

    if(!Array.isArray(users))
    {
        users = [users];
        visible = 'hidden';
    }

    while (startTime <= endTime) {
        timeSlots.push(new Date(startTime));
        startTime.setMinutes(startTime.getMinutes() + 30);
    }


    const handleCellClick = (userId, timeSlot, date, status2, status3, customer_name, price, appointment_id) => {
        const edit = (status2 || status3);
        setSelectedUserId(userId);
        setSelectedTimeSlot(timeSlot);
        setSelectedDate(date);
        setIsEdit(edit);
        setIsConcluded(status3);
        setIsModalOpen(true);
        setSelectedTimeSlot(timeSlot);
        setSelectedUserId(userId);
        setSelectedDate(date);
        setCustomerName(customer_name);
        setPrice(price);
        setAppointmentId(appointment_id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        setIsConcluded(false);
        setCustomerName('');
        setPrice('');
    };

    return (
        <>
            <table className="appointment-table">
                <thead>
                    <tr>
                        <th className='w-1/12'>Vrijeme</th>

                        {users.map(user => (
                            <th key={user.id}>{user.first_name + " " + user.last_name}</th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map(timeSlot => {
                        const formattedTime = timeSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                        return(

                            <tr key={formattedTime}>

                                <td>
                                    {formattedTime}
                                </td>

                                {users.map(user => {

                                    const appointment = appointments.find(
                                        app => app.user_id === user.id
                                        && new Date(app.start_date) <= timeSlot
                                        && new Date(app.end_date) > timeSlot
                                    );

                                    const cellKey = `${user.id}_${formattedTime}`;
                                    const isStatus2 = appointment && appointment.status === 2;
                                    const isStatus3 = appointment && appointment.status === 3;
                                    const customer_name = appointment ? appointment.customer_name : '';
                                    const price = appointment ? appointment.price : '';
                                    const appointment_id = appointment ? appointment.id : '';
                                    const barberDetailsAppointmentId = user.barber_details ? user.barber_details.appointment_id : null;
                                    const isHighlighted = barberDetailsAppointmentId === appointment_id;

                                    return (
                                        <td
                                            key = {cellKey}
                                            className =
                                            {`
                                                center
                                                ${isStatus2 ? 'status-2' : ''}
                                                ${isStatus3 ? 'status-3' : ''}
                                                ${isHighlighted ? 'highlighted' : ''}
                                               {...(isHighlighted ? {title: "Custom message here"} : {})
                                            `}
                                            onClick = {() =>
                                                {
                                                    handleCellClick(user.id, formattedTime, date, isStatus2, isStatus3, customer_name, price, appointment_id)
                                                }
                                            }
                                        >
                                            {customer_name}
                                        </td>
                                    );
                                })}
                            </tr>
                        );

                    })}
                    {

                    }
                    <tr className={visible}>
                        <td className="!bg-emerald-500 font-bold text-l text-white">Ukupno po barberu: </td>
                        {users.map(user => {
                            const totalUserPrice = appointments
                                .filter(app => app.user_id === user.id)
                                .reduce((total, app) => total + app.price, 0);

                            totalPrice += totalUserPrice;

                            return <td className="!bg-emerald-500 font-bold text-l text-white center" key={`total_${user.id}`}>{totalUserPrice}</td>;
                        })}
                    </tr>
                    <tr>
                        <td className="text-l !bg-emerald-600 font-bold text-white">Ukupni dnevni pazar:</td>
                        <td colSpan={users.length} className="text-l !bg-emerald-600 font-bold text-white">{totalPrice}</td>
                    </tr>
                </tbody>
            </table>

           <AppointmentsModal
            isOpen={isModalOpen}
            isEdit={isEdit}
            isConcluded={isConcluded}
            auth={auth}
            initialFormData={{
                customer_name: customerName,
                price: price,
                user_id: selectedUserId,
                timeSlot: selectedTimeSlot,
                start_date: selectedDate,
                appointment: appointmentId
            }}
            closeModal={closeModal}
           />
        </>

    );
};

export default AllUsersAppointmentsTable;
