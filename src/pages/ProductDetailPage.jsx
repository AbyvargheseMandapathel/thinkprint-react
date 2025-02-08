import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data'; // Import the products array from data.js

const ProductDetailPage = () => {
    const { id } = useParams(); // Extract the product ID from the URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Find the product with the matching ID
        const selectedProduct = products.find((p) => p.id === parseInt(id));
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [id]);

    if (!product) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    // Ensure arrays are defined
    const images = product.images || [];
    const specifications = product.specifications || [];
    const colors = product.colors || [];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 mb-4">
                <a href="/" className="text-gray-500 hover:text-blue-600">Home</a>
                <span>></span>
                <a href={`/category/${product.category}`} className="text-gray-500 hover:text-blue-600">{product.category}</a>
                <span>></span>
                <span className="text-gray-500">{product.title}</span>
            </nav>

            {/* Product Image */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                {/* Main Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-96 object-cover rounded-lg my-4"
                    />
                    {/* Thumbnail Images */}
                    <div className="mt-4 flex space-x-2">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                    {/* Product Title */}
                    <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

                    {/* Product Description */}
                    <p className="text-gray-600 mt-4">{product.description}</p>

                    {/* Product Specifications */}
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold text-gray-800">Product Specifications:</h3>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            {specifications.map((spec, index) => (
                                <li key={index}>{spec}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Price */}
                    <p className="text-xl font-bold text-gray-800 mt-4">${product.price.toFixed(2)}</p>

                    {/* Add to Cart Section */}
                    <div className="mt-8">
                        <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            defaultValue="1"
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                        />

                        {/* Color Options */}
                        <div className="mt-4">
                            <label htmlFor="color" className="block text-gray-700 font-medium mb-2">
                                Color:
                            </label>
                            <select
                                id="color"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                            >
                                {colors.map((color, index) => (
                                    <option key={index} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;