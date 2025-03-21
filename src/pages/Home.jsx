import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";
import "./Home.css";

const API_KEY = "znn7flw8ThdShrCxQWnf6iva9MQA347xlOlk40T9";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(API_URL);
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">🚀 NASA Astronomy Gallery</h1>
      {loading ? (
        <p className="loading-text">Loading images...</p>
      ) : (
        <div className="gallery">
          {images.map((img) => (
            <ImageCard key={img.date} image={img} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
