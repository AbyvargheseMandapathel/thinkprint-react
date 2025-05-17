import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';

const ProductAdd = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/products-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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