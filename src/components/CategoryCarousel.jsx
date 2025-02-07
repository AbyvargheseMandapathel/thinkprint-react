import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Ensure categories are provided; if not, use a fallback empty array
  const items = categories || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  // Handle Carousel Item Click
  const handleCategoryClick = (categoryName) => {
    // Navigate to /products with the selected category as a query parameter
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <main className="container mx-auto px-4 max-w-7xl py-12">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-8">Explore All Categories</h2>
      {/* Carousel Container */}
      <div className="category-carousel relative overflow-hidden">
        <div
          className="carousel-track flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 136}px)` }}
        >
          {items.concat(items).map((item, index) => (
            <div
              key={index}
              className="category-item min-w-[136px] p-2 cursor-pointer"
              onClick={() => handleCategoryClick(item.name)} // Make the item clickable
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-sm font-medium text-center mt-2">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryCarousel;