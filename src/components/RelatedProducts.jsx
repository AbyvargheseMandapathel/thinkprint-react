import React from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;