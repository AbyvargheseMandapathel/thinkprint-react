import React from "react";

const Reviews = ({ reviews }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <p className="text-gray-700">{review.text}</p>
              <p className="text-sm text-gray-500">— {review.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;