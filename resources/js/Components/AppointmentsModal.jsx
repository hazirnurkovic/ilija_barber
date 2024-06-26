import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import '../../css/AppointmentsModal.css';
import Swal from "sweetalert2";

const AppointmentsModal = ({ isOpen, isEdit, isConcluded, initialFormData, closeModal, auth, fetchData }) => {
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
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
        try {
            if (!formData.customer_name) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Molimo unesite ime mušterije!",
                });
                return;
            }

            const response = isEdit
                ? await fetch(`appointments/${formData.appointment}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                : await fetch('appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...formData, status: 2 }),
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
                }).then(() => {
                    fetchData();
                    closeModal(); // Close the modal after updating the appointments
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Greška: ${error.message}`,
            }).then(() => {
                closeModal();
            });
        }
    };

    const handleConcludeAppointment = async () => {
        if (!formData.customer_name || !formData.price) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Molimo popunite sva polja!",
            });
            return;
        }

        try {
            const response = await fetch('/concludeAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointment_id: formData.appointment,
                    price: formData.price,
                    customer_name: formData.customer_name
                }),
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
                }).then(() => {
                    fetchData();
                    closeModal();
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Greška: ${error.message}`,
            }).then(() => {
                closeModal();
            });
        }
    };

    const handleDeleteAppointment = async () => {
        try {
            const willDelete = await Swal.fire({
                title: 'Da li ste sigurni ?',
                text: "da želite da izbrišete ovaj termin",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Izbriši',
                cancelButtonText:'Odustani'
            });

            if (willDelete.isConfirmed) {
                const response = await fetch(`/appointments/${formData.appointment}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
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
                    }).then(() => {
                        fetchData();
                        closeModal();
                    });
                }
            } else {
                closeModal();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Greška: ${error.message}`,
            }).then(() => {
                closeModal();
            });
        }
    };

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
                    {isConcluded ? null : (
                        <button onClick={handleSave} className="mb-2 sm:mb-0 appointments_button">
                            {isEdit ? "Ažuriraj" : "Kreiraj"}
                        </button>
                    )}
                    <div className="sm:mb-0">
                        {auth.user?.is_admin && isEdit && !isConcluded ? (
                            <button onClick={handleConcludeAppointment} className="appointments_button !bg-green-500">Zaključi</button>
                        ) : null}
                        {!isEdit || (isConcluded && !auth.user?.is_admin) ? null : (
                            <button onClick={handleDeleteAppointment} className="appointments_button sm:ml-8 !bg-red-700">Obriši</button>
                        )}
                    </div>
                    <button className="cancel_button bg-red-500 xs:mt-2 sm:mt-2 lg:mt-0 xl:mt-0 md:mt-0" onClick={closeModal}>Poništi</button>
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentsModal;
