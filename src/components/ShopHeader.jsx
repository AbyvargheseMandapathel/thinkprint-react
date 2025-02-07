import React from "react";

const ShopHeader = ({ title, breadcrumbs = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>

      {/* Breadcrumb Navigation */}
      <nav className="flex justify-center space-x-2 text-sm text-gray-500">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {/* Link or Text */}
            {item.href ? (
              <a href={item.href} className="hover:underline">
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
            {/* Separator (if not the last item) */}
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default ShopHeader;