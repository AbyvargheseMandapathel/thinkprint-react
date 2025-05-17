import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FilterComponent = ({ onFilter, initialCategory = "All", initialSubcategories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategories, setSelectedSubcategories] = useState(initialSubcategories);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  // Load categories
  useEffect(() => {
    fetch('/api/categories-api')
      .then(res => res.json())
      .then(data => setCategories(data.data || []))
      .catch(err => console.error(err));
  }, []);

  // Load subcategories when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setSubcategories([]);
      return;
    }

    const categoryId = categories.find(c => c.name === selectedCategory)?.id;
    if (!categoryId) return;

    fetch(`/api/subcategories-api?category_id=${categoryId}`)
      .then(res => res.json())
      .then(data => setSubcategories(data.data || []))
      .catch(err => console.error(err));
  }, [selectedCategory, categories]);

  const toggleSubcategory = (id) => {
    setSelectedSubcategories(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }

    if (selectedSubcategories.length > 0) {
      params.set("sub", selectedSubcategories.join(","));
    }

    navigate(`?${params.toString()}`);
    onFilter({
      category: selectedCategory,
      subcategories: selectedSubcategories,
      priceRange
    });
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSubcategories([]);
    setPriceRange([0, 5000]);
    navigate("/products");
    onFilter({ category: "All", subcategories: [], priceRange: [0, 5000] });
  };

  const mainCategories = ["All", ...categories.map(c => c.name)];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Product Categories</h3>
      <ul className="space-y-2">
        {mainCategories.map(category => (
          <li key={category}>
            <label className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="category"
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

            {category !== "All" && selectedCategory === category && (
              <div className="ml-8 mt-2 space-y-2">
                {subcategories.length > 0 ? (
                  subcategories.map(sub => (
                    <div
                      key={sub.id}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleSubcategory(sub.id)}
                    >
                      <div className={`w-4 h-4 border rounded mr-2 ${
                        selectedSubcategories.includes(sub.id)
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}></div>
                      <span className="text-gray-600">{sub.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 pl-6">No subcategories found.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Price Range</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full range-slider"
        />
      </div>

      <div className="space-y-3">
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg font-medium hover:border-gray-400 hover:text-gray-700"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;