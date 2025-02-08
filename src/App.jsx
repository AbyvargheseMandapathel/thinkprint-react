import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // Import the new component
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import CategoryCarousel from "./components/CategoryCarousel";
import ProductSection2 from "./components/ProductSection2";
import ProductListing from "./components/ProductListing";
import MobileNavigation from "./components/MobileNavigation";
import BenefitsSection from "./components/BenefitsSection";
import Footer from "./components/Footer";
import ProductListPage from "./pages/ProductListPage";
import SearchResult from "./pages/SearchResult";
import { banners, categories, products } from "./data";
import { generateBreadcrumbs } from "./utils/breadcrumbUtils";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  const breadcrumbs = generateBreadcrumbs("category", "All Products");

  return (
    <Router>
      <ScrollToTop /> {/* ✅ This ensures scrolling to top on route change */}
      <div className="font-[Poppins] bg-gray-50">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner banners={banners} />
                <CategoryCarousel categories={categories} />
                <section className="container mx-auto px-4 py-12">
                  <ProductSection2 title="Recommended Items (New Design)" products={products} />
                  <ProductListing title="Man & Women Fashion" products={products} />
                </section>
                <BenefitsSection />
              </>
            }
          />

          <Route
            path="/products"
            element={<ProductListPage products={products} breadcrumbs={breadcrumbs} />}
          />

          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path="/search" element={<SearchResult />} />
        </Routes>

        <MobileNavigation />
        <Footer />
      </div>
    </Router>
  );
};

export default React.memo(App);
