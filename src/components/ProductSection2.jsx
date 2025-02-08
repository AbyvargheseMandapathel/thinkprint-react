import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ProductSection2 = ({ title, products }) => {
    const [sliderRef, setSliderRef] = useState(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Show 4 cards in a row for desktop
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1, // Show 1 card in a row for mobile
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const next = () => {
        sliderRef.slickNext();
    };

    const previous = () => {
        sliderRef.slickPrev();
    };

    return (
        <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={previous}
                        className="bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className="bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Slider */}
            <Slider ref={setSliderRef} {...settings}>
                {products.map((product, index) => (
                    <div key={index} className="px-2">
                        {/* Wrap the entire product card with Link */}
                        <Link
                            to={`/product/${product.id}`} // Navigate to the product detail page
                            className="block"
                        >
                            <div
                                className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                                style={{ height: '100%' }}
                            >
                                {/* Product Image */}
                                <div className="relative mb-4 overflow-hidden rounded-lg">
                                    <img
                                        src={product.img}
                                        alt={product.title}
                                        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                                        onError={(e) => {
                                            console.error(`Image failed to load: ${product.img}`);
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300'; // Fallback image
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                        {product.offer}
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="flex flex-col justify-between h-full">
                                    <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                                    {/* Replaced "View Details" Button */}
                                    <div className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
                                        Shop Now
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductSection2;