import React, { useState } from "react";
import { formatDateToMySQL } from "../utils/dateFormatter";
import "./BannerItem.css";

const BannerItem = ({ banner, onEdit, onDelete, onSave }) => {
  const visibilityDateTime = new Date(banner.visibleDateTime);

  const endTime = visibilityDateTime.getTime() + banner.timer * 1000;

  const now = Date.now();

  let bannerStatus = "Not Visible";

  if (now > endTime) {
    bannerStatus = 'Expired';
  } else if (now > visibilityDateTime.getTime()) {
    bannerStatus = 'Visible';
  } else {
    bannerStatus = 'Not Visible';
  }

  const canEdit = now <= visibilityDateTime.getTime();

  const [editMode, setEditMode] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(banner);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentBanner({
      ...currentBanner,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePreview = () => {
    // Open a new tab with the banner preview URL
    window.open(`/banner-preview/${banner.id}`, "_blank");
  };

  const handleSave = () => {
    onSave(currentBanner);
    setEditMode(false);
  };

  const handleCancel = () => {
    setCurrentBanner(banner);
    setEditMode(false);
  };

  return (
    <div className="banner-item">
      <div
        className={`banner-preview-badge ${bannerStatus
          .toLowerCase()
          .replace(" ", "-")}`}
      >
        {bannerStatus}
      </div>
      <label>
        <span>Description:</span>
        <input
          type="text"
          name="description"
          value={currentBanner.description}
          onChange={handleChange}
          disabled={!editMode}
        />
      </label>
      <label>
        <span>Timer:</span>
        <input
          type="number"
          name="timer"
          value={currentBanner.timer}
          onChange={handleChange}
          disabled={!editMode}
        />
      </label>
      <label>
        <span>Link:</span>
        <input
          type="text"
          name="link"
          value={currentBanner.link}
          onChange={handleChange}
          disabled={!editMode}
        />
      </label>
      <label>
        <span>Visibility Start Time:</span>
        <input
          type="datetime-local"
          name="visibleDateTime"
          value={formatDateToMySQL(new Date(currentBanner.visibleDateTime))}
          onChange={handleChange}
          disabled={!editMode}
        />
      </label>
      <label className="toggle-container">
        <span>Visible:</span>
        <label className="switch">
          <input
            type="checkbox"
            name="visible"
            checked={currentBanner.visible}
            onChange={handleChange}
            disabled={!editMode}
          />
          <span
            className={`${!editMode ? "toggle-disable" : ""} slider`}
          ></span>
        </label>
      </label>

      <div className={`buttons-container`}>
        {editMode ? (
          <div className="footer">
            <button
              className="save-button"
              onClick={handleSave}
              disabled={!canEdit}
            >
              Save
            </button>
            <button
              className="cancel-button"
              onClick={handleCancel}
              disabled={!canEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className={`${canEdit ? `` : `disable`} footer`}>
            <button
              className="edit-button"
              onClick={() => setEditMode(true)}
              disabled={!canEdit}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onDelete(banner.id)}
              disabled={!canEdit}
            >
              Delete
            </button>
          </div>
        )}

        <button className="preview-button" onClick={handlePreview}>
          Preview
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
