import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Section 1: About Us */}
                <div>
                    <h3 className="text-lg font-bold mb-4">About Us</h3>
                    <p className="text-sm text-gray-400">
                        We are a team dedicated to providing high-quality products and services to our customers.
                        Our mission is to make shopping easier and more enjoyable for everyone.
                    </p>
                </div>

                {/* Section 2: Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Shop</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Cart</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Account</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Social Media */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        {/* Facebook */}
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                            aria-label="Facebook"
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
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75S6.615 21.75 12 21.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18.75a6 6 0 100-12 6 6 0 000 12z"
                                />
                            </svg>
                        </a>

                        {/* Twitter */}
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                            aria-label="Twitter"
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
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.002 8.002 0 01-4.753-1.458l-.003-.002-.003.002A8.002 8.002 0 013 12c0-4.418 3.582-8 8-8 1.85 0 3.547.633 4.915 1.657l.003.002.003-.002A7.959 7.959 0 0112 4c4.418 0 8 3.582 8 8v.01z"
                                />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                            aria-label="Instagram"
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
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75S6.615 21.75 12 21.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18.75a6 6 0 100-12 6 6 0 000 12zm0-8.25a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm-6 0a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm12 0a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;