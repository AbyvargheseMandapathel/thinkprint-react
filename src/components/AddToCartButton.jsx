import React from "react";

const AddToCartButton = ({ productId }) => {
  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <button
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;