import React, { useState } from "react";
import { DB, Product } from "../data-providers/Server"; // Import DB and Product types from the server
import "../styles/CreateIngredient.css"; // Import the CSS for the Create Ingredient page

const CreateIngredient = () => {
  // State to store the title of the ingredient
  const [title, setTitle] = useState("");

  // State to manage whether the ingredient is in stock
  const [inStock, setInStock] = useState(true);

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // State for success messages
  const [success, setSuccess] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from refreshing the page on submit

    setError(null); // Reset error message
    setSuccess(null); // Reset success message

    // Validate that the title is not empty
    if (title.trim() === "") {
      setError("Title is required."); // Set an error message if title is empty
      return;
    }

    // Create a new ingredient object
    const newIngredient: Product = {
      id: 0, // Temporary, will be set when creating the product in the DB
      title: title,
      in_stock: inStock, // Set stock status
      ingredients: [], // Ingredients are empty for a standalone ingredient
    };

    try {
      // Attempt to create the new product in the database
      await DB.createProduct(newIngredient);
      setSuccess("Ingredient created successfully!"); // Show success message
      setTitle(""); // Clear the input field
      setInStock(true); // Reset the inStock state to true
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the ingredient."); // Show error message if the creation fails
    }
  };

  return (
    <div className="create-ingredient-page">
      <div className="form-container">
        <h2>Create new Ingredient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title as the user types
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>

        {/* Show error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        {/* Show success message if the ingredient is created successfully */}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default CreateIngredient;
