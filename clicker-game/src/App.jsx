//#region Imports - My Sociabble
import './App.css'
import cma from './assets/cma.png'
import { useState, useRef, useEffect, StrictMode } from 'react'

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
//#endregion

//#region Clicker game
class ClickUpgrade {
  constructor(level, name, cost, improvement) {
    this.level = level,
    this.name = name,
    this.cost = cost,
    this.improvement = improvement,
    this.improvShop = `+${improvement} clicks`
  }
}

class AutoUpgrade {
  constructor(level, name, cost, improvement) {
    this.level = level;
    this.name = name;
    this.cost = cost;
    this.improvement = improvement;
    this.improvShop = `+${improvement} per second`;
  }
}

const clickUpgrades = [
  new ClickUpgrade(1, "Power click", 10, 1), 
  new ClickUpgrade(2, "Click master", 20, 3)
];

const autoUpgrades = [
  new AutoUpgrade(1, "Basic Auto-Clicker", 10, 1),
  new AutoUpgrade(2, "Advanced Auto-Clicker", 20, 5)
];

function ClickerGame() {
  const [points, setPoints] = useState(0);
  const [pointPerClick, setPointsPerClick] = useState(1);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState({click: 0, auto: 0});

  useEffect(() => {
    if (pointsPerSecond > 0) {
      const intervalId = setInterval(() => {
        setPoints(prevPoints => prevPoints + pointsPerSecond);
      }, 1000);
      
      return () => clearInterval(intervalId);
    }
  }, [pointsPerSecond]);

  function purchaseUpgrade(type, upgradeIndex) {
    if (type === "click") {      
      setPoints(prevPoints => prevPoints - clickUpgrades[upgradeIndex].cost);
      setPointsPerClick(prevPointPerClick =>
        prevPointPerClick + clickUpgrades[upgradeIndex].improvement
      );
      setUpgrades(prevUpgrades => ({
        ...prevUpgrades,
        click: prevUpgrades.click + 1
      }));
    } else if (type === "auto") {      
      setPoints(prevPoints => prevPoints - autoUpgrades[upgradeIndex].cost);
      setUpgrades(prevUpgrades => ({
        ...prevUpgrades,
        auto: prevUpgrades.auto + 1
      }));
      setPointsPerSecond(prevPointPerSec =>
        prevPointPerSec + autoUpgrades[upgradeIndex].improvement
      );
    }
  }

  return(
    <div className="flex">
      <div className="m-4 bg-white p-12 rounded-lg shadow-lg border border-gray-200 w-96 h-96 flex flex-col items-center justify-center">
        <p className="text-1xl font-bold text-gray-800 mb-8 text-center">
          Welcome
        </p>
        <p className="text-1xl font-bold text-gray-800 mb-8 text-center">
          Total points : {points}
        </p>
        <button 
          className="w-24 h-24 bg-blue-500 hover:bg-blue-600 active:scale-90 text-white font-semibold rounded-full transition-transform duration-25 ease-out shadow-md hover:shadow-lg flex items-center justify-center transform hover:scale-105 select-none"
          onClick={()=>setPoints(prevPoints => prevPoints + pointPerClick)}
        >
          Click Me!
        </button>
      </div>
      <div id="shop container" className="m-4 bg-white p-12 rounded-lg shadow-lg border border-gray-200 w-64 h-96 flex-column justify-center">
        <p className="text-1xl font-bold text-gray-800 mb-8 text-center">
          Shop
        </p>
        <div className="bg-gray-50 p-4 mb-1 rounded-md border border-gray-100 space-y-4">
          <p className="text-xl font-bold text-gray-800 mb-4">
            Click upgrade
          </p>
          <p className="text-base font-bold text-gray-800 mb-4">
            {upgrades.click < clickUpgrades.length ? clickUpgrades[upgrades.click].name : clickUpgrades[upgrades.click-1].name}
          </p>
          <p className="text-sm font-bold text-gray-800 mb-4">
            {upgrades.click < clickUpgrades.length ? clickUpgrades[upgrades.click].improvShop : clickUpgrades[upgrades.click-1].improvShop}
          </p>
          <p className="text-xs font-bold text-gray-800 mb-4">
            {upgrades.click < clickUpgrades.length ? `Cost : ${clickUpgrades[upgrades.click].cost} clicks` : `Cost : ${clickUpgrades[upgrades.click-1].cost} clicks`}
          </p>
          <button 
            disabled={upgrades.click >= clickUpgrades.length || points < clickUpgrades[upgrades.click].cost}
            className={upgrades.click < clickUpgrades.length && points >= clickUpgrades[upgrades.click].cost
              ? "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
              : "bg-gray-400 text-gray-600 cursor-not-allowed font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
            }
            onClick={() => purchaseUpgrade("click", upgrades.click)}
          >
            {upgrades.click < clickUpgrades.length ? "Buy" : "Max level"}
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-100 space-y-4">
          <p className="text-xl font-bold text-gray-800 mb-4">
            Auto click
          </p>
          <button 
            disabled={upgrades.auto >= autoUpgrades.length || points < autoUpgrades[upgrades.auto].cost}
            className={upgrades.auto < autoUpgrades.length && points >= autoUpgrades[upgrades.auto].cost
              ? "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
              : "bg-gray-400 text-gray-600 cursor-not-allowed font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
            }
            onClick={() => purchaseUpgrade("auto", upgrades.auto)}
          >
            {upgrades.auto < autoUpgrades.length ? "Buy" : "Max level"}
          </button>
        </div>
      </div>
    </div>
  )
}
//#endregion

//#region Rock-Paper-Scissors
const getEmoji = (choice) => {
  const emojis = {
    0: '🪨', // Rock
    1: '📄', // Paper  
    2: '✂️'  // Scissors
  };
  return emojis[choice];
};

const GameResult = ({ outcome, playerX, computerX }) => {
  const getResultText = () => {
    if (outcome === 1) return 'You Win!';
    if (outcome === 2) return 'You Lose!';
    return 'Tie!';
  };

  return (
    <div className="mt-4 p-4 bg-gray-500 rounded-lg">
      <h2 className="text-xl font-bold text-center">{getResultText()}</h2>
      <p className="text-center">
        You: {getEmoji(playerX)} vs Computer: {getEmoji(computerX)}
      </p>
    </div>
  );
};



function RpsGame() {
  
  const rockID = 0;
  const paperID = 1;
  const scissorsID = 2;


  function randRps() {
    return Math.floor(Math.random() * 3);
  }

  const [gameStatus, setGameStatus] = useState('new-game');
  const [score, setScore] = useState({player: 0, computer: 0});
  const [playerX, setPlayerX] = useState(null);
  const [round, setRound] = useState(0);
  const [gameResult, setGameResult] = useState(null);

  const winCode = (player, computer) => {
    return (player - computer + 3) % 3
  }

  useEffect(() => {
    if (playerX !== null) {
      const computerX = randRps();
      const outcome = winCode(playerX, computerX);

      setScore(prev => {
        if (outcome === 1) {
          return { ...prev, player: prev.player + 1 };
        } else if (outcome === 2) {
          return { ...prev, computer: prev.computer + 1 };
        } else {
          return prev;
        }
      });

      setGameResult( {outcome, playerX, computerX});
      setGameStatus('new-round');
  }},[playerX]);

  function newRound() {
    setRound(prevRound => prevRound + 1);
    setPlayerX(null);
    setGameStatus('play');
  }

  return(
    <div className="m-4 bg-white p-12 rounded-lg shadow-lg border border-gray-200 w-auto h-auto flex flex-col items-center justify-center">
      <p className="text-xl font-bold text-gray-800 mb-4">
        RPS VS. COMPUTER
      </p>
      <p className="text-xl font-bold text-gray-800 mb-4">
        Player score: {score.player}
      </p>
      <p className="text-xl font-bold text-gray-800 mb-4">
        Computer score: {score.computer}
      </p>
      <div className="relative m-4 bg-red-200 p-12 rounded-lg shadow-lg border border-gray-200 w-auto h-auto flex flex-col items-center justify-center">
        <button 
          disabled={gameStatus !== 'play'}
          className={gameStatus !== 'play'
            ? "bg-gray-400 text-gray-600 cursor-not-allowed font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
            : "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
          }
          onClick={() => setPlayerX(rockID)}
        >
          Rock
        </button>
        <button 
          disabled={gameStatus !== 'play'}
          className={gameStatus !== 'play'
            ? "m-2 bg-gray-400 text-gray-600 cursor-not-allowed font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
            : "m-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
          }
          onClick={() => setPlayerX(paperID)}
        >
          Paper
        </button>
        <button 
          disabled={gameStatus !== 'play'}
          className={gameStatus !== 'play'
            ? "bg-gray-400 text-gray-600 cursor-not-allowed font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
            : "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
          }
          onClick={() => setPlayerX(scissorsID)}
        >
          Scissors
        </button>
      {round === 0 || gameStatus === 'new-round' ? 
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-blue-500">
            <button 
              onClick={() => newRound()}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              {round === 0 ? "Start Game" : "New Round"}
            </button>
          </div>
        </div>
      : ''}
      </div>
      {gameResult && gameStatus !== "play" && (
        <GameResult
          outcome={gameResult.outcome}
          playerX={gameResult.playerX}
          computerX={gameResult.computerX}
        />
      )}
    </div>
  )
}
//#endregion

//#region Word Scramble

const word = "word"

const gameOverlays = {
  newGame : "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg",
  gameWon : "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg",
  gameOver : "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg"
}

function WordScramble() {
  function randShuffle(word) {
    const indices = Array.from({length: word.length}, (_, i) => i);
    
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap
    }
    return indices;
  }
  
  const [gameStatus, setGameStatus] = useState("newGame");
  const [wordOrder, setWordOrder] = useState(randShuffle(word));
  const [playerWord, setPlayerWord] = useState("");
  const [clickedIndices, setClickedIndices] = useState([])

  useEffect(() => {
    if (playerWord.length === word.length) {
      playerWord === word ? setGameStatus("gameWon") : setGameStatus("gameOver")
    }
  }, [playerWord]);

  function newGame() {
    setGameStatus("play");
    setPlayerWord("");
    setWordOrder(randShuffle(word));
    setClickedIndices([]);
  }

  function resetWord() {
    setPlayerWord("");
    setClickedIndices([]);
  }

  return(
    <div className="m-4 bg-white p-12 rounded-lg shadow-lg border border-gray-200 w-auto h-auto flex flex-col items-center justify-center">
      <p className="text-xl font-bold text-gray-800 mb-4">Word Scramble</p>
      <div>
        <div id="wordGaps" className="flex flex-row items-center justify-center mb-4">          {word.split('').map((_, index) => (
            <div className="w-8 h-10 border-b-2 border-gray-400 flex items-end justify-center text-xl font-bold text-gray-800 mx-1" key={index}>
              {playerWord[index] || ""}
            </div>
          ))}
        </div>
        <div id="buttonContainer" className="flex flex-row gap-3 items-center justify-center flex-wrap">
          {wordOrder.map(i => {
            return(<button 
              disabled={gameStatus !== "play" || clickedIndices.includes(i)}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xl min-w-[3rem] min-h-[3rem] flex items-center justify-center cursor-pointer select-none disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-400 disabled:hover:scale-100"
              key={i}
              onClick={()=>{
                setPlayerWord(prev => prev + word[i]);
                setClickedIndices(prev => [...prev, i]);
              }}
            >
              {word[i]}
            </button>)
          })}
        </div>
        <button
          className = "relative top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm"
          onClick={() => resetWord()}>
          Reset
        </button>
        <GameOverlays gameStatus={gameStatus} onNewGame={newGame} />
      </div>
    </div>
  )
}

function GameOverlays({gameStatus, onNewGame}) {
  switch (gameStatus) {
    case "newGame":
      return(
        <div className={gameOverlays[gameStatus]}>
          <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-blue-500">
            <button
              className="bg-blue-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
              onClick={()=>onNewGame()}
            >
              Start game
            </button>
          </div>
        </div>
      );
    
    case "gameWon":
      return(
        <div className={gameOverlays[gameStatus]}>
          <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-blue-500">
            <p className="text-gray-600">
              Correct! The word is indeed {word}.
            </p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
              onClick={()=>onNewGame()}
            >
              New game
            </button>
          </div>
        </div>
      )
      
    case "gameOver":
      return(
        <div className={gameOverlays[gameStatus]}>
          <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-blue-500">
            <p className="text-gray-600">
              You suck! The word was {word}.
            </p>
            <button
              className="bg-red-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
              onClick={()=>onNewGame()}
            >
              Next word
            </button>
          </div>
        </div>
      )
  }
  
}
//#endregion

//#region Color Memory Game
function NewRoundOverlay({ onNewRound }) {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-50 animate-fadeIn">
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-ping animation-delay-2000"></div>
      </div>

      <div className="relative transform scale-95 animate-slideUp">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl scale-110"></div>
        
        {/* Main container */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10 text-center min-w-80">
          {/* Success icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Round Complete!
          </h2>
          
          <p className="text-white/80 text-lg mb-8 font-medium">
            Great memory! Ready for the next challenge?
          </p>

          <button
            onClick={onNewRound}
            className="group relative px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-lg rounded-2xl shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300/50 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative flex items-center justify-center gap-2">
              Next Round
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GameOverOverlay({ onNewGame, round }) {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-50 animate-fadeIn">
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-50 animate-ping animation-delay-2000"></div>
      </div>

      <div className="relative transform scale-95 animate-slideUp">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-orange-500/20 to-pink-500/20 rounded-3xl blur-xl scale-110"></div>
        
        {/* Main container */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-10 text-center min-w-80">
          {/* Game over icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-red-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Game Over
          </h2>
          
          <p className="text-white/80 text-lg mb-6 font-medium">
            Don't worry, practice makes perfect!
          </p>

          {/* Score display */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-6 py-4">
                <p className="text-sm font-medium text-white/70 mb-1">Final Score</p>
                <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {round}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onNewGame}
            className="group relative px-10 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white font-bold text-lg rounded-2xl shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300/50 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative flex items-center justify-center gap-2">
              Try Again
              <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}



function ColorMemoryGame() {

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
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex flex-col items-center justify-center">
  {/* Background decoration */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  <div className="relative z-10 w-full max-w-md mx-auto">
    {/* Round Counter */}
    <div className="flex justify-center mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75"></div>
        <p className="relative text-white text-3xl font-black tracking-wide px-8 py-4 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl text-center border border-white/20">
          {round === 0 ? (
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Memory Game
            </span>
          ) : (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Round {round}
            </span>
          )}
        </p>
      </div>
    </div>

    {/* Game Container */}
    <div className="relative">
      {/* Glass container background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
      
      {/* Game Grid */}
      <div className="relative p-8">
        <div className="grid grid-cols-2 gap-6 justify-items-center">
          {colorArray.map((c, i) => (
            <div key={i} className="relative group">
              {/* Button glow effect */}
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-300
                ${highlightSquare === i 
                  ? 'bg-yellow-400/50 blur-xl scale-110' 
                  : 'bg-white/10 blur-lg scale-95 group-hover:scale-105'
                }
              `}></div>
              
              <button 
                onClick={(e) => {
                  e.target.blur();
                  if (gameStatus === "wait-game-start" && i === 0) {
                    NewRound();
                  } else if (gameStatus === "playing") {
                    handlePlayerClick(i, c);
                  }
                }}
                className={`
                  relative w-28 h-28 rounded-2xl shadow-xl transform transition-all duration-200 border-2 border-white/30
                  focus:outline-none cursor-pointer overflow-hidden group
                  hover:scale-105 hover:shadow-2xl hover:border-white/50
                  active:scale-95 active:shadow-inner
                  ${(gameStatus === "wait-game-start" && i === 0) ? 'ring-4 ring-cyan-400/60 animate-pulse' : ''}
                  ${highlightSquare === i ? 'ring-4 ring-yellow-400/80 scale-110 shadow-yellow-400/50' : ''}
                `}
                style={{ 
                  backgroundColor: c,
                  boxShadow: `0 8px 32px ${c}40, inset 0 2px 4px rgba(255,255,255,0.2)`
                }}
              >
                {/* Inner highlight */}
                <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                
                {/* Start button text */}
                {gameStatus === "wait-game-start" && i === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-lg drop-shadow-lg tracking-wider">
                      START
                    </span>
                  </div>
                )}

                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-150"></div>
              </button>
            </div>
          ))}
        </div>

        
      </div>
      {gameStatus === "wait-new-round" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <NewRoundOverlay onNewRound={NewRound} />
          </div>
        )}
        
        {gameStatus === "game-over" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <GameOverOverlay onNewGame={NewGame} round={round} />
          </div>
        )}
    </div>

    {/* Game Instructions */}
    <div className="mt-8 text-center">
      <p className="text-white/80 text-sm font-medium backdrop-blur-sm bg-black/20 rounded-xl px-4 py-2 border border-white/10">
        {gameStatus === "wait-game-start" && "Click START to begin the memory challenge"}
        {gameStatus === "playing" && "Watch the sequence, then repeat it"}
        {gameStatus === "wait-new-round" && "Get ready for the next round"}
        {gameStatus === "game-over" && "Challenge yourself to beat your score"}
      </p>
    </div>
  </div>
</div>
  )
}
//#endregion

//#region Roman Numerals

const romanSigns = ["I", "V", "X", "L", "C", "D", "M"];

function RomanNumerals() {
  function randNum() {
    const max = 2000;
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function decimalToRoman(num) {
    let roman = "";
    let times = 0;
    const mapping = {
      values : [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
      romans : ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
    }

    for(let i = 0; i < mapping.values.length; i++) {
      if (num / mapping.values[i] >= 1) {
        times = Math.floor(num / mapping.values[i]);
        roman += mapping.romans[i].repeat(times);
        num = num % mapping.values[i];
      }
    }
    console.log(roman);
    return roman;
  }

  const [gameStatus, setGameStatus] = useState("newGame");
  const [decimal, setDecimal] = useState(() => randNum());
  const [roman, setRoman] = useState(() => {
    const num = randNum();
    return decimalToRoman(num);
  });
  const [playerRoman, setPlayerRoman] = useState("");
  const [w, setW] = useState(false);

  useEffect(() => {
    if (playerRoman === roman) {
      setW(true);
      setTimeout(() => {
        newGame();
      }, 500);
    }
  }, [playerRoman]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameStatus !== "play") return;

      const key = event.key.toUpperCase();

      if (event.key === "Backspace" || event.key === "Delete") {
        setPlayerRoman(prev => prev.slice(0, -1));
        event.preventDefault();
        return;
      }

      if (romanSigns.includes(key)) {
        setPlayerRoman(prev => prev + key);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };

  }, [gameStatus, romanSigns]);

  function newGame() {
    setGameStatus("play");
    setPlayerRoman("");
    const newDecimal = randNum();
    setDecimal(newDecimal);
    setRoman(decimalToRoman(newDecimal));
    setW(false);
  }

  function resetNum() {
    setPlayerRoman("");
    const newDecimal = randNum();
    setDecimal(newDecimal);
    setRoman(decimalToRoman(newDecimal));
  }

  return(
  <div className="relative m-4 bg-yellow-100 p-12 rounded-lg shadow-lg border-2 border-roman-gold w-auto h-auto flex flex-col items-center justify-center">
    <p className="text-xl font-bold text-roman-red mb-4">Roman Numerals Training</p>
    <div>
      <div className="bg-roman-red/10 border-t-2 border-b-2 border-roman-gold py-4 px-8 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-roman-gold after:absolute after:right-0 after:top-0 after:bottom-0 after:w-1 after:bg-roman-gold">
        <p className="text-4xl text-roman-red font-bold text-center">
          {decimal}
        </p>
      </div>
      <div className={`p-2 m-5 rounded-lg min-h-[4rem] flex items-center justify-center transition-all duration-500 ${
          w 
            ? "bg-green border-2 border-solid border-roman-gold shadow-lg shadow-roman-gold/50" 
            : "bg-roman-red/5 border-2 border-dashed border-roman-gold/50"
        }`}
        >
        <p className="text-4xl text-roman-gold/70 font-bold">
          {playerRoman === "" ? "?" : playerRoman}
        </p>
      </div>
      <div id="buttonContainer" className="flex flex-row gap-3 items-center justify-center flex-wrap p-4">
        {romanSigns.map(s => {
          return(<button 
            disabled={gameStatus !== "play"}
            className="bg-roman-red hover:bg-roman-red/80 active:bg-roman-red/90 text-roman-gold font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xl min-w-[3rem] min-h-[3rem] flex items-center justify-center cursor-pointer select-none disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-400 disabled:hover:scale-100 border border-roman-gold"
            key={s}
            onClick={()=>{
              setPlayerRoman(prev => prev + s);
            }}
          >
            {s}
          </button>)
        })}
      </div>
      <button
        className = "relative bg-roman-gold hover:bg-roman-gold/80 text-roman-red font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm border border-roman-red"
        onClick={() => resetNum()}>
        Change number
      </button>
    </div>
    <GameOverlaysRoman gameStatus={gameStatus} onNewGame={newGame}/>
  </div>
)
}

function GameOverlaysRoman({gameStatus, onNewGame, isInverted = false}) {
  switch (gameStatus) {
    case "newGame":
      return(
        <div className="absolute inset-0 bg-black backdrop-blur bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="bg-gradient-to-br from-roman-gold/20 to-roman-red/20 backdrop-blur-sm p-6 rounded-xl shadow-xl border-2 border-roman-gold flex flex-col items-center">
        <p className="text-xl font-bold text-roman-gold mb-4 text-center">
          {isInverted ? "Roman Numerals to Decimal" : "Decimal to Roman Numerals"}
        </p>
        <button
          className="bg-roman-red hover:bg-roman-red/80 text-roman-gold font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg border border-roman-gold"
          onClick={()=>onNewGame()}
        >
          Start game
        </button>
          </div>
        </div>
      );
    }
}
//#endregion

//#region Inverted RomanNumerals (roman to decimal)
function InvertedRomanNumerals() {
  function randNum() {
    const max = 2000;
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function decimalToRoman(num) {
    let roman = "";
    let times = 0;
    const mapping = {
      values : [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
      romans : ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
    }

    for(let i = 0; i < mapping.values.length; i++) {
      if (num / mapping.values[i] >= 1) {
        times = Math.floor(num / mapping.values[i]);
        roman += mapping.romans[i].repeat(times);
        num = num % mapping.values[i];
      }
    }
    console.log(roman);
    return roman;
  }

  const [gameStatus, setGameStatus] = useState("newGame");
  const [decimal, setDecimal] = useState(() => randNum());
  const [roman, setRoman] = useState(() => {
    const num = randNum();
    return decimalToRoman(num);
  });
  const [playerRoman, setPlayerRoman] = useState("");
  const [w, setW] = useState(false);

  useEffect(() => {
    if (playerRoman === roman) {
      setW(true);
      setTimeout(() => {
        newGame();
      }, 500);
    }
  }, [playerRoman]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameStatus !== "play") return;

      const key = event.key.toUpperCase();

      if (event.key === "Backspace" || event.key === "Delete") {
        setPlayerRoman(prev => prev.slice(0, -1));
        event.preventDefault();
        return;
      }

      if (romanSigns.includes(key)) {
        setPlayerRoman(prev => prev + key);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };

  }, [gameStatus, romanSigns]);

  function newGame() {
    setGameStatus("play");
    setPlayerRoman("");
    const newDecimal = randNum();
    setDecimal(newDecimal);
    setRoman(decimalToRoman(newDecimal));
    setW(false);
  }

  function resetNum() {
    setPlayerRoman("");
    const newDecimal = randNum();
    setDecimal(newDecimal);
    setRoman(decimalToRoman(newDecimal));
  }

  return(
  <div className="relative m-4 bg-yellow-100 p-12 rounded-lg shadow-lg border-2 border-roman-gold w-auto h-auto flex flex-col items-center justify-center">
    <p className="text-xl font-bold text-roman-red mb-4">Roman Numerals Training</p>
    <div>
      <div className="bg-roman-red/10 border-t-2 border-b-2 border-roman-gold py-4 px-8 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-roman-gold after:absolute after:right-0 after:top-0 after:bottom-0 after:w-1 after:bg-roman-gold">
        <p className="text-4xl text-roman-red font-bold text-center">
          {decimal}
        </p>
      </div>
      <div className={`p-2 m-5 rounded-lg min-h-[4rem] flex items-center justify-center transition-all duration-500 ${
          w 
            ? "bg-green border-2 border-solid border-roman-gold shadow-lg shadow-roman-gold/50" 
            : "bg-roman-red/5 border-2 border-dashed border-roman-gold/50"
        }`}
        >
        <p className="text-4xl text-roman-gold/70 font-bold">
          {playerRoman === "" ? "?" : playerRoman}
        </p>
      </div>
      <div id="buttonContainer" className="flex flex-row gap-3 items-center justify-center flex-wrap p-4">
        {romanSigns.map(s => {
          return(<button 
            disabled={gameStatus !== "play"}
            className="bg-roman-red hover:bg-roman-red/80 active:bg-roman-red/90 text-roman-gold font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xl min-w-[3rem] min-h-[3rem] flex items-center justify-center cursor-pointer select-none disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-400 disabled:hover:scale-100 border border-roman-gold"
            key={s}
            onClick={()=>{
              setPlayerRoman(prev => prev + s);
            }}
          >
            {s}
          </button>)
        })}
      </div>
      <button
        className = "relative bg-roman-gold hover:bg-roman-gold/80 text-roman-red font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm border border-roman-red"
        onClick={() => resetNum()}>
        Change number
      </button>
    </div>
    <GameOverlaysRoman gameStatus={gameStatus} onNewGame={newGame} isInverted={true}/>
  </div>
)
}

//#endregion

//#region NumeralSwitch
function NumeralsSwitch() {
  const [isInverted, setIsInverted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Main Title */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-orange-400/20 blur-2xl rounded-full"></div>
            <h1 className="relative text-5xl font-black bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 tracking-tight">
              Roman Numerals
            </h1>
            <p className="text-amber-600/80 text-lg font-medium">Ancient Numbers, Modern Converter</p>
          </div>
          
          {/* Enhanced Toggle Switch Container */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative bg-white/80 backdrop-blur-sm p-3 rounded-3xl shadow-2xl border border-amber-200/50 hover:shadow-amber-200/50 transition-all duration-300">
              {/* Background slider with glow effect */}
              <div className={`
                absolute top-3 w-1/2 h-14 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-2xl shadow-lg transition-all duration-400 ease-out
                ${isInverted ? 'translate-x-full' : 'translate-x-0'}
              `}>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-orange-400/50 rounded-2xl blur-md"></div>
              </div>
              
              {/* Decimal to Roman Button */}
              <button 
                className={`
                  relative z-10 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ease-out min-w-48 mx-1 group
                  ${!isInverted 
                    ? 'text-white drop-shadow-lg' 
                    : 'text-amber-800 hover:text-amber-900 hover:bg-amber-50/50'
                  }
                `}
                onClick={() => setIsInverted(false)}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg">123</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                  <span className="font-serif text-lg">CXXIII</span>
                </span>
              </button>
              
              {/* Roman to Decimal Button */}
              <button 
                className={`
                  relative z-10 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ease-out min-w-48 mx-1 group
                  ${isInverted 
                    ? 'text-white drop-shadow-lg' 
                    : 'text-amber-800 hover:text-amber-900 hover:bg-amber-50/50'
                  }
                `}
                onClick={() => setIsInverted(true)}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="font-serif text-lg">CXXIII</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                  <span className="text-lg">123</span>
                </span>
              </button>
            </div>
          </div>
          
          {/* Enhanced Mode Description */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-2xl blur-sm"></div>
            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-amber-200/30 inline-block">
              <p className="text-amber-800 text-base font-semibold flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                {isInverted 
                  ? "Transform Roman numerals into modern decimal numbers" 
                  : "Convert modern numbers into ancient Roman numerals"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Content Section with enhanced transitions */}
        <div className="relative min-h-96">
          {/* Decimal to Roman Content */}
          <div className={`
            transition-all duration-600 ease-in-out transform
            ${!isInverted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 absolute inset-0 pointer-events-none'}
          `}>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200/50 p-8">
              <RomanNumerals />
            </div>
          </div>
          
          {/* Roman to Decimal Content */}
          <div className={`
            transition-all duration-600 ease-in-out transform
            ${isInverted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 absolute inset-0 pointer-events-none'}
          `}>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200/50 p-8">
              <InvertedRomanNumerals />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//#endregion

function App() {
  return (
    <StrictMode>
      <div>
        <MySociabble/>
        <ColorMemoryGame/>
        <NumeralsSwitch/>
      </div>
    </StrictMode>
  )
}

export default App
