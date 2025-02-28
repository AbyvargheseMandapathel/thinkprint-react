import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HeroBannerStyle1.css';

const HeroBanner = ({ heroBanner }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroBanner]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-banner">
      <Link 
        to={heroBanner[currentSlide].link} 
        className="hero-image-link"
        aria-label={heroBanner[currentSlide].altText || "Promotional banner"}
      >
        <img
          src={heroBanner[currentSlide].image}
          alt={heroBanner[currentSlide].altText || ""}
          className="hero-image"
          loading="lazy"
        />
      </Link>

      {/* Dots Indicator Only */}
      <div className="dots-container">
        {heroBanner.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;