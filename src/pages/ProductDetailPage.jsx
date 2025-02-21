import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../components/ProductImageGallery';
import ContactForm from '../components/ContactForm';
import { products } from '../input/products';
import parse from 'html-react-parser';
import ProductSection2 from '../components/ProductSection2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

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
                    {/* <div className="flex items-center mt-4">
                        <p className="text-2xl font-bold text-[var(--text-color-primary)]">${product.price.toFixed(2)}</p>
                        {product.offer && (
                            <div className="ml-4 bg-[var(--offer-bg-color)] text-[var(--offer-text-color)] px-2 py-1 rounded-full">
                                {product.offer}
                            </div>
                        )}
                    </div> */}
                    <div className="mt-4">
                        <h5 className="text-[var(--black)] font-semibold">Short Description</h5>
                        <div className="text-[var(--text-color-secondary)] mt-2 description">
                            {renderDescription(product.shortDescription)}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h5 className="text-[var(--black)] font-semibold">Long Description</h5>
                        <div className="text-[var(--text-color-secondary)] mt-2 description">
                            {renderDescription(product.longDescription)}
                        </div>
                    </div>

                    {/* Commenting out the Available Variants section */}
                    {/* {product.variants && product.variants.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-[var(--text-color-primary)] inline-block">Available Variants:</h3>
                            <div className="mt-2">
                                {product.variants.map((variant, index) => (
                                    <span
                                        key={index}
                                        className="inline-block mr-2 text-[var(--text-color-secondary)] hover:text-[var(--hover-text-color)] cursor-pointer"
                                    >
                                        {variant.name},
                                    </span>
                                ))}
                            </div>
                        </div>
                    )} */}

                    {/* Keep Design Specifications section */}
                    <div className="mt-4">
                        <h5 className="text-[var(--text-color-primary)] font-semibold">Design Specifications</h5>
                        <ul className="list-disc pl-5 text-[var(--text-color-secondary)] mt-2">
                            {product.designSpecifications && product.designSpecifications.map((spec, index) => (
                                <li key={index}>{spec}</li>
                            ))}
                        </ul>
                    </div>
                    {/* New Variants Section */}
                    <div className="mt-4">
                        <h5 className="text-[var(--text-color-primary)] font-semibold">Variants</h5>
                        <div className="mt-2">
                            <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <FontAwesomeIcon icon={faFilePdf} className="mr-2 text-red-500" />
                                Download PDF
                            </a>
                        </div>
                    </div>
                    {/* Keep Enquire Now button */}
                    <button
                        className="mt-4 bg-[var(--button-bg-color)] text-[var(--button-text-color)] px-6 py-3 rounded-lg hover:bg-[var(--button-bg-hover-color)] transition-colors"
                        onClick={() => setContactFormOpen(true)}
                    >
                        Enquire Now
                    </button>
                </div>
            </div>
            {relatedProducts.length > 0 && (
                <ProductSection2
                    title={`More from ${product.category}`}
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
