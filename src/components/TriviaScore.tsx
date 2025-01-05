import '../styles/TriviaScore.css'

// Define the props for TriviaScore component
interface TriviaScoreProps {
  score: number; // The user's score
  totalQuestions: number; // The total number of questions in the trivia game
  onRestart: () => void; // Function to restart the game
}

// TriviaScore functional component
const TriviaScore = ({ score, totalQuestions, onRestart }: TriviaScoreProps) => {
  return (
    <div className="trivia-score">
      <h2>Game Over!</h2> {/* Title when the game ends */}
      <p>
        You scored {score} out of {totalQuestions}. {/* Display score and total questions */}
      </p>
      <button className="restart-button" onClick={onRestart}>
        Play Again {/* Button to restart the game */}
      </button>
    </div>
  );
};

export default TriviaScore;
