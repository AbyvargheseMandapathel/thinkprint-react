import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search box visibility
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle "Enter" key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear the search input after navigation
      setIsSearchOpen(false); // Close the search box after navigation
    }
  };

  // Toggle search box visibility
  const toggleSearchBox = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="custom-font text-2xl text-blue-600">Thinkprint</div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Products", "Pricing", "Blog", "Support"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Search Icon and Input */}
        <div className="flex items-center gap-4 relative">
          {/* Search Box with Icon */}
          {isSearchOpen ? (
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                className="w-48 px-4 py-2 border-b-2 border-gray-300 focus:w-64 focus:border-blue-500 transition-all duration-300 outline-none"
              />
              {/* Search Button (Icon) */}
              <button
                onClick={toggleSearchBox}
                className="absolute right-0 text-gray-700 hover:text-blue-600"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          ) : (
            // Search Icon (Collapsed)
            <button
              onClick={toggleSearchBox}
              className="hidden md:block text-gray-700 hover:text-blue-600"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48">
            {["Home", "Products", "Pricing", "Blog", "Support"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-700 hover:text-blue-600 mb-2"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;