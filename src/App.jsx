import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AnnouncementBar from "./components/AnnouncementBar";
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
import { banners, categories, products,announcementMessage } from "./data";
import { generateBreadcrumbs } from "./utils/breadcrumbUtils";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactUsPage from "./pages/ContactUsPage";
import './theme.css'; // Import the theme.css file

const App = () => {
  const breadcrumbs = generateBreadcrumbs("category", "All Products");

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

          <Route
            path="/category/:categoryName"
            element={<ProductListPage products={products} />}
          />

          <Route path="/contact" element={<ContactUsPage />} /> {/* New Contact Us Route */}

        </Routes>

        <MobileNavigation />
        <Footer />
      </div>
    </Router>
  );
};

export default React.memo(App);