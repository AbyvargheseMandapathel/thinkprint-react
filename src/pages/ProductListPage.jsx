import React, { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import FilterComponent from "../components/FilterComponent";
import MobileFilterButton from "../components/MobileFilterButton";
import ProductLayout from "../components/ProductLayout";
import "../index.css";

const ProductListPage = ({ products: allProducts = [], breadcrumbs = [] }) => {
  const { categoryName } = useParams(); // ✅ Get category from URL params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || ""; // ✅ Get search query from URL

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "All");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Memoized Filtering Logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // If searching, filter by search query
    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (!query && selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    return filtered;
  }, [allProducts, selectedCategory, priceRange, query]);

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
    setSelectedCategory(category);
    setPriceRange(range);
    setCurrentPage(1);
  };

  // ✅ Update Title based on Search or Category
  const title = query
    ? `Search Results for "${query}"`
    : selectedCategory === "All"
    ? "All Products"
    : `${selectedCategory} Products`;

  // Handle Pagination Navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="font-[var(--font-primary)] bg-[var(--productlistpage-background-color)]">
      {/* Mobile Filter Button */}
      <MobileFilterButton
        filtersVisible={filtersVisible}
        toggleFilters={() => setFiltersVisible(!filtersVisible)}
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Filters Section */}
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
          title={title} // ✅ Updated Title
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            ...(selectedCategory !== "All" && !query
              ? [{ label: selectedCategory, href: `/category/${encodeURIComponent(selectedCategory)}` }]
              : []),
          ]}
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
