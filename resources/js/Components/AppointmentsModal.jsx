import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import '../../css/AppointmentsModal.css';

const AppointmentsModal = ({ isOpen, isEdit, initialFormData, closeModal }) => {
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
    }, [isOpen, initialFormData]);

    const handleInputChange = (e, fieldName) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
    };

    const handleSave = () => {
        // Add logic to save the data or perform other actions
        // ...
        // Close the modal after saving
        closeModal();
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
                <div>
                    <button onClick={handleSave}>{isEdit ? "Ažuriraj" : "Kreiraj"}</button>
                    <button className="cancel" onClick={closeModal}>Poništi</button>
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentsModal;
