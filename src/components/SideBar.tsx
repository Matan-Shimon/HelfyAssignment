import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";

const SideBar = () => {
  // State to handle whether the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle between open and closed state
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsOpen(false); // Set the sidebar state to closed
  };

  return (
    <>
      {/* Burger Menu for Mobile */}
      {/* This button toggles the sidebar visibility */}
      <div className="burger-menu" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Navigation Sidebar */}
      {/* The class 'open' is conditionally added when the sidebar is open */}
      <nav className={`navigation ${isOpen ? "open" : ""}`}>
        {/* Close Button (X) to close the sidebar */}
        <div className="close-btn" onClick={closeSidebar}>
          ✖
        </div>
        {/* Links to different pages, each closes the sidebar when clicked */}
        <Link to="/products" onClick={closeSidebar}>
          Products
        </Link>
        <Link to="/create-ingredient" onClick={closeSidebar}>
          Create Product
        </Link>
        <Link to="/create-salad" onClick={closeSidebar}>
          Create Salad
        </Link>
      </nav>
    </>
  );
};

export default SideBar;
