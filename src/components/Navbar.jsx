import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Add CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">🚀 AstroGallery</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
