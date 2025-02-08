import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUsForm from "../components/ContactUsForm";
import { generateBreadcrumbs } from "../utils/breadcrumbUtils";
import { contactInfo } from "../data"; // Import contact info

const ContactUsPage = () => {
    const breadcrumbs = generateBreadcrumbs("contact");

    return (
        <div className="font-[var(--font-primary)] bg-[var(--background-color)]">
            <div className="container mx-auto px-4 py-12">

                {/* Single Container with Two Sections (Form Left, Info Right) */}
                <div className="bg-white shadow-lg p-6 rounded-md grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Section - Contact Form */}
                    <div className="p-4">
                        {/* <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">
                            Contact Us
                        </h2> */}
                        <ContactUsForm />
                    </div>

                    {/* Right Section - Contact Info */}
                    <div className="p-4 border-l border-gray-300">
                        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">
                            Information
                        </h2>

                        {/* Phone */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Phone:</h3>
                            <p className="text-gray-600">{contactInfo.phone}</p>
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Email:</h3>
                            <p className="text-gray-600">{contactInfo.email}</p>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Address:</h3>
                            <p className="text-gray-600">{contactInfo.address}</p>
                        </div>

                        {/* Open Time */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">Open Time:</h3>
                            {contactInfo.openTime.map((entry, index) => (
                                <p key={index} className="text-gray-600">{entry.day}: {entry.time}</p>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
