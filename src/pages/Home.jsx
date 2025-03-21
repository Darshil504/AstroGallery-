import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard"; // Import ImageCard
import "./Home.css";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`
      );
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">🚀 NASA Astronomy Gallery</h1>
      {loading ? <p className="loading-text">Loading...</p> : null}

      <div className="gallery">
        {images.map((image) => (
          <ImageCard key={image.date} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Home;
