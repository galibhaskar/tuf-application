import React, { useState, useEffect } from "react";
import BannerItem from "./BannerItem";
import { API_ENDPOINT } from "../config";
import Modal from "./Modal";
import "./Dashboard.css";

const Dashboard = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleCreateBanner = () => {
    setSelectedBanner(null);
    setIsModalOpen(true);
  };

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const handleDeleteBanner = async (id) => {
    try {
      await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      setBanners(banners.filter((banner) => banner.id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleSaveBanner = async (banner) => {
    try {
      if (banner.id) {
        // Update existing banner
        await fetch(`${API_ENDPOINT}/${banner.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(banner),
        });
      } else {
        // Create new banner
        await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(banner),
        });
      }
      fetchBanners();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <button className="create-button" onClick={handleCreateBanner}>
          Create New Banner
        </button>
      </div>
      <div className="banner-list">
        {banners.map((banner) => (
          <BannerItem
            key={banner.id}
            banner={banner}
            onEdit={handleEditBanner}
            onDelete={handleDeleteBanner}
            onSave={handleSaveBanner}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(bannerObj) => handleSaveBanner(bannerObj)}
        >
          <BannerItem banner={selectedBanner} onSave={handleSaveBanner} />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
