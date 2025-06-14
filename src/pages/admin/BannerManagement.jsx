import React, { useState, useEffect } from 'react';
import BannerList from '../../components/banner/BannerList';
import BannerForm from '../../components/banner/BannerForm';
import DeleteConfirmation from '../../components/banner/DeleteConfirmation';
import Toast from '../../components/Toast';


const BannerManagement = () => {
  const [banners, setBanners] = useState({ main: [], side: [] });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const response = await fetch('https://www.thinkprint.shop/api/banner-api');
      const result = await response.json();
      
      if (result.success) {
        // Group banners by type
        const grouped = result.data.reduce((acc, banner) => {
          acc[banner.banner_type].push(banner);
          return acc;
        }, { main: [], side: [] });
        
        setBanners(grouped);
      }
    } catch (error) {
      showToast('Error fetching banners', 'error');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleAdd = () => {
    setSelectedBanner(null);
    setIsFormOpen(true);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setIsFormOpen(true);
  };

  const handleDelete = (banner) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://www.thinkprint.shop/api/banner-api?id=${selectedBanner.id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        showToast('Banner deleted successfully');
        fetchBanners();
      }
    } catch (error) {
      showToast('Error deleting banner', 'error');
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Banner
        </button>
      </div>

      <BannerList
        mainBanners={banners.main}
        sideBanners={banners.side}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <BannerForm
          banner={selectedBanner}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            fetchBanners();
            setIsFormOpen(false);
            showToast(selectedBanner ? 'Banner updated successfully' : 'Banner created successfully');
          }}
        />
      )}

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={selectedBanner?.title}
      />

      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default BannerManagement;