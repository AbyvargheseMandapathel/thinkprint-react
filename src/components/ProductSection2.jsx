import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const ProductSection2 = ({ title, products }) => {
    const [sliderRef, setSliderRef] = useState(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        adaptiveHeight: true, 
        slidesToShow: 4,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const next = () => sliderRef?.slickNext();
    const previous = () => sliderRef?.slickPrev();

    return (
        <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={previous}
                        aria-label="Previous Item"
                        className="bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next Item"
                        className="bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <Slider ref={setSliderRef} {...settings}>
                {products.map((product, index) => {
                    const isHidden = index < 0; // Check if slide is hidden (adjust logic as needed)

                    return (
                        <div
                            key={index}
                            className="px-2"
                            aria-hidden={isHidden} // Only apply when necessary
                            tabIndex={isHidden ? -1 : 0} // Prevent focus on hidden elements
                        >
                            <Link
                                to={`/product/${product.id}`}
                                className="block hover:shadow-xl transition-transform duration-300 hover:scale-105"
                                aria-hidden={isHidden ? "true" : "false"} // Allow assistive tech to access visible slides
                                tabIndex={isHidden ? -1 : 0} // Remove focus from hidden elements
                            >
                                <div className="overflow-hidden p-4 flex flex-col h-full">
                                    {/* Product Image */}
                                    <div className="relative mb-3 overflow-hidden rounded-lg">
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="w-full h-72 object-cover transition-transform duration-300 hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/300'; 
                                            }}
                                        />
                                        {product.offer && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                {product.offer}
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h3>
                                        <p className="text-sm text-gray-500 truncate">{product.shortDescription}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default ProductSection2;
