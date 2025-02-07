// Utility function to generate dynamic breadcrumbs
export const generateBreadcrumbs = (pageType, category = null, productName = null) => {
    const baseBreadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
    ];
  
    switch (pageType) {
      case "search":
        // For search pages: Home > Products
        return baseBreadcrumbs;
  
      case "category":
        // For category pages: Home > Products > Category Name
        if (!category) return baseBreadcrumbs; // Fallback if no category is provided
        return [
          ...baseBreadcrumbs,
          { label: category, href: `/products?category=${encodeURIComponent(category)}` },
        ];
  
      case "product":
        // For product pages: Home > Products > Category Name > Product Name
        if (!category || !productName) return baseBreadcrumbs; // Fallback if missing data
        return [
          ...baseBreadcrumbs,
          { label: category, href: `/products?category=${encodeURIComponent(category)}` },
          { label: productName, href: null }, // No link for the last item
        ];
  
      default:
        // Default fallback
        return baseBreadcrumbs;
    }
  };