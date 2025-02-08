import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../components/ProductImageGallery';
import ContactForm from '../components/ContactForm';
import { products } from '../data';
import parse from 'html-react-parser';

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

    const renderDescription = (description) => {
        const hasListItems = description.includes('<li>');
        return hasListItems ? parse(description) : <p>{description}</p>;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center space-x-2 mb-4">
                <a href="/" className="text-gray-500 hover:text-blue-600">Home</a>
                <span>></span>
                <a href={`/category/${product.category}`} className="text-gray-500 hover:text-blue-600">{product.category}</a>
                <span>></span>
                <span className="text-gray-500">{product.title}</span>
            </nav>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <ProductImageGallery product={product} />
                </div>

                <div className="w-full md:w-1/2 pl-4">
                    <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

                    <div className="flex items-center mt-4">
                        <p className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
                        {product.offer && (
                            <div className="ml-4 bg-red-500 text-white px-2 py-1 rounded-full">
                                {product.offer}
                            </div>
                        )}
                    </div>

                    <div className="text-gray-600 mt-4 description">
                        {renderDescription(product.description)}
                    </div>

                    <button
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors mt-4"
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
        </div>
    );
};

export default ProductDetailPage;
