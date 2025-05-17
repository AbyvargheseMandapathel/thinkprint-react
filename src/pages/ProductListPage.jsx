import React, { useState, useMemo, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FilterComponent from "../components/FilterComponent";
import MobileFilterButton from "../components/MobileFilterButton";
import ProductLayout from "../components/ProductLayout";
import "../index.css";

const ProductListPage = ({ products: allProducts = [] }) => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName ? decodeURIComponent(categoryName) : "All"
  );
  // Add state for window width
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Update window width on resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Update category state when URL changes
  useEffect(() => {
    setSelectedCategory(categoryName ? decodeURIComponent(categoryName) : "All");
  }, [categoryName]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, query, priceRange]);

  // Memoized Filtering Logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts || [];
    
    console.log("All products:", allProducts); // Debug log

    // Filter by category first
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product && product.category && 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Then filter by search query
    if (query) {
      filtered = filtered.filter((product) =>
        product && product.title && 
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Finally filter by price range
    filtered = filtered.filter(
      (product) => product && 
      (typeof product.price === 'number' || typeof product.price === 'undefined') && 
      (!product.price || (product.price >= priceRange[0] && product.price <= priceRange[1]))
    );
    
    console.log("Filtered products:", filtered); // Debug log
    return filtered;
  }, [allProducts, selectedCategory, query, priceRange]);

  // Pagination Logic
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Handle Filter Changes - Updated to match FilterComponent's parameter structure
  const handleFilter = (filterData) => {
    if (filterData.priceRange) {
      setPriceRange(filterData.priceRange);
    }

    if (filterData.category && filterData.category !== selectedCategory) {
      setSelectedCategory(filterData.category);
      navigate(filterData.category === "All" ? "/products" : `/category/${encodeURIComponent(filterData.category)}`);
    }
  };

  // Dynamic Title
  const title = query
    ? `Search Results for "${query}"`
    : selectedCategory === "All"
    ? "All Products"
    : `${selectedCategory} Products`;

  // Breadcrumbs
  const breadcrumbs = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      ...(selectedCategory !== "All"
        ? [{ label: selectedCategory, href: `/category/${encodeURIComponent(selectedCategory)}` }]
        : []),
    ],
    [selectedCategory]
  );

  // Handle Pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return (
    <div className="font-[var(--font-primary)] bg-[var(--productlistpage-background-color)]">
      <MobileFilterButton
        filtersVisible={filtersVisible}
        toggleFilters={() => setFiltersVisible(!filtersVisible)}
      />

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Filters Section */}
        {(filtersVisible || windowWidth >= 768) && (
          <div className="hidden md:block">
            <FilterComponent onFilter={handleFilter} />
          </div>
        )}

        {filtersVisible && windowWidth < 768 && (
          <div className="block md:hidden">
            <FilterComponent onFilter={handleFilter} />
          </div>
        )}

        {/* Product Layout */}
        <ProductLayout
          title={title}
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
