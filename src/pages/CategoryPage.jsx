import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopHeader from "../components/ShopHeader";
import { generateBreadcrumbs } from "../utils/breadcrumbUtils";
import MobileFilterButton from "../components/MobileFilterButton";
import FilterComponent from "../components/FilterComponent";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import NoProductsMessage from "../components/NoProductsMessage";

const CategoryPage = ({ category }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs("category", category);

  // Dummy products array (replace with API data)
  const products = []; 
  const paginatedProducts = products.slice(0, 10);
  const totalPages = Math.ceil(products.length / 10);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className="font-[var(--font-primary)] bg-[var(--categorypage-background-color)]"
      style={{
        color: "var(--categorypage-text-color)",
      }}
    >

      {/* Shop Header */}
      <ShopHeader title={category} breadcrumbs={breadcrumbs} />

      {/* Mobile Filter Button */}
      <MobileFilterButton
        filtersVisible={filtersVisible}
        toggleFilters={() => setFiltersVisible(!filtersVisible)}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Filters */}
        {filtersVisible && (
          <div className="block md:hidden">
            <FilterComponent />
          </div>
        )}
        <div className="hidden md:block">
          <FilterComponent />
        </div>

        {/* Product Grid */}
        <div className="w-full">
          {paginatedProducts.length > 0 ? (
            <>
              <ProductGrid products={paginatedProducts} />
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </>
          ) : (
            <NoProductsMessage />
          )}
        </div>
      </div>

    </div>
  );
};

export default CategoryPage;