import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', img: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (data.success) {
        // Clean up image URLs by removing backticks if present
        const cleanedData = data.data.map(category => ({
          ...category,
          img: category.img ? category.img.replace(/`/g, '').trim() : ''
        }));
        setCategories(cleanedData || []);
      } else {
        setError(data.message || 'Failed to fetch categories');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value
    });
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
        const errorData = await response.json();
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      let imageUrl = currentCategory.img;
      
      // If a new image was selected, upload it first
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const categoryData = {
        ...currentCategory,
        img: imageUrl
      };
      
      const url = formMode === 'add' 
        ? '/api/categories-add' 
        : '/api/categories-update';
      
      const method = formMode === 'add' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Operation failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form and refresh categories
        setCurrentCategory({ id: null, name: '', img: '' });
        setImageFile(null);
        
        // Clean up object URL if it exists
        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview('');
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setFormMode('add');
        fetchCategories();
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Error: ' + err.message);
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEdit = (category) => {
    setCurrentCategory({
      id: category.id,
      name: category.name,
      img: category.img || ''
    });
    setImagePreview(category.img || '');
    setFormMode('edit');
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/categories-delete?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchCategories();
      } else {
        setError(data.message || 'Delete operation failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error deleting category:', err);
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    setCurrentCategory({ id: null, name: '', img: '' });
    
    // Clean up object URL if it exists
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFormMode('add');
  };

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any blob URLs when component unmounts
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (loading && categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Category Management</h1>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Category Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {formMode === 'add' ? 'Add New Category' : 'Edit Category'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {formMode === 'edit' && (
            <input type="hidden" name="id" value={currentCategory.id} />
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Category Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={currentCategory.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Category Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a new image or leave empty to keep the current one.
            </p>
          </div>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image Preview
              </label>
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-32 w-auto object-contain border rounded p-1"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : formMode === 'add' ? 'Add Category' : 'Update Category'}
            </button>
            
            {formMode === 'edit' && (
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Categories List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="py-2 px-4 border-b border-gray-200">{category.id}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{category.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {category.img ? (
                        <img 
                          src={category.img} 
                          alt={category.name} 
                          className="h-10 w-10 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                          }}
                        />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;