import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import CategoryCarousel from "./components/CategoryCarousel";
import ProductSection from "./components/ProductSection";
import ProductSection2 from "./components/ProductSection2";
import ProductListing from "./components/ProductListing";
import MobileNavigation from "./components/MobileNavigation";
import BenefitsSection from "./components/BenefitsSection";
import Footer from "./components/Footer";
import ProductListPage from "./pages/ProductListPage"; // Import the Product List Page
import CategoryPage from "./pages/CategoryPage"; // Import the Category Page
import SearchResult from "./pages/SearchResult"; // Import the Search Results Page
import { banners, categories, recommendedProducts } from "./data";
import "./index.css";
import { products } from "./data";

const App = () => {
  return (
    <Router>
      <div className="font-[Poppins] bg-gray-50">
        {/* Navbar */}
        <Navbar />

        {/* Define Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                {/* Hero Banner */}
                <Banner banners={banners} />
                {/* Category Carousel */}
                <CategoryCarousel categories={categories} />
                {/* Product Sections */}
                <section className="container mx-auto px-4 py-12">
                  {/* <ProductSection
                    title="Recommended Items (Old Design)"
                    products={products}
                  /> */}
                  <ProductSection2
                    title="Recommended Items (New Design)"
                    products={products}
                  />
                  <ProductListing
                    title="Man & Women Fashion"
                    products={products}
                  />
                </section>
                {/* Benefits Section */}
                <BenefitsSection />
              </>
            }
          />

          {/* Product List Page */}
          <Route path="/products" element={<ProductListPage />} />

          {/* Category Page */}
          <Route
            path="/category/:categoryName"
            element={<CategoryPage category="Electronics" />}
          />

          {/* Search Results Page */}
          <Route path="/search" element={<SearchResult />} />
        </Routes>

        {/* Mobile Navigation */}
        <MobileNavigation />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default React.memo(App);