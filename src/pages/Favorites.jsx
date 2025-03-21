import React, { useState, useEffect } from "react";
import ImageCard from "../components/ImageCard";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="favorites-container">
      <h1 className="title">❤️ My Favorite Images</h1>

      {favorites.length > 0 ? (
        <div className="gallery">
          {favorites.map((img) => (
            <ImageCard key={img.date} image={img} />
          ))}
        </div>
      ) : (
        <p className="no-favorites">No favorites yet. Add some from the details page!</p>
      )}
    </div>
  );
};

export default Favorites;
