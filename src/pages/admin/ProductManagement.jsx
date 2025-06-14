import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';
import ProductList from '../../components/admin/ProductList';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState('list'); // 'list', 'add', or 'edit'
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  // Fetch products - converted to useCallback
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://www.thinkprint.shop/api/products-api');
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.message || 'Failed to load products');
      }
    } catch (error) {
      setError('Error loading products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single product by ID
  const fetchProduct = useCallback(async (productId) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://www.thinkprint.shop/api/products-api?id=${productId}`);
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        setCurrentProduct(result.data[0]);
      } else {
        throw new Error(result.message || 'Product not found');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle URL parameters and state
  useEffect(() => {
    // Check for success message in location state (from redirects)
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 3 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
        // Also clear the location state
        navigate(location.pathname, { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Check URL path to determine mode
    if (location.pathname.includes('/new')) {
      setFormMode('add');
      setCurrentProduct(null);
    } else if (location.pathname.includes('/edit') && id) {
      setFormMode('edit');
      fetchProduct(id);
    } else {
      setFormMode('list');
      fetchProducts();
    }
  }, [location, navigate, id, fetchProduct, fetchProducts]);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://www.thinkprint.shop/api/products-api?id=${productId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to delete product');
      }
      
      setSuccessMessage('Product deleted successfully!');
      fetchProducts();
      return true;
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Delete error:', error);
      throw error;
    }
  };

  // Handle form submission for add/edit
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const method = formMode === 'add' ? 'POST' : 'PUT';
      const body = formMode === 'edit' 
        ? JSON.stringify({ ...formData, id: parseInt(id) })
        : JSON.stringify(formData);
      
      const response = await fetch('https://www.thinkprint.shop/api/products-api', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage(formMode === 'add' 
          ? 'Product added successfully!' 
          : 'Product updated successfully!');
        setFormMode('list');
        fetchProducts();
        // Update URL without page reload
        navigate('/admin/products', { replace: true });
      } else {
        throw new Error(result.message || `Failed to ${formMode === 'add' ? 'add' : 'update'} product`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Switch to add mode
  const handleAddNew = () => {
    setCurrentProduct(null);
    setFormMode('add');
    setError('');
    // Update URL without page reload
    navigate('/admin/products/new', { replace: true });
  };

  // Switch to edit mode
  const handleEdit = (productId) => {
    setFormMode('edit');
    setError('');
    // Update URL without page reload
    navigate(`/admin/products/edit/${productId}`, { replace: true });
  };

  // Cancel form and return to list
  const handleCancel = () => {
    setFormMode('list');
    setError('');
    // Update URL without page reload
    navigate('/admin/products', { replace: true });
  };

  // Render loading state
  if (loading && products.length === 0 && formMode === 'list') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Product Management</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with title and action button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {formMode === 'list' && 'Product Management'}
          {formMode === 'add' && 'Add New Product'}
          {formMode === 'edit' && 'Edit Product'}
        </h1>
        
        {formMode === 'list' ? (
          <button 
            onClick={handleAddNew}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Product
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Products
          </button>
        )}
      </div>
      
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Content based on current mode */}
      {formMode === 'list' && (
        <ProductList 
          products={products} 
          onDelete={handleDeleteProduct} 
          onRefresh={fetchProducts}
          onEdit={handleEdit}
        />
      )}
      
      {(formMode === 'add' || formMode === 'edit') && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {formMode === 'edit' && currentProduct && (
            <p className="text-gray-600 mb-4">Updating product: {currentProduct.title}</p>
          )}
          
          <ProductForm 
            initialData={currentProduct || {}}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            formMode={formMode}
          />
        </div>
      )}
    </div>
  );
};

export default ProductManagement;