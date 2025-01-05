import { useState, useEffect } from "react";
import { DB, Product } from "../data-providers/Server"; // Adjust the import path as necessary
import "../styles/CreateSalad.css";

const CreateSalad = () => {
  // State for ingredients (id and title of selected products)
  const [ingredients, setIngredients] = useState<{ id: number; title: string }[]>([]);
  
  // State for products (available veggies)
  const [products, setProducts] = useState<Product[]>([]);
  
  // State for salad name input
  const [saladName, setSaladName] = useState("");
  
  // State for error and success messages
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch products (only veggies) for the salad ingredients
  const fetchProducts = async () => {
    try {
      const data = await DB.getAllProducts();
      const veggies = data.filter((product) => product.ingredients.length === 0); // Only show ingredients (veggies)
      setProducts(veggies);
    } catch (error) {
      console.error("Failed to fetch products:", error); // Log error if failed to fetch
    }
  };

  // Call the fetchProducts function when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array to run only once after initial render

  // Toggle the selection of ingredients
  const toggleIngredient = (ingredient: { id: number; title: string }) => {
    // If ingredient is already selected, remove it, else add it to the selected list
    if (ingredients.some((ing) => ing.id === ingredient.id)) {
      setIngredients(ingredients.filter((ing) => ing.id !== ingredient.id));
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  // Handle form submission to create a new salad
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    // Validate salad name
    if (saladName.trim() === "") {
      setError("Salad name is required."); // Display error if no salad name is provided
      return;
    }

    // Validate that at least one ingredient is selected
    if (ingredients.length === 0) {
      setError("Please select at least one ingredient."); // Display error if no ingredients are selected
      return;
    }

    // Prepare the new salad object
    const newSalad: Product = {
      id: 0, // Temporary id, will be set in createProduct
      title: saladName, // Salad name from input
      in_stock: true, // Assume the salad is in stock by default (can be updated later)
      ingredients: ingredients.map((ing) => ({ product_id: ing.id, quantity: 1 })), // Map selected ingredients to the required format
    };

    // Try creating the salad through the DB function
    try {
      await DB.createProduct(newSalad);
      setSuccess("Salad created successfully!"); // Display success message
      setSaladName(""); // Reset salad name input
      setIngredients([]); // Clear selected ingredients
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the salad."); // Display error if creation fails
    }
  };

  return (
    <div className="create-salad-page">
      <div className="form-container">
        <h2>Create new salad</h2>
        <form onSubmit={handleSubmit}>
          {/* Ingredients Selection */}
          <div className="ingredients-grid">
            {products.map((product) => (
              <button
                type="button"
                key={product.id}
                className={`ingredient-button ${
                  ingredients.some((ing) => ing.id === product.id) ? "selected" : ""
                }`}
                onClick={() => toggleIngredient({ id: product.id, title: product.title })}
              >
                {product.title}
              </button>
            ))}
          </div>
          
          {/* Salad name input field */}
          <input
            type="text"
            placeholder="Salad name"
            value={saladName}
            onChange={(e) => setSaladName(e.target.value)}
            className="form-input"
          />
          
          {/* Submit button */}
          <button type="submit" className="submit-button">
            Submit
          </button>
          
          {/* Error and success messages */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateSalad;
