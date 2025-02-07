import React from "react";

const MobileFilterButton = ({ filtersVisible, toggleFilters }) => {
  return (
    <button
      className="md:hidden block w-full py-4 bg-blue-600 text-white font-bold text-center"
      onClick={toggleFilters}
    >
      {filtersVisible ? "Hide Filters" : "Show Filters"}
    </button>
  );
};

export default MobileFilterButton;