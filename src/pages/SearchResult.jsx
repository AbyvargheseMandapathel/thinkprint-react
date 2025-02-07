import React from "react";
import { useLocation } from "react-router-dom";
import ProductListPage from "./ProductListPage";
import { generateBreadcrumbs } from "../utils/breadcrumbUtils";
import { categories, products } from "../data"; // Use `products` instead of `recommendedProducts`

const SearchResult = () => {
  // Get the search query from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  // Filter categories and products based on the search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );

  // Generate breadcrumbs for the search page
  const breadcrumbs = generateBreadcrumbs("search");

  return (
    <ProductListPage
      title={`Search Results for "${query}"`}
      products={filteredProducts} // Pass the filtered products
      breadcrumbs={breadcrumbs}
    />
  );
};

export default SearchResult;