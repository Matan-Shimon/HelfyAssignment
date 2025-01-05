import "../styles/SearchFilter.css"; // Import the search filter styles

// Define the type for the props that the SearchFilter component will accept
interface SearchFilterProps {
  searchValue: string; // The current search value to be displayed in the input field
  onSearchChange: (newValue: string) => void; // Function to handle the change in search input
}

// Functional component for the search filter input
const SearchFilter = ({ searchValue, onSearchChange }: SearchFilterProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}> {/* Styling to add margin below the search bar */}
      <label> {/* Label for the search input */}
        <input
          type="text" // Input field for the search query
          value={searchValue} // Value of the input is bound to the searchValue prop
          placeholder="Search products by title here... " // Placeholder text when the input is empty
          onChange={(e) => onSearchChange(e.target.value)} // Trigger the onSearchChange function on every input change
        />
      </label>
    </div>
  );
}

export default SearchFilter;
