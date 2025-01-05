import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "../styles/HomeButton.css"; // Import the CSS file for styling

// HomeButton component definition
const HomeButton = () => {
  return (
    // Container for the Home button
    <div className="home-button-container">
      {/* Home button with link to the landing page */}
      <Link to="/" className="home-button">
        Home {/* Text for the Home button */}
      </Link>
    </div>
  );
};

export default HomeButton;
