export const generateBreadcrumbs = (pageType, category = null) => {
  const baseBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  switch (pageType) {
    case "search":
      return baseBreadcrumbs;

    case "category":
      if (!category) return baseBreadcrumbs; 
      return [
        ...baseBreadcrumbs,
        { label: category, href: `/category/${encodeURIComponent(category)}` }, // ✅ Updated route
      ];

    case "product":
      if (!category) return baseBreadcrumbs;
      return [
        ...baseBreadcrumbs,
        { label: category, href: `/category/${encodeURIComponent(category)}` }, // ✅ Updated route
        { label: "Product Details", href: null }, 
      ];

    default:
      return baseBreadcrumbs;
  }
};
