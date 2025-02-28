// HeroBanner.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import '../assets/styles/HeroBanner.css';

const HeroBanner = ({ heroBanner }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroBanner]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBannerClick = () => {
    navigate(heroBanner[currentSlide].link); // Use navigate
  };

  return (
    <div className="hero-container">
      <div 
        className="hero-slider"
        onClick={handleBannerClick}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroBanner[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-text">
          <h1>{heroBanner[currentSlide].title}</h1>
          <p>{heroBanner[currentSlide].description}</p>
          <Link 
            to={heroBanner[currentSlide].link}
            className="hero-button"
          >
            {heroBanner[currentSlide].buttonText}
          </Link>
        </div>
        
        <div className="indicator-container">
          {heroBanner.map((_, index) => (
            <button 
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;