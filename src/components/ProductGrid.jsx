import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link 
          key={product.id} 
          to={`/product/${product.id}`} // ✅ Navigates to the product page
          className="bg-white rounded-lg shadow-md p-4 overflow-hidden transition-transform duration-300 hover:scale-105 block"
        >
          {/* Product Image */}
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-64 object-cover mb-4 transition-transform duration-300 hover:scale-105"
          />
          {/* Product Title */}
          <h3 className="text-lg font-bold mb-2">{product.title}</h3>
          {/* Product Price */}
          {/* <p className="text-gray-600 mb-2">${product.price}</p> */}
          {/* Product Description */}
          <p className="text-sm text-gray-500">{product.shortDescription}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
