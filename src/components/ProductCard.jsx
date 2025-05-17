import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  // Ensure product is defined with default values
  if (!product) {
    return null; // Return null if product is undefined
  }

  return (
    <Link 
      to={`/product/${product.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300"
      aria-label={`View details of ${product.title}`}
    >
      <div className="relative">
        <img
          src={product.image || product.img}
          alt={product.title || 'Product'}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300 ';
          }}
        />
        {product.offer && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.offer}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
          {product.title || 'Untitled Product'}
        </h3>
        
        {product.short_description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {typeof product.price === 'number' && (
          <p className="text-gray-700 font-semibold">₹{product.price.toFixed(2)}</p>
        )}
      </div>
    </Link>
  );
};

// Prop Types Validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    short_description: PropTypes.string,
    price: PropTypes.number,
    offer: PropTypes.string,
    image: PropTypes.string,
    img: PropTypes.string
  }).isRequired
};

export default ProductCard;