import { useEffect, useState } from "react";
import { DB, Question } from "../data-providers/Server"; // Importing DB to fetch questions and the Question type
import TriviaQuestion from "../components/TriviaQuestion"; // Import TriviaQuestion component for displaying questions
import TriviaScore from "../components/TriviaScore"; // Import TriviaScore component to display the final score
import HomeButton from "../components/HomeButton"; // Import HomeButton component to navigate back to the homepage
import "../styles/Trivia.css" // Importing the styles for this component

const Trivia = () => {
  // State for storing questions, current question index, score, game over status, and loading status
  const [questions, setQuestions] = useState<Question[]>([]); // Array to store the trivia questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [score, setScore] = useState(0); // Player's score
  const [gameOver, setGameOver] = useState(false); // Boolean to check if the game is over
  const [loading, setLoading] = useState(true); // Boolean to track loading state

  // Fetch questions from the mock database
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading state to true
      try {
        const fetchedQuestions = await DB.getQuestions(); // Get questions from the mock DB
        setQuestions(fetchedQuestions); // Set the fetched questions to state
      } catch (error) {
        console.error("Failed to load questions:", error); // Log any error during fetch
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };
    fetchQuestions(); // Call the function to fetch questions
  }, []); // Empty dependency array to run once on component mount

  // Handle the answer selection by the user
  const handleAnswer = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex]; // Get the current question

    // If the selected option matches the correct answer, increment the score
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question if available
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex); // Go to the next question
    } else {
      setGameOver(true); // If no more questions, end the game
    }
  };

  // Restart the trivia game
  const handleRestart = () => {
    setCurrentQuestionIndex(0); // Reset question index
    setScore(0); // Reset score
    setGameOver(false); // Reset game over status
  };

  // Show loading message while fetching questions
  if (loading) return <div>Loading...</div>;

  // Render the Trivia component
  return (
    <div className="trivia-container">
      <HomeButton/> {/* Display home button to go back to the landing page */}
      
      {gameOver ? (
        // Display the score and restart option when the game is over
        <TriviaScore
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        // Display the current question and answer options if the game is not over
        <TriviaQuestion
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Trivia;
