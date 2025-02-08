import React from "react";

const Description = ({ description }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Description</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Description;