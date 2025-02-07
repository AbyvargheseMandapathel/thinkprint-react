import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="mt-8 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 transition-colors`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;