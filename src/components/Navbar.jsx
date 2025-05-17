import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownTimeout = useRef(null);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories-api');
        const data = await response.json();
        
        if (data.success) {
          setCategories(data.data || []);
        } else {
          setError(data.error || 'Failed to fetch categories');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setActiveCategory(null);
    }, 300);
  };

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(dropdownTimeout.current);
    };
  }, []);

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
            { name: "UrbanGear", link: "/urbangear" },
          ].map((item) => (
            <div
              key={item.name}
              onMouseOver={item.isDropdown ? handleDropdownMouseEnter : undefined}
              onMouseLeave={item.isDropdown ? handleDropdownMouseLeave : undefined}
              ref={item.isDropdown ? dropdownRef : null}
            >
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
                <div
                  className="absolute left-0 right-0 bg-white shadow-lg rounded-lg p-4 mt-2 mx-auto max-w-7xl"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {loading ? (
                    <div className="text-center py-4">Loading categories...</div>
                  ) : error ? (
                    <div className="text-center text-red-500 py-4">{error}</div>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {categories.map((category) => (
                        <div 
                          key={category.id} 
                          className="flex flex-col"
                          onMouseEnter={() => handleCategoryHover(category.id)}
                        >
                          <Link
                            to={`/category/${encodeURIComponent(category.name)}`}
                            className="text-sm font-medium hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {category.name}
                          </Link>
                          
                          {/* Subcategories - only show when category is active */}
                          {activeCategory === category.id && category.subcategories && category.subcategories.length > 0 && (
                            <ul className="mt-1 space-y-1 pl-2 border-l border-gray-200">
                              {category.subcategories.map((subcategory) => (
                                <li key={subcategory.id}>
                                  <Link
                                    to={`/category/${encodeURIComponent(category.name)}/${encodeURIComponent(subcategory.name)}`}
                                    className="text-xs text-gray-600 hover:text-blue-600 transition-colors block py-1"
                                    onClick={() => setIsDropdownOpen(false)}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search Icon and Input */}
        <div className="flex items-center gap-4 relative">
          <button
            onClick={handleSearchIconClick}
            className="text-[var(--navbar-icon-color)] hover:text-[var(--navbar-icon-hover-color)] transition-colors"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {isSearchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden flex"
              ref={searchRef}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 w-64 focus:outline-none"
                ref={searchRef}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2"
                aria-label="Submit search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[var(--navbar-icon-color)] hover:text-[var(--navbar-icon-hover-color)] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-[var(--navbar-mobile-menu-bg-color)] shadow-lg rounded-lg p-4 w-48">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-[var(--navbar-mobile-link-color)] hover:text-[var(--navbar-mobile-link-hover-color)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-[var(--navbar-mobile-link-color)] hover:text-[var(--navbar-mobile-link-hover-color)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-[var(--navbar-mobile-link-color)] hover:text-[var(--navbar-mobile-link-hover-color)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-[var(--navbar-mobile-link-color)] hover:text-[var(--navbar-mobile-link-hover-color)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/urbangear"
                className="text-[var(--navbar-mobile-link-color)] hover:text-[var(--navbar-mobile-link-hover-color)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                UrbanGear
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
