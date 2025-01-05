import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout"; // Layout component for the app
import Products from "./pages/Products"; // Products page component
import CreateIngredient from "./pages/CreateIngredient"; // Create ingredient page component
import CreateSalad from "./pages/CreateSalad"; // Create salad page component
import Trivia from "./pages/Trivia"; // Trivia game page component
import LandingPage from "./pages/LandingPage"; // Landing page component
import "./styles/LandingPage.css"; // Styles for the landing page

// Define the router configuration
const router = createBrowserRouter([
  {
    element: <AppLayout />, // Use the AppLayout component for the common layout structure
    children: [
      {
        path: "/", // Root path should show the landing page
        element: <LandingPage />, // Render LandingPage for the root route
      },
      {
        path: "/products", // Products page route
        element: <Products />, // Render Products page when this route is matched
      },
      {
        path: "/create-ingredient", // Route to create new ingredient
        element: <CreateIngredient />, // Render CreateIngredient page
      },
      {
        path: "/create-salad", // Route to create new salad
        element: <CreateSalad />, // Render CreateSalad page
      },
      {
        path: "/trivia", // Trivia game route
        element: <Trivia />, // Render Trivia page
      },
    ],
  },
]);

// Router provider component to provide the routing functionality for the app
const PagesRouter = () => {
  return <RouterProvider router={router} />; // Set up RouterProvider with the defined router
};

export default PagesRouter;
