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

function NewRoundOverlay({ onNewRound }) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Round Complete!</h2>
        <button
          onClick={onNewRound}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          New Round
        </button>
      </div>
    </div>
  );
}

function GameOverOverlay({ onNewGame, round }) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{`Game Over :(`}</h2>
        <button
          onClick={onNewGame}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          New Game
        </button>
        <p className="text-lg font-semibold text-gray-700 m-4 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
          Score: {round}
        </p>
      </div>
    </div>
  );
}



function GameBoard() {

  const randColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  //State variables
  const [round, setRound] = useState(0);
  const [colorArray, setColorArray] = useState([randColor()]);
  const [computerColorSeq, setComputerColorSeq] = useState([]);
  const [playerColorSeq, setPlayerColorSeq] = useState([]);
  const [gameStatus, setGameStatus] = useState('wait-game-start');
  const [highlightSquare, setHighlightSquare] = useState(null);
  const [playerPos, setPlayerPos] = useState(null);

  //useEffect hooks
  useEffect(() => {
    if (gameStatus === 'showing') {
      const shuffledSequence = randShuffle();
      setComputerColorSeq(shuffledSequence);
      console.log(computerColorSeq);
      showSequence(shuffledSequence);
    }
  }, [colorArray]);

  //Helper functions
  function randShuffle() {
    const indices = Array.from({length: colorArray.length}, (_, i) => i);
    
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap
    }

    return indices;
  }

  function showNextSquare(index, shuffledSequence) {
    if (index >= shuffledSequence.length) {
      setHighlightSquare(null);
      setGameStatus('playing');
      return;
    }

    setHighlightSquare(shuffledSequence[index]);

    setTimeout(() => {
      setHighlightSquare(null);

      setTimeout(() => {
        showNextSquare(index + 1, shuffledSequence);
      }, 200);

    }, 800);
  }  

  function showSequence(shuffledSequence) {
    showNextSquare(0, shuffledSequence); // Start the recursive sequence
  }

  function NewRound() {
    console.log("New round called");
    setGameStatus('showing');
    setRound(round + 1);
    setColorArray([...colorArray, randColor()]);
  }


  function handlePlayerClick(i, c) {
    setPlayerPos(prevPos => {
      const newPos = prevPos + 1;
      if (i === parseInt(computerColorSeq[newPos - 1])) {
        if(newPos === computerColorSeq.length) {
          setGameStatus('wait-new-round');
          console.log("correct sequence");
          return null;
        }
        console.log("correct color, continue");
        return newPos;
      } else {
        setGameStatus('game-over');
        return newPos;
      }
    });
  }

  function NewGame() {
    setRound(0);
    setColorArray([randColor()]);
    setComputerColorSeq([]);
    setPlayerColorSeq([]);
    setGameStatus('wait-game-start');
    setPlayerPos(null);
    setHighlightSquare(null);
  }


  return(
    <div className="m-8">
        <div>
          <p className="text-white text-2xl font-bold mb-6 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full shadow-lg text-center inline-block mx-auto transform hover:scale-105 transition-transform duration-200">
            {round === 0 ? "" : `Round ${round}`}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 p-6 bg-gray-100 rounded-xl shadow-lg max-w-sm mx-auto">
          {colorArray.map((c, i) => (
            <button 
              key={i}
              onClick={(e) => {
                e.target.blur();
                if (gameStatus === "wait-game-start" && i === 0) {
                  NewRound();
                } else if (gameStatus === "playing") {
                  handlePlayerClick(i, c);
                }
              }}
              className={`
                  w-24 h-24 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-150 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer
                  ${(gameStatus === "wait-game-start" && i === 0) ? 'ring-2 ring-blue-500' : ''}
                  ${highlightSquare === i ? 'ring-4 ring-yellow-300' : ''}
              `}
              style={{ backgroundColor: c}}
            >
             {gameStatus === "wait-game-start" && i === 0 && (
                <span className="text-white font-bold text-sm">START</span>
            )} 
            </button>
          ))}
          {gameStatus === "wait-new-round" && (
            <NewRoundOverlay onNewRound={NewRound} />
          )}
          {gameStatus === "game-over" && (
            <GameOverOverlay onNewGame={NewGame} round = {round} />
          )}
        </div>
    </div>
  )
}

function App() { 
  return (
    <div>
      <MySociabble/>
      <GameBoard />
    </div>
  )
}

export default App
