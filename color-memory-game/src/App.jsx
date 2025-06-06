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

const Gamestates = ['waiting', 'showing', 'playing', 'gameover'];

function GameBoard() {

  const randColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  //State variables
  const [round, setRound] = useState(0);
  const [colorArray, setColorArray] = useState([randColor()]);
  const [computerColorSeq, setComputerColorSeq] = useState([]);
  const [playerColorSeq, setPlayerColorSeq] = useState([]);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [highlightSquare, setHighlightSquare] = useState(null);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [playerCanClick, setPlayerCanClick] = useState(false);
  const [playerPos, setPlayerPos] = useState(null);

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

  function NewRound() {
    setGameStatus('showing');
    setColorArray([...colorArray, randColor()]);
    setRound(round + 1);
    computerColorSeq(randShuffle());
  }

  function handlePlayerClick(i, c) {
  }

  return(
    <div>
        <div>
          <p>Round {round}</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 p-6 bg-gray-100 rounded-xl shadow-lg max-w-sm mx-auto">
          {colorArray.map((c, i) => (
            <button 
              key={i}
              onClick={() => {
                if (gameStatus === "waiting" && i === 0) {
                  NewRound();
                } else if (gameStatus === "playing") {
                  handlePlayerClick(i, c);
                }
              }}
              className={`
                  w-24 h-24 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-150 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer
                  ${gameStatus === "waiting" && i === 0 ? 'ring-2 ring-blue-500' : ''}
                `}
              style={{ backgroundColor: c}}
            >
             {gameStatus === "waiting" && i === 0 && (
                <span className="text-white font-bold text-sm">START</span>
            )} 
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={
              e => setColorArray([...colorArray, randColor()])
            }
          >
            Add color
          </button>
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
