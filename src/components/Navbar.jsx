import React, { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
        <div className="custom-font text-2xl text-blue-600">Thinkprint</div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <input type="text"
                   className="w-48 px-4 py-2 border-b-2 border-gray-300 focus:w-64 focus:border-blue-500
                              transition-all duration-300 outline-none"
                   placeholder="Search..." />
          </div>
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-700 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="relative text-gray-700 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">3</span>
          </button>
        </div>

        <div id="mobileMenu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48`}>
          <a href="#" className="block text-gray-700 hover:text-blue-600 mb-2">Home</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 mb-2">Products</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 mb-2">Pricing</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 mb-2">Blog</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 mb-2">Support</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
