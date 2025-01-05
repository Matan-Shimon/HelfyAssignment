import '../styles/TriviaQuestion.css'

// Define the props for TriviaQuestion component
interface TriviaQuestionProps {
  question: string; // The trivia question text
  options: string[]; // The list of possible answer options
  onAnswer: (selectedOption: string) => void; // Function to handle answer selection
}

// TriviaQuestion functional component
const TriviaQuestion = ({ question, options, onAnswer,}: TriviaQuestionProps) => {
  return (
    <div className="trivia-question">
      <h2>{question}</h2> {/* Display the trivia question */}
      <div className="options">
        {/* Render each option as a button */}
        {options.map((option, index) => (
          <button
            key={index} // Key for each option button for proper rendering
            className="option-button"
            onClick={() => onAnswer(option)} // Call the onAnswer function when an option is clicked
          >
            {option} {/* Display the answer option */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TriviaQuestion;
