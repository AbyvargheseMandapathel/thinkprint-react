import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, className, ...props }) => {
    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoaded(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "100px" }
        );

        if (imgRef.current) observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <img
            ref={imgRef}
            src={loaded ? src : ""}
            alt={alt}
            className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
            {...props}
        />
    );
};

const ProductImageGallery = ({ product }) => {
    const mainImage = product.img;
    const thumbnailImages = product.thumbnailImages || [];
    const combinedImages = [mainImage, ...thumbnailImages].slice(0, 8);
    const [selectedImage, setSelectedImage] = useState(mainImage);

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full px-4">
            {/* Thumbnails - Below in Mobile, Left in Desktop */}
            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-y-auto w-full md:w-[100px] justify-center md:justify-start order-2 md:order-none">
                {combinedImages.map((image, index) => (
                    <div
                        key={index}
                        className={`w-16 h-16 md:w-16 md:h-16 cursor-pointer rounded-lg overflow-hidden ${
                            selectedImage === image ? "border-2 border-blue-500" : ""
                        }`}
                        onClick={() => setSelectedImage(image)}
                    >
                        <LazyImage
                            src={image}
                            alt={`Thumbnail ${index}`}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                            width={400}
                            height={300}
                            srcSet={`
                                ${image}?w=400&h=300&q=80&fm=webp 400w,
                                ${image}?w=800&h=600&q=70&fm=webp 800w,
                                ${image}?w=1200&h=900&q=60&fm=webp 1200w
                            `}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        />
                    </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="w-full md:w-3/4 max-h-[550px] rounded-lg overflow-hidden shadow-lg order-1">
                <LazyImage
                    src={selectedImage}
                    alt="Main Product"
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
            </div>
        </div>
    );
};

export default ProductImageGallery;
