import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import '../../css/AppointmentsModal.css';
import Swal from "sweetalert2";

const AppointmentsModal = ({ isOpen, isEdit, initialFormData, closeModal, auth }) => {
    const [formData, setFormData] = useState(initialFormData);
    useEffect(() => {
        updateFormDataDates(initialFormData);
    }, [isOpen, initialFormData]);

    const updateFormDataDates = (formData) => {
        const start_date = `${formData.start_date} ${formData.timeSlot}:00`;
        const start_dateTimeObject = new Date(start_date);
        const end_dateTimeObject = new Date(start_dateTimeObject.getTime() + 30 * 60000);

        setFormData({
            ...formData,
            start_date: start_dateTimeObject,
            end_date: end_dateTimeObject
        });
    };

    const handleInputChange = (e, fieldName) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
    };

    const handleSave = async () => {

        try{

            if(isEdit)
            {
                const response = await fetch(`appointments/${formData.appointment}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                if (!response.ok) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Greška: ${result.message}`,
                      });
                } else {
                    Swal.fire({
                        title: "Uspješno!",
                        text: result.message,
                        icon: "success"
                    });
                }
            }
            else
            {
                formData.status = 2;
                const response = await fetch('appointments', {
                    method : 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                if(!response.ok)
                {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Greška: ${result.message}`,
                      });
                }
                else
                {
                    Swal.fire({
                        title: "Uspješno!",
                        text: result.message,
                        icon: "success"
                    });
                }

            }
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        }catch(error)
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Greška: ${error}`,
              });
        }
        closeModal();
    };

    const handleConcludeAppointment = async () => {
        try{
            const requestBody = {
                appointment_id: formData.appointment,
            };

            const response = await fetch('/concludeAppointment', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const result = await response.json();
            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Greška: ${result.message}!`,
                  });
            } else {
                Swal.fire({
                    title: "Uspješno!",
                    text: result.message,
                    icon: "success"
                });
            }

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.log(`${error}  ${response.message}`);
        }
    }

    const handleDeleteAppointment = async () => {
        if(confirm('Da li ste sigurni da želite obrisati ovaj termin?'))
        {
            try{
                const response = await fetch(`/appointments/${formData.appointment}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                });
                const result = await response.json();
                if (!response.ok) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: result.message,
                      });
                } else {
                    Swal.fire({
                        title: "Uspješno!",
                        text: result.message,
                        icon: "success"
                    });
                }

                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } catch (error) {
                console.log(`${error}  ${response.message}`);
            }
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            className="modal"
            overlayClassName={`modal-overlay ${isOpen ? 'open' : ''}`}
            onRequestClose={closeModal}
            ariaHideApp={false}
        >
            <div className="modal-content">
                <label>
                    Ime klijenta:
                    <input
                        type="text"
                        value={formData.customer_name}
                        onChange={(e) => handleInputChange(e, 'customer_name')}
                    />
                </label>
                <label>
                    Cijena:
                    <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => handleInputChange(e, 'price')}
                    />
                </label>
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <button onClick={handleSave} className="mb-2 sm:mb-0">{isEdit ? "Ažuriraj" : "Kreiraj"}</button>
                        <div className="mb-2 sm:mb-0">
                            {auth.user && auth.user.is_admin ? (
                            <button onClick={handleConcludeAppointment} className="bg-teal-500">Zaključi</button>
                                ):null}
                            <button onClick={handleDeleteAppointment} className="sm:ml-8 bg-red-700">Obriši</button>
                        </div>
                    <button className="cancel" onClick={closeModal}>Poništi</button>
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentsModal;
