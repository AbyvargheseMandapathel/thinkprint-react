import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { categories } from '../input/categories';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const toggleSearchBox = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="sticky top-0 bg-[var(--navbar-background-color)] backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="custom-font text-2xl text-blue-600">Thinkprint</div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "Home", link: "/" },
            { name: "Products", link: "/products" },
            { name: "About", link: "/about" },
            { name: "Contact Us", link: "/contact" },
            { name: "Categories", link: "#", isDropdown: true },
          ].map((item) => (
            <div key={item.name} onMouseEnter={() => item.isDropdown && toggleDropdown()}>
              {item.isDropdown ? (
                <button
                  className="text-[var(--navbar-link-color)] hover:text-[var(--navbar-link-hover-color)] transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.link}
                  className="text-[var(--navbar-link-color)] hover:text-[var(--navbar-link-hover-color)] transition-colors"
                >
                  {item.name}
                </Link>
              )}
              {item.isDropdown && isDropdownOpen && (
                <div className="absolute left-0 right-0 bg-white shadow-lg rounded-lg p-4 mt-2 mx-auto max-w-7xl">
                  <div className="flex flex-wrap gap-8 justify-start">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${encodeURIComponent(category.name)}`}
                        className="flex flex-col items-center min-w-[120px]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <img 
                          src={category.img} 
                          alt={category.name} 
                          className="w-20 h-20 mb-2 object-cover"
                        />
                        <span className="text-sm text-center">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search Icon and Input */}
        <div className="flex items-center gap-4 relative">
          {isSearchOpen ? (
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                className="w-48 px-4 py-2 border-b-2 border-[var(--navbar-search-border-color)] focus:w-64 focus:border-[var(--navbar-search-focus-border-color)] transition-all duration-300 outline-none"
              />
              <button
                onClick={toggleSearchBox}
                aria-label="Toggle Search Box"
                className="absolute right-0 text-[var(--navbar-link-color)] hover:text-[var(--navbar-link-hover-color)]"
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
            <button
              onClick={toggleSearchBox}
              className="hidden md:block text-[var(--navbar-link-color)] hover:text-[var(--navbar-link-hover-color)]"
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
            className="md:hidden text-[var(--navbar-link-color)] hover:text-[var(--navbar-link-hover-color)]"
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
          <div className="md:hidden absolute top-16 right-4 bg-[var(--navbar-mobile-menu-bg-color)] shadow-lg rounded-lg p-4 w-48">
            {[
              { name: "Home", link: "/" },
              { name: "Products", link: "/products" },
              { name: "About", link: "/about" },
              { name: "Contact Us", link: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="block text-[var(--navbar-mobile-menu-text-color)] hover:text-[var(--navbar-mobile-menu-hover-color)] mb-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;