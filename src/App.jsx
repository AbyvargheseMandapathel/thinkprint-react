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
import { categories } from "./input/categories";
import AboutUsPage from "./pages/AboutUsPage";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ProductManagement from "./pages/admin/ProductManagement";

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
        // Fetch from the serverless API endpoint
        const response = await fetch('/api/products-api');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          const fetchedProducts = data.data || [];
          setProducts(fetchedProducts);
          
          // Get 4 random products for trending section
          const shuffled = [...fetchedProducts].sort(() => 0.5 - Math.random());
          setTrendingProducts(shuffled.slice(0, 4));
          
          // Get first 8 products for all products section
          setAllProducts(fetchedProducts.slice(0, 8));
        } else {
          setError(data.error || 'Failed to fetch products');
          // Fallback to empty arrays
          setTrendingProducts([]);
          setAllProducts([]);
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching products:', err);
        // Fallback to empty arrays
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

        <Navbar />
        {/* <NavMenu /> */}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroBannerStyle1 heroBanner={heroBanner} />
                {/* <Banner banners={banners} /> */}
                <CategoryCarousel categories={categories} />
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
                <BenefitsSection />
              </>
            }
          />

          <Route path="/products" element={<ProductListPage products={products} />} />

          <Route path="/urbangear" element={<ProductListPage products={products} />} />

          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path="/search" element={<SearchResult />} />

          <Route path="/category/:categoryName" element={<ProductListPage products={products} />} />

          <Route path="/contact" element={<ContactUsPage />} /> {/* New Contact Us Route */}

          <Route path="/about" element={<AboutUsPage />} />

          <Route path="/admin/categories" element={<CategoryManagement />} />
          
          {/* Updated Product Management Routes */}
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/products/new" element={<ProductManagement />} />
          <Route path="/admin/products/edit/:id" element={<ProductManagement />} />
        </Routes>

        <MobileNavigation />
        <Footer />
      </div>
    </Router>
  );
};

export default React.memo(App);
