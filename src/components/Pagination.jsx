import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start <= 1) {
      start = 2;
      end = Math.min(start + 4, totalPages - 1);
    } else if (end >= totalPages - 1) {
      end = totalPages - 1;
      start = Math.max(end - 4, 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="mt-8 flex justify-center">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-4 py-2 rounded-lg ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-600 transition-colors`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;