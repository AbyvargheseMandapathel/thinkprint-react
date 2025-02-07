import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import CategoryCarousel from './components/CategoryCarousel';
import ProductSection from './components/ProductSection'; // Import ProductSection
import ProductSection2 from './components/ProductSection2'; // Import ProductSection2
import MobileNavigation from './components/MobileNavigation'; // Import MobileNavigation
import Footer from './components/Footer'; // Import Footer
import ProductListing from './components/ProductListing'; // Import ProductListing
import BenefitsSection from './components/BenefitsSection'; // Import BenefitsSection
import './index.css';

const App = () => {
    // Sample product data for the "Recommended Items" section
    const recommendedProducts = [
        {
            id: 1,
            title: 'Basics High-Speed HDMI Cable',
            description: 'High-speed HDMI cable',
            offer: 'Min. 50% Off',
            img: 'https://picsum.photos/300/300?random=1',
            price: 360,
            ratingCount: 125,
            bestDeal: true,
            category: 'Electronics'
        },
        {
            id: 2,
            title: 'Custom Polo T-shirt',
            description: 'Customizable polo t-shirt',
            offer: 'Min. 50% Off',
            img: 'https://picsum.photos/300/300?random=2',
            price: 250,
            ratingCount: 100,
            bestDeal: false,
            category: 'Men'
        },
        {
            id: 3,
            title: 'Photo Frame',
            description: 'High-quality photo frame',
            offer: 'Min. 50% Off',
            img: 'https://picsum.photos/300/300?random=3',
            price: 150,
            ratingCount: 80,
            bestDeal: true,
            category: 'Women'
        },
        {
            id: 4,
            title: 'Wall Art',
            description: 'Beautiful wall art',
            offer: 'Min. 50% Off',
            img: 'https://picsum.photos/300/300?random=4',
            price: 200,
            ratingCount: 90,
            bestDeal: false,
            category: 'Electronics'
        },
        {
            id: 5,
            title: 'Decorative Pillow',
            description: 'Soft and stylish pillow',
            offer: 'Min. 50% Off',
            img: 'https://picsum.photos/300/300?random=5',
            price: 100,
            ratingCount: 70,
            bestDeal: true,
            category: 'Women'
        },
        {
            id: 6,
            title: 'Canvas Print',
            description: 'Artistic canvas print',
            offer: 'Min. 50% Off',
            img: 'https://picsum.photos/300/300?random=6',
            price: 180,
            ratingCount: 110,
            bestDeal: false,
            category: 'Men'
        }
    ];

    // Sample banner data (moved outside the product array)
    const banners = [
        {
            imageUrl: 'https://picsum.photos/1200/600?random=1',
            title: 'My Name, My Pride',
            description: '100 Visiting Cards at Rs 200',
            buttons: [
                {
                    text: 'Shop Now',
                    color: 'blue'
                }
            ]
        },
        {
            imageUrl: 'https://picsum.photos/1200/600?random=2',
            title: 'Wear Your Brand',
            description: 'Starting at Rs. 550',
            buttons: [
                {
                    text: 'Custom Polo T-shirts',
                    color: 'blue'
                },
                {
                    text: 'Custom T-shirts',
                    color: 'white'
                }
            ]
        }
    ];

    return (
        <div className="font-[Poppins] bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Banner Section */}
            <Banner banners={banners} />

            {/* Category Carousel */}
            <CategoryCarousel />

            {/* Recommended Products Section */}
            <section className="container mx-auto px-4 py-12">
                {/* First Product Section */}
                <ProductSection
                    title="Recommended Items (Old Design)"
                    products={recommendedProducts}
                />
                {/* Second Product Section */}
                <ProductSection2
                    title="Recommended Items (New Design)"
                    products={recommendedProducts}
                />
                {/* Product Listing */}
                <ProductListing products={recommendedProducts} title="Man & Women Fashion" />
            </section>

            {/* Mobile Navigation */}
            <MobileNavigation />

            {/* Benefits Section */}
            <BenefitsSection />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default App;
