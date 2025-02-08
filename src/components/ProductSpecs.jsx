import React from 'react';

const ProductSpecs = ({ specifications }) => {
    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Product Specifications:</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
                {specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductSpecs;