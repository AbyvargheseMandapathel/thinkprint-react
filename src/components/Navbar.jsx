import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch categories and subcategories from API
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

    const fetchSubcategories = async () => {
      try {
        const response = await fetch('/api/subcategories-api');
        const data = await response.json();
        
        if (data.success) {
          setSubcategories(data.data || []);
        } else {
          console.error('Failed to fetch subcategories:', data.error);
        }
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    fetchCategories();
    fetchSubcategories();
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

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveCategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get subcategories for a specific category
  const getCategorySubcategories = (categoryId) => {
    return subcategories.filter(sub => sub.category_id === categoryId);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top Bar with Logo and Search */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Thinkprint
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
              </div>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Search Icon - Mobile */}
          <button
            onClick={handleSearchIconClick}
            className="md:hidden text-gray-700 ml-4"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Contact Button */}
          <Link
            to="/contact"
            className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-2 px-4 bg-gray-100">
            <form onSubmit={handleSearchSubmit} className="w-full" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
              </div>
            </form>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="hidden md:block py-4 border-t border-gray-200">
          <ul className="flex justify-between items-center" ref={dropdownRef}>
            <li className="relative group">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">
                Products
              </Link>
            </li>
            <li className="relative group">
              <Link to="/urbangear" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">
                Urban Gear
              </Link>
            </li>
            <li className="relative group">
              <span 
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 cursor-pointer flex items-center"
              >
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <div className="absolute left-0 mt-2 w-screen bg-white shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform -translate-x-1/4">
                <div className="container mx-auto p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {loading ? (
                    <div className="col-span-full text-center py-4">Loading categories...</div>
                  ) : error ? (
                    <div className="col-span-full text-center text-red-500 py-4">{error}</div>
                  ) : (
                    categories.map((category) => (
                      <div 
                        key={category.id} 
                        className="flex flex-col"
                        onMouseEnter={() => handleCategoryHover(category.id)}
                      >
                        <Link
                          to={`/category/${encodeURIComponent(category.name)}`}
                          className="text-gray-800 font-medium hover:text-blue-600 transition-colors mb-2"
                        >
                          {category.name}
                        </Link>
                        
                        {/* Subcategories */}
                        {activeCategory === category.id && (
                          <ul className="space-y-1">
                            {getCategorySubcategories(category.id).map((subcategory) => (
                              <li key={subcategory.id}>
                                <Link
                                  to={`/category/${encodeURIComponent(category.name)}/${encodeURIComponent(subcategory.name)}`}
                                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors block py-1"
                                >
                                  {subcategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </li>
            <li className="relative group">
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">
                About
              </Link>
            </li>
            <li className="relative group">
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-white border-t border-gray-200">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/urbangear"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Urban Gear
                </Link>
              </li>
              <li className="px-4 py-2">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Categories</span>
                </div>
                <ul className="pl-4 mt-2 space-y-1 border-l border-gray-200">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/category/${encodeURIComponent(category.name)}`}
                        className="block py-1 text-gray-600 hover:text-blue-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
