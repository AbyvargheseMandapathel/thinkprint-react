import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductListing = ({ products, title }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Products");

  const filteredProducts = activeTab === "All Products"
    ? products
    : products.filter(p => p.category_name === activeTab);

  const limitedProducts = filteredProducts.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab("All Products")}
          className={`px-4 py-2 rounded-lg ${activeTab === "All Products" ? "bg-gray-200" : "hover:bg-gray-100"}`}
        >
          All Products
        </button>
        {[...new Set(products.map(p => p.category_name))].map(category => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-lg ${activeTab === category ? "bg-gray-200" : "hover:bg-gray-100"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {limitedProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-gray-600 truncate">{product.short_description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {filteredProducts.length > 8 && (
        <div className="mt-6 text-center">
          <a href="/products" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View More
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductListing;