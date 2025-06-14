import React, { useState, useEffect } from 'react';
import ImageUpload from '../common/ImageUpload';

const BannerForm = ({ banner, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    banner_type: 'main',
    is_active: true
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (banner) {
      setFormData(banner);
    }
  }, [banner]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://www.thinkprint.shop/api/banner-api', {
        method: banner ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          // Ensure boolean value for is_active
          is_active: Boolean(formData.is_active)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to save banner');
      }

      onSuccess(result.data);
      onClose();
    } catch (error) {
      console.error('Banner submission error:', error);
      setError(error.message || 'Failed to submit banner. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {banner ? 'Edit Banner' : 'Add New Banner'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image *
            </label>
            <ImageUpload
              value={formData.image_url}
              onChange={(url) => setFormData({ ...formData, image_url: url })}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Banner Type
            </label>
            <select
              value={formData.banner_type}
              onChange={(e) => setFormData({ ...formData, banner_type: e.target.value })}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            >
              <option value="main">Main Banner</option>
              <option value="side">Side Banner</option>
            </select>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-700 text-sm font-bold">Active</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.image_url}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
            >
              {isSubmitting ? 'Saving...' : banner ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm;