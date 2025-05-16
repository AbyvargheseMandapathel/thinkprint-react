import React, { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../input/categories";

const FilterComponent = ({ onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const navigate = useNavigate();

  // Correctly defined mainCategories array
  const mainCategories = ["All", ...categories.map(c => c.name)];

  const handleApplyFilters = () => {
    onFilter({
      category: selectedCategory,
      subcategories: selectedSubcategories,
      priceRange
    });

    const queryParams = new URLSearchParams();
    if (selectedCategory !== "All") queryParams.set("category", selectedCategory);
    if (selectedSubcategories.length > 0) queryParams.set("sub", selectedSubcategories.join(","));
    
    navigate(`/products?${queryParams.toString()}`, { replace: true });
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedSubcategories([]);
    setPriceRange([0, 5000]);
    onFilter({ category: "All", subcategories: [], priceRange: [0, 5000] });
    navigate("/products", { replace: true });
  };

  const toggleSubcategory = (subId) => {
    setSelectedSubcategories(prev => 
      prev.includes(subId) 
        ? prev.filter(id => id !== subId) 
        : [...prev, subId]
    );
  };

  const currentSubcategories = categories.find(c => c.name === selectedCategory)?.subcategories || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Main Categories Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Product Categories</h3>
        <ul className="space-y-2">
          {mainCategories.map(category => (
            <li key={category}>
              <label className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors
                ${selectedCategory === category ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}>
                <input
                  type="radio"
                  name="main-category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => {
                    setSelectedCategory(category);
                    setSelectedSubcategories([]);
                  }}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-3 text-gray-700">{category}</span>
              </label>

              {/* Subcategories List */}
              {category !== "All" && selectedCategory === category && (
                <div className="ml-8 mt-2 space-y-2">
                  {currentSubcategories.map(sub => (
                    <div
                      key={sub.id}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleSubcategory(sub.id)}
                    >
                      <div className={`w-4 h-4 flex items-center justify-center border-2 rounded-sm mr-2 transition-colors
                        ${selectedSubcategories.includes(sub.id) 
                          ? "bg-blue-600 border-blue-600" 
                          : "border-gray-300"}`}>
                        {selectedSubcategories.includes(sub.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M3.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 10.586 3.707 9.293z"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-600">{sub.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter Section */}
      {/* <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Price Range</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, e.target.value])}
            className="w-full range-slider"
          />
        </div>
      </div> */}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-medium
                   hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="w-full border-2 border-gray-300 text-gray-600 py-3 rounded-lg font-medium
                   hover:border-gray-400 hover:text-gray-700 transition-all"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;