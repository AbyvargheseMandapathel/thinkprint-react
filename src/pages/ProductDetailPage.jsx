import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../components/ProductImageGallery';
import ContactForm from '../components/ContactForm';
import parse from 'html-react-parser';
import ProductSection2 from '../components/ProductSection2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isContactFormOpen, setContactFormOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                // Fetch the specific product by ID
                const response = await fetch(`/api/products-api?id=${id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.success && result.data.length > 0) {
                    const fetchedProduct = result.data[0];
                    setProduct(fetchedProduct);
                    
                    // After getting the product, fetch related products from the same category
                    const relatedResponse = await fetch(`/api/products-api?category=${fetchedProduct.category_name}`);
                    
                    if (relatedResponse.ok) {
                        const relatedResult = await relatedResponse.json();
                        if (relatedResult.success) {
                            // Filter out the current product from related products
                            const filteredRelated = relatedResult.data.filter(p => p.id !== parseInt(id));
                            setRelatedProducts(filteredRelated.slice(0, 4)); // Limit to 4 related products
                        }
                    }
                } else {
                    throw new Error('Product not found');
                }
            } catch (err) {
                setError(err.message || 'Error fetching product details');
                console.error('Error fetching product details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const renderDescription = (description) => {
        if (!description) return <p>No description available</p>;
        const hasListItems = description.includes('<li>');
        return hasListItems ? parse(description) : <p>{description}</p>;
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-xl text-gray-600">Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-xl text-red-500">{error || 'Product not found'}</p>
                <a href="/" className="inline-block mt-4 text-blue-500 hover:underline">
                    Return to Home
                </a>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center space-x-2 mb-4">
                <a href="/" className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-link-hover)]">Home</a>
                <span>{'>'}</span>
                <a href={`/category/${product.category_name}`} className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-link-hover)]">{product.category_name}</a>
                <span>{'>'}</span>
                <span className="text-[var(--text-color-secondary)]">{product.title}</span>
            </nav>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <ProductImageGallery product={product} />
                </div>
                <div className="w-full md:w-1/2 pl-4">
                    <h1 className="text-3xl font-bold text-[var(--text-color-primary)]">{product.title}</h1>
                    <div className="mt-4">
                        <h5 className="text-[var(--black)] font-semibold">Short Description</h5>
                        <div className="text-[var(--text-color-secondary)] mt-2 description">
                            {renderDescription(product.short_description)}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h5 className="text-[var(--black)] font-semibold">Long Description</h5>
                        <div className="text-[var(--text-color-secondary)] mt-2 description">
                            {renderDescription(product.long_description)}
                        </div>
                    </div>

                    {/* Design Specifications */}
                    {product.design_specifications && (
                        <div className="mt-4">
                            <h5 className="text-[var(--text-color-primary)] font-semibold">Design Specifications</h5>
                            <ul className="list-disc pl-5 text-[var(--text-color-secondary)] mt-2">
                                {product.design_specifications.split(',').map((spec, index) => (
                                    <li key={index}>{spec.trim()}</li>
                                ))}
                            </ul>
                            <p className="text-sm italic text-gray-500 mt-2">
                                Note: Images shown are for reference purposes only.
                            </p>
                        </div>
                    )}
                    
                    {/* Enquire Now button */}
                    <button
                        className="mt-4 bg-[var(--button-bg-color)] text-[var(--button-text-color)] px-6 py-3 rounded-lg hover:bg-[var(--button-bg-hover-color)] transition-colors"
                        onClick={() => setContactFormOpen(true)}
                    >
                        Enquire Now
                    </button>
                </div>
            </div>
            
            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <ProductSection2
                    title={`More from ${product.category_name}`}
                    products={relatedProducts}
                />
            )}

            {/* Contact form modal */}
            <ContactForm
                isOpen={isContactFormOpen}
                onClose={() => setContactFormOpen(false)}
                productName={product?.title || "Unknown Product"} 
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
            />
        </div>
    );
};

export default ProductDetailPage;
