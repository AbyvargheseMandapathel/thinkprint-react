import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ProductForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    initialData = {
      title: '',
      short_description: '',
      long_description: '',
      design_specifications: '',
      image: '',
      category_id: '',
      subcategory_id: '',
      is_urbangear: false
    }, 
    onSubmit,
    isSubmitting: propIsSubmitting = false
  } = props;
  const [formData, setFormData] = useState(initialData);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(initialData.image || '');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageInputType, setImageInputType] = useState('file'); // Add this state
  const [imageUrl, setImageUrl] = useState(initialData.image || ''); // Add this state
  const fileInputRef = useRef(null);
  const fallbackImage = '/assets/no-image.png';

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.thinkprint.shop/api/categories-api');
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    const fetchSubcategories = async () => {
      try {
        const response = await fetch('https://www.thinkprint.shop/api/subcategories-api');
        const result = await response.json();
        if (result.success) {
          setSubcategories(result.data);
          // If we have a category_id in initialData, filter subcategories
          if (initialData.category_id) {
            const filtered = result.data.filter(
              sub => sub.category_id === parseInt(initialData.category_id)
            );
            setFilteredSubcategories(filtered);
          }
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    
    fetchCategories();
    fetchSubcategories();
    
    // Cleanup function for image preview
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [initialData.category_id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // If category changes, filter subcategories
    if (name === 'category_id' && value) {
      const categoryId = parseInt(value);
      const filtered = subcategories.filter(sub => sub.category_id === categoryId);
      setFilteredSubcategories(filtered);
      // Reset subcategory selection
      setFormData(prev => ({
        ...prev,
        subcategory_id: ''
      }));
    }
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
      
      // Clear any image error
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  // Add toggle function for image input type
  const toggleImageInputType = () => {
    if (imageInputType === 'file') {
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setImageUrl('');
    }
    
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview('');
    setImageInputType(prev => prev === 'file' ? 'url' : 'file');
  };

  // Add handler for image URL input
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Short description is required';
    }
    
    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }
    
    if (!formData.subcategory_id) {
      newErrors.subcategory_id = 'Subcategory is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Important: Prevent default form submission
    
    // Add a guard clause to prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }
    
    let finalImageUrl = '';

    // Set local submitting state
    setIsSubmitting(true);

    try {
      if (imageInputType === 'file' && imageFile) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('image', imageFile);
        
        const response = await fetch('https://www.thinkprint.shop/api/upload-image', {
          method: 'POST',
          body: formDataWithImage
        });
        
        const result = await response.json();
        
        if (result.success) {
          finalImageUrl = result.imageUrl;
        } else {
          throw new Error(result.message || 'Failed to upload image');
        }
      } else if (imageInputType === 'url' && imageUrl) {
        finalImageUrl = imageUrl;
      }
      
      // Call the onSubmit prop only once with the final data
      await onSubmit({
        ...formData,
        image: finalImageUrl
      });
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        image: error.message
      }));
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-6"
      // Add this to prevent double submissions
      noValidate
    >
      {/* Form Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Please correct the following errors:</p>
          <ul className="list-disc pl-5">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`shadow appearance-none border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title}</p>
        )}
      </div>
      
      {/* Short Description */}
      <div className="mb-4">
        <label htmlFor="short_description" className="block text-gray-700 font-bold mb-2">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="short_description"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          rows="3"
          className={`shadow appearance-none border ${
            errors.short_description ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
        {errors.short_description && (
          <p className="text-red-500 text-xs italic">{errors.short_description}</p>
        )}
      </div>
      
      {/* Long Description */}
      <div className="mb-4">
        <label htmlFor="long_description" className="block text-gray-700 font-bold mb-2">
          Long Description
        </label>
        <textarea
          id="long_description"
          name="long_description"
          value={formData.long_description}
          onChange={handleChange}
          rows="6"
          className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      {/* Design Specifications */}
      <div className="mb-4">
        <label htmlFor="design_specifications" className="block text-gray-700 font-bold mb-2">
          Design Specifications
        </label>
        <textarea
          id="design_specifications"
          name="design_specifications"
          value={formData.design_specifications}
          onChange={handleChange}
          rows="4"
          placeholder="Enter each specification on a new line"
          className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p className="text-gray-600 text-xs mt-1">
          Enter each specification on a new line. These will be displayed as bullet points.
        </p>
      </div>
      
      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category_id" className="block text-gray-700 font-bold mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className={`shadow appearance-none border ${
            errors.category_id ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-red-500 text-xs italic">{errors.category_id}</p>
        )}
      </div>
      
      {/* Subcategory */}
      <div className="mb-4">
        <label htmlFor="subcategory_id" className="block text-gray-700 font-bold mb-2">
          Subcategory <span className="text-red-500">*</span>
        </label>
        <select
          id="subcategory_id"
          name="subcategory_id"
          value={formData.subcategory_id}
          onChange={handleChange}
          disabled={!formData.category_id}
          className={`shadow appearance-none border ${
            errors.subcategory_id ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            !formData.category_id ? 'bg-gray-100' : ''
          }`}
        >
          <option value="">Select a subcategory</option>
          {filteredSubcategories.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
        {errors.subcategory_id && (
          <p className="text-red-500 text-xs italic">{errors.subcategory_id}</p>
        )}
      </div>
      
      {/* Urban Gear Checkbox */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_urbangear"
            checked={formData.is_urbangear}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">Mark as Urban Gear product</span>
        </label>
      </div>
      
      {/* Product Image */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">
          Product Image
        </label>
        
        {/* Toggle Buttons */}
        <div className="flex items-center mb-4">
          <button
            type="button"
            className={`mr-2 px-4 py-2 rounded ${
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
            className={`px-4 py-2 rounded ${
              imageInputType === 'url'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={toggleImageInputType}
          >
            Image URL
          </button>
        </div>
        
        {/* Input Fields */}
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src={imagePreview || fallbackImage}
              alt="Product preview"
              className="w-32 h-32 object-cover border border-gray-300 rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
          </div>
          <div className="flex-1">
            {imageInputType === 'file' ? (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {formData.image ? 'Change Image' : 'Upload Image'}
                </button>
              </>
            ) : (
              <input
                type="url"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-xs italic mt-2">{errors.image}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};

// Prop Types Validation
ProductForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    short_description: PropTypes.string,
    long_description: PropTypes.string,
    design_specifications: PropTypes.string,
    image: PropTypes.string,
    category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subcategory_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    is_urbangear: PropTypes.bool
  }),
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default ProductForm;