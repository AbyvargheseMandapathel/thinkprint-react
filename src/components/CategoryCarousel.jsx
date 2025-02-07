import React, { useEffect, useState } from 'react';

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    { id: 1, name: 'Visiting Cards', img: 'https://picsum.photos/200/200?random=1' },
    { id: 2, name: 'Custom Polo T-shirts', img: 'https://picsum.photos/200/200?random=2' },
    { id: 3, name: 'Office Shirts', img: 'https://picsum.photos/200/200?random=3' },
    { id: 4, name: 'Custom T-shirts', img: 'https://picsum.photos/200/200?random=4' },
    { id: 5, name: 'Custom Stamps & Ink', img: 'https://picsum.photos/200/200?random=5' },
    { id: 6, name: 'Photo Gifts', img: 'https://picsum.photos/200/200?random=6' },
    { id: 7, name: 'Labels, Stickers & Packaging', img: 'https://picsum.photos/200/200?random=7' },
    { id: 8, name: 'Custom Stationery', img: 'https://picsum.photos/200/200?random=8' },
    { id: 9, name: 'Signs, Posters & Marketing Materials', img: 'https://picsum.photos/200/200?random=9' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <main className="container mx-auto px-4 max-w-7xl py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Explore All Categories</h2>
      <div className="category-carousel relative">
        <div className="carousel-track flex" style={{ transform: `translateX(-${currentIndex * 136}px)` }}>
          {items.concat(items).map((item, index) => (
            <div key={index} className="category-item">
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryCarousel;
