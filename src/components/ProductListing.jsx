import React, { useState } from 'react';

const ProductListing = ({ products, title }) => {
    const [activeTab, setActiveTab] = useState('All Products');

    // Filter products based on the active tab
    const filteredProducts = products.filter(product =>
        activeTab === 'All Products' || product.category === activeTab
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Section Heading */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>

            {/* Tabs */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => setActiveTab('All Products')}
                    className={`px-4 py-2 mr-2 text-gray-700 rounded-lg ${activeTab === 'All Products' ? 'bg-gray-200' : ''}`}
                >
                    All Products
                </button>
                <button
                    onClick={() => setActiveTab('Man')}
                    className={`px-4 py-2 mr-2 text-gray-700 rounded-lg ${activeTab === 'Man' ? 'bg-gray-200' : ''}`}
                >
                    Man
                </button>
                <button
                    onClick={() => setActiveTab('Women')}
                    className={`px-4 py-2 mr-2 text-gray-700 rounded-lg ${activeTab === 'Women' ? 'bg-gray-200' : ''}`}
                >
                    Women
                </button>
                <button
                    onClick={() => setActiveTab('Electronics')}
                    className={`px-4 py-2 mr-2 text-gray-700 rounded-lg ${activeTab === 'Electronics' ? 'bg-gray-200' : ''}`}
                >
                    Electronics
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 overflow-hidden transition duration-300 hover:bg-gray-100">
                        {/* Product Image */}
                        <div className="relative mb-4 overflow-hidden">
                            <img
                                src={product.img}
                                alt={product.title}
                                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {product.bestDeal && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                    BEST DEALS
                                </div>
                            )}
                        </div>

                        {/* Product Title */}
                        <h3 className="text-lg font-bold mb-2">{product.title}</h3>

                        {/* Product Price */}
                        <p className="text-gray-600 mb-2">${product.price}</p>

                        {/* Product Rating */}
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 fill-current text-yellow-500 mr-1`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({product.ratingCount})</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;