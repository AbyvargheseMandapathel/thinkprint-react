import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="bg-[var(--footer-background-color)] text-[var(--footer-text-color)] py-[var(--footer-padding)]">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Section 1: About Us */}
                <div>
                    <h3 className="text-[var(--footer-section-title-font-size)] font-[var(--footer-section-title-font-weight)] mb-[var(--footer-section-title-margin-bottom)]">About Us</h3>
                    <p className="text-[var(--footer-section-text-font-size)] text-[var(--footer-section-text-color)]">
                        We are a team dedicated to providing high-quality products and services to our customers.
                        Our mission is to make shopping easier and more enjoyable for everyone.
                    </p>
                </div>

                {/* Section 2: Quick Links */}
                <div>
                    <h3 className="text-[var(--footer-section-title-font-size)] font-[var(--footer-section-title-font-weight)] mb-[var(--footer-section-title-margin-bottom)]">Quick Links</h3>
                    <ul className="text-[var(--footer-section-text-font-size)] text-[var(--footer-section-text-color)] space-y-2">
                        <li>
                            <a href="/" className="hover:text-[var(--footer-link-hover-color)] transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="/products" className="hover:text-[var(--footer-link-hover-color)] transition-colors">Products</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-[var(--footer-link-hover-color)] transition-colors">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-[var(--footer-link-hover-color)] transition-colors">Contact Us</a>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Social Media */}
                <div>
                    <h3 className="text-[var(--footer-section-title-font-size)] font-[var(--footer-section-title-font-weight)] mb-[var(--footer-section-title-margin-bottom)]">Follow Us</h3>
                    <div className="flex space-x-4">
                        {/* Facebook */}
                        <a
                            href="#"
                            className="text-[var(--footer-social-icon-color)] hover:text-[var(--footer-social-icon-hover-facebook)] transition-colors text-xl"
                            aria-label="Facebook"
                        >
                            <i className="fa-brands fa-facebook"></i>
                        </a>

                        {/* Instagram */}
                        <a
                            href="#"
                            className="text-[var(--footer-social-icon-color)] hover:text-[var(--footer-social-icon-hover-instagram)] transition-colors text-xl"
                            aria-label="Instagram"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 border-t border-[var(--footer-border-color)] pt-6 text-center text-sm text-[var(--footer-copyright-text-color)]">
                &copy; {new Date().getFullYear()} Thinkprint. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;