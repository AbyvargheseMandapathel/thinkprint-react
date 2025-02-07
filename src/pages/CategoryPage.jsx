import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopHeader from "../components/ShopHeader";
import { generateBreadcrumbs } from "../utils/breadcrumbUtils";

const CategoryPage = ({ category }) => {
  // Generate breadcrumbs for the category page
  const breadcrumbs = generateBreadcrumbs("category", category);

  return (
    <div className="font-[Poppins] bg-gray-50">

      {/* Shop Header */}
      <ShopHeader title={category} breadcrumbs={breadcrumbs} />

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

        {/* Product Grid and Pagination Container */}
        <div className="w-full">
          {/* Check if there are any products to display */}
          {paginatedProducts.length > 0 ? (
            <>
              {/* Product Grid */}
              <ProductGrid products={paginatedProducts} />

              {/* Pagination */}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
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