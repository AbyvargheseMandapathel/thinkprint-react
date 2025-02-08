import React, { useState } from 'react';

const ContactForm = ({ isOpen, onClose, productName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/product-enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    product: productName,
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                }, 3000);
            } else {
                const result = await response.json();
                setError(result.error || 'Failed to submit enquiry.');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            setError('An unexpected error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                {!isSubmitting && !isSuccess && (
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
                )}

                {!isSubmitting && !isSuccess && (
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enquire Now</h2>

                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
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

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
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

                        {/* Message */}
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message:</label>
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
                )}

                {isSubmitting && (
                    <div className="flex flex-col items-center justify-center">
                        <p className="mt-4 text-gray-700">Submitting...</p>
                    </div>
                )}

                {isSuccess && (
                    <div className="flex flex-col items-center justify-center">
                        {/* ✅ Animated Tick */}
                        <svg className="h-16 w-16 text-green-500 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>

                        <p className="mt-4 text-gray-700">Form Submitted!</p>
                        <p className="text-gray-600">You will be contacted by an executive very shortly.</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center text-red-500">
                        <p className="mt-4">{error}</p>
                    </div>
                )}
            </div>

            {/* ✅ CSS for Animation */}
            <style>
                {`
                @keyframes scaleIn {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .animate-scale-in {
                    animation: scaleIn 0.5s ease-out;
                }
                `}
            </style>
        </div>
    );
};

export default ContactForm;
