import React, { useState } from "react";
import Popup from "@/components/Popup/Popup";

interface AddDeliveryPersonProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    onSave: (data: DeliveryPersonFormData) => void;
}

interface DeliveryPersonFormData {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    birthday: string;
    gender: string;
}

const AddDeliveryPerson: React.FC<AddDeliveryPersonProps> = ({
    isOpen,
    onClose,
    title,
    description,
    onSave,
}) => {
    const [formData, setFormData] = useState<DeliveryPersonFormData>({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        birthday: "",
        gender: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Pass form data to parent on save
        onSave(formData);
        onClose();
    };

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            onSaveClick={handleSave}
            saveButtonLabel="Save"
            cancelButtonLabel="Cancel"
        >
            {/* Form Content */}
            <form className="space-y-4">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block font-medium">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="block font-medium">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label htmlFor="contactNumber" className="block font-medium">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Birthday */}
                <div>
                    <label htmlFor="birthday" className="block font-medium">
                        Birthday
                    </label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label htmlFor="gender" className="block font-medium">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </form>
        </Popup>
    );
};

export default AddDeliveryPerson;
