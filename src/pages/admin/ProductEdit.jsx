import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://www.thinkprint.shop/api/products-api?id=${id}`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
          setProduct(result.data[0]);
        } else {
          throw new Error(result.message || 'Product not found');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('https://www.thinkprint.shop/api/products-api', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: parseInt(id)
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        navigate('/admin/products', { 
          state: { message: 'Product updated successfully!' } 
        });
      } else {
        throw new Error(result.message || 'Failed to update product');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <p>Loading product data...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-gray-600">Update product: {product.title}</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ProductForm 
          initialData={product}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formMode="edit"
        />
      </div>
    </div>
  );
};

export default ProductEdit;