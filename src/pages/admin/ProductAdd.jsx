import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';

const ProductAdd = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageInputType, setImageInputType] = useState('file'); // 'file' or 'url'
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Toggle between file upload and URL input
  const toggleImageInputType = () => {
    // Clear previous inputs when switching
    if (imageInputType === 'file') {
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setImageUrl('');
    }
    
    // Reset preview
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview('');
    
    // Toggle input type
    setImageInputType(prev => prev === 'file' ? 'url' : 'file');
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clear previous file and preview
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // If file selection was cancelled
      setImageFile(null);
    }
  };

  // Handle image URL input
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
  };

  // Upload image to server
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.imageUrl;
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/products-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) // formData now contains the correct image URL
      });
      
      const result = await response.json();
      
      if (result.success) {
        navigate('/admin/products', { 
          state: { message: 'Product added successfully!' } 
        });
      } else {
        throw new Error(result.message || 'Failed to add product');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-600">Create a new product in your catalog</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Image Upload/URL Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Image
          </label>
          <div className="flex items-center mb-2">
            <button
              type="button"
              className={`mr-2 px-3 py-1 rounded ${
                imageInputType === 'file' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={toggleImageInputType}
            >
              Upload File
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded ${
                imageInputType === 'url' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={toggleImageInputType}
            >
              Image URL
            </button>
          </div>
          
          {imageInputType === 'file' ? (
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a product image (recommended size: 800x800px)
              </p>
            </div>
          ) : (
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="imageUrl"
                type="url"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleImageUrlChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a direct URL to an image (e.g., https://example.com/image.jpg)
              </p>
            </div>
          )}
        </div>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image Preview
            </label>
            <div className="border border-gray-200 rounded p-2 w-40 h-40 flex items-center justify-center">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/no-image.png';
                }}
              />
            </div>
          </div>
        )}
        
        <ProductForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formMode="add"
        />
      </div>
    </div>
  );
};

export default ProductAdd;