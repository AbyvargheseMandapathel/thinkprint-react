import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex gap-4 mb-8">
      {/* Thumbnail Images */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-20 h-20 object-cover cursor-pointer border ${
              selectedImage === image ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {/* Main Preview Image */}
      <img
        src={selectedImage}
        alt="Main Product"
        className="w-full h-96 object-cover rounded-lg"
      />
    </div>
  );
};

export default ImageGallery;