import { useEffect, useState } from "react";
import { DB, Product } from "../data-providers/Server";
import SearchFilter from "../components/SearchFilter";
import HomeButton from "../components/HomeButton";
import "../styles/Products.css";

// Constant for items per page
const ITEMS_PER_PAGE = 10;

const Products = () => {
  // State hooks for products, loading state, current page, and search term
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch all products from the database
  const updateProducts = async () => {
    setLoading(true);
    try {
      const data = await DB.getAllProducts();
      setProducts(data); // Update the products state with fetched data
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    updateProducts();
  }, []);

  // Function to handle toggling stock status of a product
  const handleToggleStock = async (productId: number) => {
    try {
      const product = await DB.getProductById(productId); // Use the getProductById function to get the product by ID
      if (!product) return;

      await DB.toggleProductInStock(product.id);
      await updateProducts(); // Refresh the products after stock status change
    } catch (error) {
      console.error(`Failed to toggle stock for product ID ${productId}:`, error);
    }
  };

  // Show loading message while data is being fetched
  if (loading) return <div>Loading...</div>;

  // Filter products based on the search term
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)); // Ensure totalPages is at least 1
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="products-page">
      <HomeButton /> {/* Home button to navigate back to landing page */}
      
      {/* Search filter input */}
      <div className="search-filter">
        <SearchFilter
          searchValue={searchTerm}
          onSearchChange={(val: string) => {
            setSearchTerm(val); // Update search term state
            setCurrentPage(1); // Reset to first page when search term changes
          }}
        />
      </div>

      {/* Grid for displaying products */}
      <div className="products-grid">
        {visibleProducts.map((product) => {
          const isSalad = product.ingredients.length > 0;
          const isVeggie = product.ingredients.length === 0;

          return (
            <div
              key={product.id}
              className={`product-card ${product.in_stock ? "" : "out-of-stock"}`}
            >
              <h1>
                {product.title}
                {isSalad && <span className="icon">🧩</span>} {/* Display salad icon */}
              </h1>

              {/* Tooltip for showing ingredients in a salad */}
              {isSalad && (
                <div className="tooltip">
                  {product.ingredients.map((ingredient) => {
                    const ingredientDetails = products.find(
                      (p) => p.id === ingredient.product_id
                    );
                    return (
                      <div key={ingredient.product_id}>
                        {ingredient.quantity} x {ingredientDetails?.title || "Unknown"}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Toggle In Stock button only for veggies */}
              {isVeggie && (
                <button onClick={() => handleToggleStock(product.id)}>Toggle In Stock</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
