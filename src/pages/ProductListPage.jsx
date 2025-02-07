import React, { useState } from "react";
import FilterComponent from "../components/FilterComponent";
import MobileFilterButton from "../components/MobileFilterButton";
import ProductLayout from "../components/ProductLayout";
import { products } from "../data";
import { generateBreadcrumbs } from "../utils/breadcrumbUtils";
import "../index.css";

const ProductListPage = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle Filtering Logic
  const handleFilter = (category, priceRange) => {
    let filtered = products;

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

  // Generate breadcrumbs dynamically
  const selectedCategory = "Electronics"; // Example: Replace with actual category logic
  const breadcrumbs = generateBreadcrumbs(selectedCategory);

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
          title="Shop Left Sidebar"
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