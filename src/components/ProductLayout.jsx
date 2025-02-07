import React from "react";
import ShopHeader from "./ShopHeader";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import NoProductsMessage from "./NoProductsMessage";

const ProductLayout = ({
  title,
  breadcrumbs,
  products,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="font-[Poppins] bg-gray-50">
      {/* Shop Header */}
      <ShopHeader title={title} breadcrumbs={breadcrumbs} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Check if there are any products to display */}
        {products.length > 0 ? (
          <>
            {/* Product Grid */}
            <ProductGrid products={products} />
            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <NoProductsMessage />
        )}
      </div>
    </div>
  );
};

export default ProductLayout;