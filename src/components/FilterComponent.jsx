import React, { useState, useEffect } from "react";
import { categories } from "../input/categories"; // Import categories from data.js
import { useNavigate } from "react-router-dom"; // Import useNavigate for URL manipulation

const FilterComponent = ({ onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const navigate = useNavigate(); // Access the navigate function

  // Extract category names and include "All" as the first option
  const categoryOptions = ["All", ...categories.map((category) => category.name)];

  // Trigger Filtering Logic
  const handleApplyFilters = () => {
    onFilter(selectedCategory, priceRange);

    // Update URL parameters
    const queryParams = new URLSearchParams();
    if (selectedCategory !== "All") queryParams.set("category", selectedCategory);
    queryParams.set("minPrice", priceRange[0]);
    queryParams.set("maxPrice", priceRange[1]);

    navigate(`/products?${queryParams.toString()}`, { replace: true });
  };

  // Reset Filters and Clear URL Parameters
  const handleResetFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 5000]);
    onFilter("All", [0, 5000]); // Reset filters

    // Remove URL parameters
    navigate("/products", { replace: true }); // Navigate to the base URL without query params
  };

  // Sync URL parameters with component state on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "All";
    const minPrice = parseInt(urlParams.get("minPrice")) || 0;
    const maxPrice = parseInt(urlParams.get("maxPrice")) || 5000;

    setSelectedCategory(category);
    setPriceRange([minPrice, maxPrice]);
  }, []);

  // Debugging logs for state updates
  useEffect(() => {
    console.log("Selected Category Updated:", selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Category Filter */}
      <div key={selectedCategory}> {/* Force re-render */}
        <h4 className="text-lg font-bold mb-4">Categories</h4>
        <ul className="space-y-2">
          {categoryOptions.map((category) => (
            <li key={category}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category} // Ensure this reflects the current state
                  onClick={() => {
                    console.log("Selected Category:", category); // Debugging log
                    setSelectedCategory(category);
                  }}
                  className="mr-2"
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      {/* <div>
        <h4 className="text-lg font-bold mb-4">Price Range</h4>
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, e.target.value])}
          className="w-full"
        />
      </div> */}

      {/* Apply Filters */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </button>

      {/* Reset Filters */}
      <button
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterComponent;