import React from "react";
import { Link } from "react-router-dom";
import "./ImageCard.css";

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      {image.media_type === "image" ? (
        <img src={image.url} alt={image.title} loading="lazy" />
      ) : (
        <iframe src={image.url} title={image.title} frameBorder="0"></iframe>
      )}

      <div className="image-info">
        <h3>{image.title}</h3>
        <p>{image.date}</p>
        <Link to={`/details/${image.date}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ImageCard;
