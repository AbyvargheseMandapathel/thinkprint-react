import React from "react";
import { useLocation } from "react-router-dom";
import ProductLayout from "../components/ProductLayout";
import { generateBreadcrumbs } from "../utils/breadcrumbUtils";
import { categories, recommendedProducts } from "../data";

const SearchResult = () => {
  // Get the search query from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  // Filter categories and products based on the search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = recommendedProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );

  // Combine results (categories + products)
  const searchResults = [...filteredCategories, ...filteredProducts];

  // Pagination Logic
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentPage = 1; // For simplicity, we show only the first page of results

  const paginatedProducts = filteredProducts.slice(0, itemsPerPage);

  // Generate breadcrumbs for the search page
  const breadcrumbs = generateBreadcrumbs("search");

  return (
    <div className="font-[Poppins] bg-gray-50">
      {/* Product Layout */}
      <ProductLayout
        title={`Search Results for "${query}"`}
        breadcrumbs={breadcrumbs}
        products={paginatedProducts}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default SearchResult;