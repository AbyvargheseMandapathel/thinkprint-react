import React, { useState } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to server)
        console.log('Form Submitted:', formData);
        onClose(); // Close the modal after submission
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Enquire Now</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                            Message:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Submit Enquiry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;