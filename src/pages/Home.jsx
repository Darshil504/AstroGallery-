import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";
import "./Home.css";

const API_KEY = "znn7flw8ThdShrCxQWnf6iva9MQA347xlOlk40T9"; 
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [mediaType, setMediaType] = useState("all");

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

  // Filtered images based on search, date, and media type
  const filteredImages = images.filter((img) => {
    const matchesTitle = img.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate ? img.date === selectedDate : true;
    const matchesMediaType = mediaType === "all" || img.media_type === mediaType;
    return matchesTitle && matchesDate && matchesMediaType;
  });

  return (
    <div className="home-container">
      <h1 className="title">🚀 NASA Astronomy Gallery</h1>

      {/* Search & Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
      </div>

      {loading ? (
        <p className="loading-text">Loading images...</p>
      ) : (
        <div className="gallery">
          {filteredImages.length > 0 ? (
            filteredImages.map((img) => <ImageCard key={img.date} image={img} />)
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
