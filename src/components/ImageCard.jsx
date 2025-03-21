import { Link } from "react-router-dom";
import "./ImageCard.css";

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <img src={image.url} alt={image.title} className="image" />
      <h3 className="title">{image.title}</h3>
      <p className="date">{image.date}</p>
      <Link to={`/details/${image.date}`} className="details-btn">
        View Details
      </Link>
    </div>
  );
};

export default ImageCard;
