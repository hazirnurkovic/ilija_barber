import React from "react";
import '../../css/AllUsersAppointmentsTable.css'; // Import a CSS file for styling

const AllUsersAppointmentsTable = ({ users, appointments, date }) => {
    const timeSlots = [];
    const startTime = new Date(`${date}T09:00:00`);
    const endTime = new Date(`${date}T20:00:00`);

    while (startTime <= endTime) {
        timeSlots.push(new Date(startTime));
        startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return (
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
                {timeSlots.map(timeSlot => (
                    <tr key={timeSlot.toISOString()}>
                        <td>{timeSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                        {users.map(user => {
                            const appointment = appointments.find(
                                app => app.user_id === user.id && new Date(app.start_date) <= timeSlot && new Date(app.end_date) > timeSlot
                            );
                            const cellKey = `${user.id}_${timeSlot.toISOString()}`;
                            const isStatus2 = appointment && appointment.status === 2;
                            const isStatus3 = appointment && appointment.status === 3;

                            return (
                                <td
                                    key={cellKey}
                                    className={`
                                        ${isStatus2 ? 'status-2' : ''}
                                        ${isStatus3 ? 'status-3' : ''}
                                    `}
                                >
                                    {appointment ? appointment.customer_name : ''}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AllUsersAppointmentsTable;