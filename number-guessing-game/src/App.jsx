import { useState, useRef, useEffect } from 'react'
import './App.css'
import cma from './assets/cma.png'

function MySociabble() {
  return(
    <div className="bg-white text-ccblue p-6">
      <h1 className="text-3xl font-semibold mb-4">My Sociabble</h1>
      <img 
        src={cma} 
        alt="CMA CGM Logo" 
        className="w-32 h-auto"
      />
    </div>
  )
}

//#region Number guessing game
function NumberGuessingGame() {

  const min = 1;
  const max = 5;

  function GenRandNum() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //1. State Variables
  const [targetNumber, setTargetNumber] = useState(GenRandNum());
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter') {
        buttonRef.current.click();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //2. Helper Functions
  function GuessCheck(guess) {
    if (!gameOver) {
      setAttempts(attempts+1);
    
      if(parseInt(guess) === targetNumber) {
        setMessage("You guessed the number!");
        setGameOver(true);
      } else {
        setMessage(guess > targetNumber ? "Lower" : "Higher")
      }
    }
  }

  function RestartGame() {
    setTargetNumber(GenRandNum());
    setAttempts(0);
    setMessage("");
    setGameOver(false);
    setCurrentGuess('');
  }

  //3. UI
  return (
    <div 
      className = "bg-green-200 text-ccblue p-6"
      
    >
      <h1>Guess the number ({min} - {max})</h1>
      <input 
        type="number" 
        value={currentGuess}
        placeholder='Enter a number'

        className="disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={gameOver}
        
        onChange={(e) => {
            setCurrentGuess(parseInt(e.target.value))
          }}
      />
      <button 
        ref={buttonRef}
        className={`${gameOver ? 
          "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 btn-restart" 
          : 
          "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 btn-submit"
        } text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200`
        }


        onClick={gameOver ? 
          () => RestartGame()
          :
          () => {
            if (parseInt(currentGuess) >= min && parseInt(currentGuess) <= max) {
              GuessCheck(parseInt(currentGuess));
            } else {
              setMessage("Enter a valid number");
            }
          }
        }
      >
        {gameOver ? "Play again" : "Submit guess"}
      </button>
      <p>{message}</p>
      <p>Attempts : {attempts}</p>
    </div>
  )
}
//#endregion




function App() {
  
  return (
    <div>
      <MySociabble/>
    </div>
  )
}

export default App
