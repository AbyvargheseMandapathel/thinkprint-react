import React from "react";

const Header = ({ name, price }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
      <p className="text-xl text-gray-600">${price.toFixed(2)}</p>
    </div>
  );
};

export default Header;