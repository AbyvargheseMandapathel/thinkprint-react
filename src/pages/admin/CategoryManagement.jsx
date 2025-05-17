import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// Remove unused navigate import
// import { useNavigate } from 'react-router-dom';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', img: '' });
  const [currentSubcategory, setCurrentSubcategory] = useState({ id: null, name: '', category_id: '' });
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' or 'subcategories'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  // Remove unused navigate declaration

  // Use a local fallback image instead of placeholder.com
  const fallbackImage = '/assets/no-image.png'; // Create this file in your public/assets folder

  // Fetch all categories - converted to useCallback
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
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
  }, []);

  // Fetch all subcategories
  const fetchSubcategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/subcategories');
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSubcategories(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch subcategories');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error fetching subcategories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    
    // Cleanup function
    return () => {
      // Clean up any blob URLs when component unmounts
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [fetchCategories, fetchSubcategories]);

  // Handle form input changes - converted to useCallback
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    if (activeTab === 'categories') {
      setCurrentCategory(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setCurrentSubcategory(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }, [activeTab]);

  // Handle image file selection - converted to useCallback
  const handleImageChange = useCallback((e) => {
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
  }, [imagePreview]);

  // Upload image to server - converted to useCallback
  const uploadImage = useCallback(async (file) => {
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
  }, []);

  // Handle form submission - converted to useCallback
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (activeTab === 'categories') {
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
          const errorData = await response.json().catch(() => ({}));
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
      } else {
        // Handle subcategory submission
        const subcategoryData = {
          ...currentSubcategory
        };
        
        const url = formMode === 'add' 
          ? '/api/subcategories-add' 
          : '/api/subcategories-update';
        
        const method = formMode === 'add' ? 'POST' : 'PUT';
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subcategoryData)
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Operation failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          // Reset form and refresh subcategories
          setCurrentSubcategory({ id: null, name: '', category_id: '' });
          setFormMode('add');
          fetchSubcategories();
        } else {
          setError(data.message || 'Operation failed');
        }
      }
    } catch (err) {
      setError('Error: ' + err.message);
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    activeTab, 
    currentCategory, 
    currentSubcategory, 
    formMode, 
    imageFile, 
    imagePreview, 
    uploadImage, 
    fetchCategories, 
    fetchSubcategories
  ]);

  // Handle edit button click - converted to useCallback
  const handleEdit = useCallback((item) => {
    if (activeTab === 'categories') {
      setCurrentCategory({
        id: item.id,
        name: item.name,
        img: item.img || ''
      });
      setImagePreview(item.img || '');
    } else {
      setCurrentSubcategory({
        id: item.id,
        name: item.name,
        category_id: item.category_id
      });
    }
    setFormMode('edit');
  }, [activeTab]);

  // Handle delete button click - converted to useCallback
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab === 'categories' ? 'category' : 'subcategory'}?`)) {
      return;
    }
    
    try {
      const url = activeTab === 'categories' 
        ? `/api/categories-delete?id=${id}` 
        : `/api/subcategories-delete?id=${id}`;
        
      const response = await fetch(url, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        if (activeTab === 'categories') {
          fetchCategories();
        } else {
          fetchSubcategories();
        }
      } else {
        setError(data.message || 'Delete operation failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(`Error deleting ${activeTab === 'categories' ? 'category' : 'subcategory'}:`, err);
    }
  }, [activeTab, fetchCategories, fetchSubcategories]);

  // Cancel edit mode - converted to useCallback
  const handleCancel = useCallback(() => {
    if (activeTab === 'categories') {
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
    } else {
      setCurrentSubcategory({ id: null, name: '', category_id: '' });
    }
    setFormMode('add');
  }, [activeTab, imagePreview]);

  // Switch between categories and subcategories tabs
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setFormMode('add');
    handleCancel();
  }, [handleCancel]);

  // Memoize the categories table to prevent unnecessary re-renders
  const categoriesTable = useMemo(() => {
    if (categories.length === 0) {
      return <p>No categories found.</p>;
    }
    
    return (
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
                        e.target.src = fallbackImage;
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
    );
  }, [categories, handleEdit, handleDelete, fallbackImage]);

  // Memoize the subcategories table
  const subcategoriesTable = useMemo(() => {
    if (subcategories.length === 0) {
      return <p>No subcategories found.</p>;
    }
    
    return (
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
                Parent Category
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <td className="py-2 px-4 border-b border-gray-200">{subcategory.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{subcategory.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{subcategory.category_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(subcategory)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(subcategory.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [subcategories, handleEdit, handleDelete]);

  if (loading && categories.length === 0 && subcategories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Category Management</h1>
        <p>Loading data...</p>
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
      
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('categories')}
            >
              Categories
            </button>
            <button
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'subcategories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('subcategories')}
            >
              Subcategories
            </button>
          </nav>
        </div>
      </div>
      
      {/* Category/Subcategory Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {formMode === 'add' 
            ? `Add New ${activeTab === 'categories' ? 'Category' : 'Subcategory'}` 
            : `Edit ${activeTab === 'categories' ? 'Category' : 'Subcategory'}`}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {formMode === 'edit' && (
            <input 
              type="hidden" 
              name="id" 
              value={activeTab === 'categories' ? currentCategory.id : currentSubcategory.id} 
            />
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              {activeTab === 'categories' ? 'Category' : 'Subcategory'} Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={activeTab === 'categories' ? currentCategory.name : currentSubcategory.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {activeTab === 'subcategories' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                Parent Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category_id"
                name="category_id"
                value={currentSubcategory.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a parent category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {activeTab === 'categories' && (
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
          )}
          
          {/* Image Preview */}
          {activeTab === 'categories' && imagePreview && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image Preview
              </label>
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-32 w-auto object-contain border rounded p-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
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
              {isSubmitting 
                ? 'Processing...' 
                : formMode === 'add' 
                  ? `Add ${activeTab === 'categories' ? 'Category' : 'Subcategory'}` 
                  : `Update ${activeTab === 'categories' ? 'Category' : 'Subcategory'}`}
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
      
      {/* Categories/Subcategories List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">
          {activeTab === 'categories' ? 'Categories' : 'Subcategories'}
        </h2>
        {activeTab === 'categories' ? categoriesTable : subcategoriesTable}
      </div>
    </div>
  );
};

export default CategoryManagement;