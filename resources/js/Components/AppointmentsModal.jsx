import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import '../../css/AppointmentsModal.css';

const AppointmentsModal = ({ isOpen, isEdit, initialFormData, closeModal }) => {
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
    
                if (!response.ok) {
                    alert("Greška");
                    console.error('Failed to update appointment:');
                } else {
                    alert('Termin uspješno ažuriran');
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
                
                if(!response.ok) 
                {
                    alert(`Greška`)
                }
                else
                {
                    alert('Uspješno kreiran termin.')
                }
            
            }
            window.location.reload();

        }catch(error)
        {
            alert("Greska: ", error);
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
                alert(`Greška: ${result.message}`);
            } else {
                alert(result.message);
            }

            window.location.reload();

        } catch (error) {
            console.log(`${error}  ${response.message}`);
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
                <div>
                    {isEdit && (
                        <button onClick={handleConcludeAppointment} className="mr-7 bg-teal-500">Zaključi</button>
                    )}
                    <button onClick={handleSave}>{isEdit ? "Ažuriraj" : "Kreiraj"}</button>
                    <button className="cancel" onClick={closeModal}>Poništi</button>
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentsModal;
