import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileNavigation = () => {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to toggle the search popup
  const toggleSearchPopup = () => {
    setIsSearchPopupOpen((prevState) => !prevState);
    setSearchQuery(""); // Reset the search query when closing the popup
  };

  // Function to handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Navigating to:", `/search?query=${encodeURIComponent(searchQuery.trim())}`);
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      toggleSearchPopup(); // Close the popup after navigating
    }
  };

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* Search Popup */}
      {isSearchPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            {/* Close Icon */}
            <button
              onClick={toggleSearchPopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
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
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Search Input and Button */}
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="text"
                placeholder="Enter your search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown} // Listen for "Enter" key press
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSearch}
                className="text-blue-600 hover:text-blue-800 transition-colors"
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
          </div>
        </div>
      )}

      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-0 w-full bg-white border-t shadow-lg md:hidden z-50">
        <div className="flex justify-around py-4">
          {/* Home Icon */}
          <a href="#" className="text-gray-600 flex flex-col items-center hover:text-blue-600 transition-colors">
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l-2-2m2 2V4a1 1 0 011-1h3m-6 9l2 2m-2-2v10a1 1 0 001 1h3m-6 0l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l-2-2m2 2V4a1 1 0 00-1-1h-3"
              />
            </svg>
            <span className="text-xs">Home</span>
          </a>

          {/* Search Icon */}
          <button
            onClick={toggleSearchPopup}
            className="text-gray-600 flex flex-col items-center hover:text-blue-600 transition-colors"
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
            <span className="text-xs">Search</span>
          </button>

          {/* Contact Us Icon */}
          <a href="/contact" className="text-gray-600 flex flex-col items-center hover:text-blue-600 transition-colors">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Contact Us</span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default MobileNavigation;