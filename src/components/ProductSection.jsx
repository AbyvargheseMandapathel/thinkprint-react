import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductSection = ({ title, products }) => {
    const [sliderRef, setSliderRef] = useState(null);

    // Filter only recommended products
    const recommendedProducts = products.filter(product => product.recommended === true);

    if (recommendedProducts.length === 0) return null; // Hide if no recommended products

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex space-x-4">
                    <button onClick={() => sliderRef.slickPrev()} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full">←</button>
                    <button onClick={() => sliderRef.slickNext()} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full">→</button>
                </div>
            </div>

            <Slider ref={setSliderRef} {...settings}>
                {recommendedProducts.map((product, index) => (
                    <div key={index} className="px-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col hover:scale-105 transition-transform duration-300">
                            <div className="relative mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                                    onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="text-green-500 font-semibold">{product.offer}</p>
                                <p className="text-gray-700">₹{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductSection;
