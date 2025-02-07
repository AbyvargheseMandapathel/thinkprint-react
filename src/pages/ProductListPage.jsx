import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import FilterComponent from "../components/FilterComponent";
import MobileFilterButton from "../components/MobileFilterButton";
import ProductLayout from "../components/ProductLayout";
import "../index.css";

const ProductListPage = ({ products: allProducts = [], breadcrumbs = [] }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All"; // Get the category from the query parameter

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory); // Initialize with the query parameter
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Memoized Filtering Logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    return filtered;
  }, [allProducts, selectedCategory, priceRange]);

  // Pagination Logic
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Handle Filtering Logic
  const handleFilter = (category, range) => {
    setSelectedCategory(category); // Update the selected category
    setPriceRange(range); // Update the price range
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Dynamically Generate Title
  const title = selectedCategory === "All" ? "All Products" : `${selectedCategory} Products`;

  // Handle Pagination Navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="font-[Poppins] bg-gray-50">
      {/* Mobile Filter Button */}
      <MobileFilterButton
        filtersVisible={filtersVisible}
        toggleFilters={() => setFiltersVisible(!filtersVisible)}
      />
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
        {/* Product Layout */}
        <ProductLayout
          title={title} // Dynamically update the title
          breadcrumbs={breadcrumbs}
          products={paginatedProducts}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductListPage;