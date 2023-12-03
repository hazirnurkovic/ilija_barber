import React, { useState } from "react";
import '../../css/AllUsersAppointmentsTable.css'; // Import a CSS file for styling
import AppointmentsModal from "./AppointmentsModal";

const AllUsersAppointmentsTable = ({ users, appointments, date }) => {
    const timeSlots = [];
    const startTime = new Date(`${date}T09:00:00`);
    const endTime = new Date(`${date}T20:00:00`);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [price, setPrice] = useState('');

    while (startTime <= endTime) {
        timeSlots.push(new Date(startTime));
        startTime.setMinutes(startTime.getMinutes() + 30);
    }

    
    const handleCellClick = (userId, timeSlot, date, status2, status3, customer_name, price) => {
        const edit = (status2 || status3);
        setSelectedUserId(userId);
        setSelectedTimeSlot(timeSlot);
        setSelectedDate(date);
        setIsEdit(edit);
        setIsModalOpen(true);
        setSelectedTimeSlot(timeSlot);
        setSelectedUserId(userId);
        setSelectedDate(date);
        setCustomerName(customer_name);
        setPrice(price);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        setCustomerName('');
        setPrice('');
    };

    return (
        <>
            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Vrijeme</th>

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

                                    return (
                                        <td
                                            key = {cellKey}
                                            className = 
                                            {`
                                                ${isStatus2 ? 'status-2' : ''}
                                                ${isStatus3 ? 'status-3' : ''}
                                            `}
                                            onClick = {() => 
                                                {
                                                    handleCellClick(user.id, formattedTime, date, isStatus2, isStatus3, customer_name, price)
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
                </tbody>
            </table>

           <AppointmentsModal 
            isOpen={isModalOpen}
            isEdit={isEdit}
            initialFormData={{
                customer_name: customerName,
                price: price
            }}
            closeModal={closeModal}
           />
        </>

    );
};

export default AllUsersAppointmentsTable;