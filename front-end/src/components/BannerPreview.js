import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BannerPreview.css";
import { API_ENDPOINT } from "../config";
import moment from "moment";

const BannerPreview = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [visibilityTime, setVisibilityTime] = useState("");
  const [bannerStatus, setBannerStatus] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/${id}`);
        const data = await response.json();
        setBanner(data);

        // Format visibility time
        const visibilityDateTime = new Date(data.visibleDateTime);
        setVisibilityTime(
          moment(visibilityDateTime).format("MMMM Do YYYY, h:mm:ss a")
        );

        // Calculate end time
        const endTime = visibilityDateTime.getTime() + data.timer * 1000;
        const now = Date.now();

        if (now > endTime) {
          // Timer has expired
          setBannerStatus("Expired");
          setTimeLeft(0);
        } else if (now > visibilityDateTime.getTime()) {
          // Timer is running
          setBannerStatus("Running");
          const calculateTimeLeft = () => {
            const newTimeLeft = endTime - Date.now();
            if (newTimeLeft <= 0) {
              setTimeLeft(0);
            } else {
              setTimeLeft(newTimeLeft);
            }
          };

          calculateTimeLeft();
          const timer = setInterval(() => {
            calculateTimeLeft();
          }, 1000);

          return () => clearInterval(timer);
        } else {
          // Timer not started yet
          setBannerStatus("Not Started");
          setTimeLeft(endTime);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, [id]);

  const formatTime = (time) => {
    if (time <= 0) return "Expired";
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (!banner) return <div>Loading...</div>;

  return (
    <div className="banner-preview">
      <div className="banner-preview-container">
        <h1>{banner.description}</h1>
        <div
          className={`banner-preview-badge ${bannerStatus
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {bannerStatus}
        </div>
        {bannerStatus === "Running" ? (
          <div className="banner-preview-timer">
            Time Left: {formatTime(timeLeft)}
          </div>
        ) : bannerStatus === "Not Started" ? (
          <div className="banner-preview-timer">
            Available in: {formatTime(timeLeft)}
          </div>
        ) : null}
        <div className="banner-preview-visibility-time">
          Available from: {visibilityTime}
        </div>
        <a
          href={banner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="banner-preview-link"
        >
          Visit Banner Link
        </a>
      </div>
    </div>
  );
};

export default BannerPreview;
