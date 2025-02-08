import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../components/ProductImageGallery';
import ContactForm from '../components/ContactForm';
import { products } from '../input/data';
import parse from 'html-react-parser';
import ProductSection2 from '../components/ProductSection2';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isContactFormOpen, setContactFormOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const selectedProduct = products.find((p) => p.id === parseInt(id));
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [id]);

    if (!product) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    // ✅ Get products from the same category (excluding the current product)
    const relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    );

    const renderDescription = (description) => {
        const hasListItems = description.includes('<li>');
        return hasListItems ? parse(description) : <p>{description}</p>;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center space-x-2 mb-4">
                <a href="/" className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-link-hover)]">Home</a>
                <span>{'>'}</span>
                <a href={`/category/${product.category}`} className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-link-hover)]">{product.category}</a>
                <span>{'>'}</span>
                <span className="text-[var(--text-color-secondary)]">{product.title}</span>
            </nav>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <ProductImageGallery product={product} />
                </div>

                <div className="w-full md:w-1/2 pl-4">
                    <h1 className="text-3xl font-bold text-[var(--text-color-primary)]">{product.title}</h1>

                    <div className="flex items-center mt-4">
                        <p className="text-2xl font-bold text-[var(--text-color-primary)]">${product.price.toFixed(2)}</p>
                        {product.offer && (
                            <div className="ml-4 bg-[var(--offer-bg-color)] text-[var(--offer-text-color)] px-2 py-1 rounded-full">
                                {product.offer}
                            </div>
                        )}
                    </div>

                    <div className="text-[var(--text-color-secondary)] mt-4 description">
                        {renderDescription(product.description)}
                    </div>

                    <button
                        className="bg-[var(--button-bg-color)] text-[var(--button-text-color)] px-6 py-3 rounded-lg hover:bg-[var(--button-bg-hover-color)] transition-colors mt-4"
                        onClick={() => setContactFormOpen(true)}
                    >
                        Enquire Now
                    </button>

                    <ContactForm
                        isOpen={isContactFormOpen}
                        onClose={() => setContactFormOpen(false)}
                        productName={product?.title || "Unknown Product"} 
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                    />
                </div>
            </div>

            {/* ✅ Show related products from the same category */}
            {relatedProducts.length > 0 && (
                <ProductSection2
                    title={`More from ${product.category}`}
                    products={relatedProducts}
                />
            )}
        </div>
    );
};

export default ProductDetailPage;