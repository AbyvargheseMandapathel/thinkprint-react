import React, { useState, useMemo, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FilterComponent from "../components/FilterComponent";
import MobileFilterButton from "../components/MobileFilterButton";
import ProductLayout from "../components/ProductLayout";

const ProductListPage = ({ products: allProducts = [] }) => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const subParam = searchParams.get("sub");
  const categoryParam = decodeURIComponent(categoryName || searchParams.get("category") || "All");

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubcategories, setSelectedSubcategories] = useState(subParam ? subParam.split(",").map(Number) : []);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategories, priceRange]);

  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSelectedSubcategories(subParam ? subParam.split(",").map(Number) : []);
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category_name?.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(Number(p.subcategory_id)));
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.short_description && p.short_description.toLowerCase().includes(q))
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    return result;
  }, [allProducts, selectedCategory, selectedSubcategories, query, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / 9);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * 9;
    return filteredProducts.slice(start, start + 9);
  }, [filteredProducts, currentPage]);

  const handleFilter = (filters) => {
    const { category, subcategories } = filters;

    const params = new URLSearchParams(location.search);
    if (category === "All") {
      params.delete("category");
      params.delete("sub");
    } else {
      params.set("category", encodeURIComponent(category));
      if (subcategories.length > 0) {
        params.set("sub", subcategories.join(","));
      } else {
        params.delete("sub");
      }
    }

    navigate(`/products?${params.toString()}`, { replace: true });
  };

  const title = query
    ? `Search Results for "${query}"`
    : selectedCategory === "All"
    ? "All Products"
    : `${selectedCategory} Products`;

  const breadcrumbs = useMemo(() => {
    const crumbs = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" }
    ];
    if (selectedCategory !== "All") {
      crumbs.push({ label: selectedCategory, href: `/category/${encodeURIComponent(selectedCategory)}` });
    }
    return crumbs;
  }, [selectedCategory]);

  return (
    <div className="font-[var(--font-primary)] bg-[var(--productlistpage-background-color)]">
      <MobileFilterButton
        filtersVisible={filtersVisible}
        toggleFilters={() => setFiltersVisible(!filtersVisible)}
      />

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Filters */}
        {(filtersVisible || window.innerWidth >= 768) && (
          <div className="hidden md:block">
            <FilterComponent
              onFilter={handleFilter}
              initialCategory={selectedCategory}
              initialSubcategories={selectedSubcategories}
            />
          </div>
        )}

        {filtersVisible && window.innerWidth < 768 && (
          <div className="block md:hidden">
            <FilterComponent
              onFilter={handleFilter}
              initialCategory={selectedCategory}
              initialSubcategories={selectedSubcategories}
            />
          </div>
        )}

        {/* Layout */}
        <ProductLayout
          title={title}
          breadcrumbs={breadcrumbs}
          products={paginatedProducts}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductListPage;