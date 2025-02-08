import React, { useState } from 'react';

const ContactUsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

        try {
            const response = await fetch('/api/contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
                console.log('Form Submitted:', formData);
            } else {
                console.error('Error submitting form:', await response.json());
            }
        } catch (error) {
            console.error('Network error:', error);
        }

        setIsSubmitting(false);

        // Reset form after submission
        setTimeout(() => {
            setIsSuccess(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
        }, 3000); // Reset after 3 seconds
    };

    return (
        <div className="bg-[var(--contactusform-background-color)] p-[var(--contactusform-padding)] rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-[var(--contactusform-text-color)] mb-4">Contact Us</h2>
            {!isSubmitting && !isSuccess && (
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-[var(--contactusform-text-color)] font-medium mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-[var(--contactusform-border-color)] px-4 py-2 rounded-lg w-full focus:outline-none focus:border-[var(--contactusform-focus-border-color)]"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-[var(--contactusform-text-color)] font-medium mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-[var(--contactusform-border-color)] px-4 py-2 rounded-lg w-full focus:outline-none focus:border-[var(--contactusform-focus-border-color)]"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-[var(--contactusform-text-color)] font-medium mb-2">
                            Phone:
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-[var(--contactusform-border-color)] px-4 py-2 rounded-lg w-full focus:outline-none focus:border-[var(--contactusform-focus-border-color)]"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-[var(--contactusform-text-color)] font-medium mb-2">
                            Message:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="border border-[var(--contactusform-border-color)] px-4 py-2 rounded-lg w-full focus:outline-none focus:border-[var(--contactusform-focus-border-color)]"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[var(--contactusform-button-bg-color)] text-[var(--contactusform-button-text-color)] px-6 py-3 rounded-lg hover:bg-[var(--contactusform-button-hover-bg-color)] transition-colors"
                    >
                        Submit Enquiry
                    </button>
                </form>
            )}

            {/* Submitting Animation */}
            {isSubmitting && (
                <div className="flex flex-col items-center justify-center">
                    <svg
                        className="animate-spin h-12 w-12 text-[var(--contactusform-submitting-spinner-color)]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928V19.1a9 9 0 1118 0v-1.172A7.962 7.962 0 0110 17.291V12H4v5.291z"
                        />
                    </svg>
                    <p className="mt-4 text-[var(--contactusform-text-color)]">Submitting...</p>
                </div>
            )}

            {/* Success Animation */}
            {isSuccess && (
                <div className="flex flex-col items-center justify-center">
                    <svg
                        className="checkmark h-12 w-12 text-[var(--contactusform-success-checkmark-color)]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                    >
                        <circle
                            className="checkmark__circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        />
                        <path
                            className="checkmark__check"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                    </svg>
                    <p className="mt-4 text-[var(--contactusform-success-text-color)]">Form Submitted!</p>
                    <p className="text-[var(--contactusform-success-subtext-color)]">You will be contacted by an executive very shortly.</p>
                </div>
            )}
        </div>
    );
};

export default ContactUsForm;
