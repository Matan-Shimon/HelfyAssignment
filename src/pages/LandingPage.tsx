import { Link } from "react-router-dom"; // Import Link component for navigation between pages
import "../styles/LandingPage.css"; // Import CSS for the landing page styling

const LandingPage = () => {
  return (
    <div className="landing-page"> {/* Main container for the landing page */}
      <h1>Welcome to Matan's Assignment Solution</h1> {/* Welcome heading */}
      <div className="button-container"> {/* Container to hold the buttons */}
        {/* Button linking to the Products page */}
        <Link to="/products" className="landing-button">
          Stock Management System {/* Link to the products page */}
        </Link>
        {/* Button linking to the Trivia game page */}
        <Link to="/trivia" className="landing-button">
          Trivia Game {/* Link to the trivia game page */}
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
