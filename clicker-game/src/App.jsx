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
    <GameOverlaysRoman gameStatus={gameStatus} onNewGame={newGame} />
  </div>
)
}

function GameOverlaysRoman({gameStatus, onNewGame}) {
  switch (gameStatus) {
    case "newGame":
      return(
        <div className="absolute inset-0 bg-black backdrop-blur bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="bg-gradient-to-br from-roman-gold/20 to-roman-red/20 backdrop-blur-sm p-6 rounded-xl shadow-xl border-2 border-roman-gold">
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

function App() {
  return (
    <StrictMode>
      <div>
        <MySociabble/>
        <RomanNumerals/>
      </div>
    </StrictMode>
  )
}

export default App
