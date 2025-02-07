import React, { useState } from "react";
import { categories } from "../data"; // Import categories from data.js

const FilterComponent = ({ onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Extract category names and include "All" as the first option
  const categoryOptions = ["All", ...categories.map((category) => category.name)];

  // Trigger Filtering Logic
  const handleApplyFilters = () => {
    onFilter(selectedCategory, priceRange);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="text-lg font-bold mb-4">Categories</h4>
        <ul className="space-y-2">
          {categoryOptions.map((category) => (
            <li key={category}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="mr-2"
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div>
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
      </div>

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
        onClick={() => {
          setSelectedCategory("All");
          setPriceRange([0, 5000]);
          onFilter("All", [0, 5000]); // Reset filters
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterComponent;