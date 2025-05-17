import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import HeroBannerStyle1 from "./components/HeroBannerStyle1";
import CategoryCarousel from "./components/CategoryCarousel";
import ProductSection2 from "./components/ProductSection2";
import ProductListing from "./components/ProductListing";
import MobileNavigation from "./components/MobileNavigation";
import BenefitsSection from "./components/BenefitsSection";
import Footer from "./components/Footer";
import ProductListPage from "./pages/ProductListPage";
import SearchResult from "./pages/SearchResult";
import { heroBanner, announcementMessage } from "./input/data";
import { generateBreadcrumbs } from "./utils/breadcrumbUtils";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactUsPage from "./pages/ContactUsPage";
import "./theme.css";
// import { categories } from "./input/categories";
import AboutUsPage from "./pages/AboutUsPage";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import ProductCard from "./components/ProductCard";

const App = () => {
  const breadcrumbs = generateBreadcrumbs("category", "All Products");
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products-api');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const fetchedProducts = data.data;
          setProducts(fetchedProducts);

          // Get 4 random trending products
          const shuffled = [...fetchedProducts].sort(() => 0.5 - Math.random());
          setTrendingProducts(shuffled.slice(0, 4));

          // Get first 8 products for All Products section
          setAllProducts(fetchedProducts.slice(0, 8));
        } else {
          setError(data.message || 'Failed to fetch products');
          setTrendingProducts([]);
          setAllProducts([]);
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching products:', err);
        setTrendingProducts([]);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="font-[var(--font-primary)] bg-[var(--background-color)]">
        {/* Announcement Bar */}
        <AnnouncementBar message={announcementMessage} />

        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Banner */}
                <HeroBannerStyle1 heroBanner={heroBanner} />

                {/* Category Carousel - Ensure categories is not undefined */}
                <CategoryCarousel categories={categories || []} />

                {/* Trending & All Products Section */}
                <section className="container mx-auto px-4 py-12">
                  {loading ? (
                    <p className="text-center">Loading products...</p>
                  ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                  ) : (
                    <>
                      <ProductSection2 title="Trending Products" products={trendingProducts} />
                      <ProductListing title="All Products" products={allProducts} />
                    </>
                  )}
                </section>

                {/* Benefits Section */}
                <BenefitsSection />
              </>
            }
          />

          {/* Other Routes */}
          <Route path="/products" element={<ProductListPage products={products.filter(p => p && p.is_urbangear === 0) || []} />} />
          <Route path="/urbangear" element={<ProductListPage products={products.filter(p => p && p.is_urbangear === 1) || []} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/category/:categoryName" element={<ProductListPage products={products} />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/products/new" element={<ProductManagement />} />
          <Route path="/admin/products/edit/:id" element={<ProductManagement />} />
        </Routes>

        {/* Mobile Nav & Footer */}
        <MobileNavigation />
        <Footer />
      </div>
    </Router>
  );
};

export default React.memo(App);