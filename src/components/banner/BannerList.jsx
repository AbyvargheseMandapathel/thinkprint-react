import React from 'react';

const BannerList = ({ mainBanners, sideBanners, onEdit, onDelete }) => {
  const BannerItem = ({ banner }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{banner.title}</h3>
          <p className="text-gray-600">{banner.subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(banner)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(banner)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={banner.image_url}
          alt={banner.title}
          className="object-cover rounded"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded text-sm ${
          banner.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {banner.is_active ? 'Active' : 'Inactive'}
        </span>
        <span className="text-gray-500 text-sm">
          {banner.banner_type} banner
        </span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Main Banners</h2>
        {mainBanners.map(banner => (
          <BannerItem key={banner.id} banner={banner} />
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Side Banners</h2>
        {sideBanners.map(banner => (
          <BannerItem key={banner.id} banner={banner} />
        ))}
      </div>
    </div>
  );
};

export default BannerList;