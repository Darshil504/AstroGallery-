import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const Details = () => {
  const { date } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImageDetails();
  }, [date]);

  const fetchImageDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
      );
      setImage(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching image details:", error);
      setLoading(false);
    }
  };

  return (
    <div className="details-container">
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : image ? (
        <div className="details-content">
          <h1 className="title">{image.title}</h1>
          <p className="date">{image.date}</p>

          {image.media_type === "image" ? (
            <img src={image.hdurl} alt={image.title} className="image" />
          ) : (
            <iframe src={image.url} title={image.title} className="video"></iframe>
          )}

          <p className="explanation">{image.explanation}</p>

          {image.copyright && <p className="copyright">© {image.copyright}</p>}

          <button className="back-btn" onClick={() => window.history.back()}>
            🔙 Back to Gallery
          </button>
        </div>
      ) : (
        <p className="error-text">Image not found.</p>
      )}
    </div>
  );
};

export default Details;
