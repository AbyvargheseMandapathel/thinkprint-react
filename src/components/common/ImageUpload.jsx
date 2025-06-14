import React, { useState, useCallback } from 'react';

const ImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

      // First request - Upload image
      const uploadResponse = await fetch('https://www.thinkprint.shop/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      let result;
      try {
        result = await uploadResponse.json();
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        throw new Error('Failed to parse server response');
      }

      if (!result.success || !result.imageUrl) {
        throw new Error(result.message || 'Upload failed - No image URL received');
      }

      // Update preview and form value
      setPreview(result.imageUrl);
      onChange(result.imageUrl);

    } catch (err) {
      setError(err.message || 'Failed to upload image');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter image URL"
          className="shadow appearance-none border rounded flex-1 py-2 px-3 text-gray-700"
        />
        <div className="relative">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <button 
            type="button"
            className={`${
              isUploading 
                ? 'bg-gray-400' 
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded`}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto object-contain rounded"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <button
                type="button"
                onClick={() => {
                  setPreview('');
                  onChange('');
                }}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">
            Drag and drop an image here or click upload button
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;