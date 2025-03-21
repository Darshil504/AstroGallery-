import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const Details = () => {
  const { date } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchImageDetails();
    checkIfFavorite();
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

  // Check if this image is already a favorite
  const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.date === date));
  };

  // Toggle favorite status
  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.date !== date);
    } else {
      // Add to favorites
      favorites.push(image);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
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

          <button className="favorite-btn" onClick={handleFavorite}>
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>

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
