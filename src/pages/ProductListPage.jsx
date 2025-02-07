import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterComponent from "../components/FilterComponent";
import { recommendedProducts } from "../data";
import "../index.css";

const ProductListPage = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(recommendedProducts);

  // Handle Filtering Logic
  const handleFilter = (category, priceRange) => {
    let filtered = recommendedProducts;

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate the products to display based on the current page
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle Pagination Navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="font-[Poppins] bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-center mb-2">Shop Left Sidebar</h2>
        <nav className="flex justify-center space-x-2 text-sm text-gray-500">
          <a href="/">Home</a>
          <span>></span>
          <a href="/products">Shop</a>
        </nav>
      </div>

      {/* Mobile Filter Button */}
      <button
        className="md:hidden block w-full py-4 bg-blue-600 text-white font-bold text-center"
        onClick={() => setFiltersVisible(!filtersVisible)}
      >
        {filtersVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Filters (Left Side on Desktop, Below Navbar on Mobile) */}
        {(filtersVisible || window.innerWidth >= 768) && (
          <div className="hidden md:block">
            <FilterComponent onFilter={handleFilter} />
          </div>
        )}
        {filtersVisible && window.innerWidth < 768 && (
          <div className="block md:hidden">
            <FilterComponent onFilter={handleFilter} />
          </div>
        )}

        {/* Product Grid and Pagination Container */}
        <div className="w-full">
          {/* Check if there are any products to display */}
          {paginatedProducts.length > 0 ? (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md p-4 overflow-hidden transition-transform duration-300 hover:scale-105">
                    {/* Product Image */}
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-64 object-cover mb-4 transition-transform duration-300 hover:scale-105"
                    />
                    {/* Product Title */}
                    <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                    {/* Product Price */}
                    <p className="text-gray-600 mb-2">${product.price}</p>
                    {/* Product Description */}
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 transition-colors`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center mt-8">
              <p className="text-xl text-gray-600">No products match your search result.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;