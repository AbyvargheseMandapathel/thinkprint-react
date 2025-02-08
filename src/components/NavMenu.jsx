import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"; // Your logo SVG

const NavMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearchBox = () => setIsSearchOpen((prev) => !prev);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 shadow-md">
      <nav className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {["Home", "Products", "Pricing", "Blog", "Support"].map((item, index) => (
            <a
              key={index}
              href={`/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative">
          {isSearchOpen ? (
            <div className="relative flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                className="w-40 md:w-56 px-2 outline-none"
              />
              <button onClick={toggleSearchBox} className="ml-2 text-gray-600">
                ✖
              </button>
            </div>
          ) : (
            <button onClick={toggleSearchBox} className="hidden md:block text-gray-700 font-medium">
              Search
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-700 font-medium">
          Menu
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48">
            {["Home", "Products", "Pricing", "Blog", "Support"].map((item, index) => (
              <a
                key={index}
                href={`/${item.toLowerCase()}`}
                className="block text-gray-700 hover:text-blue-600 mb-2 font-medium"
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

export default NavMenu;
