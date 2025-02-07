import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductSection = ({ title, products }) => {
    const [sliderRef, setSliderRef] = useState(null);

    const settings = {
        dots: false, // Remove dots
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Show 5 cards in a row for desktop
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 2, // Show 2 cards in a row for mobile
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
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={previous}
                        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Slider */}
            <Slider ref={setSliderRef} {...settings}>
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="px-2"
                    >
                        <div
                            className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            style={{ height: '100%' }}
                        >
                            {/* Product Image */}
                            <div className="relative mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                                    onError={(e) => {
                                        console.error(`Image failed to load: ${product.img}`);
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/300'; // Fallback image
                                    }}
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-grow flex flex-col justify-between">
                                <h3 className="text-base font-semibold text-gray-800 mb-2">{product.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductSection;