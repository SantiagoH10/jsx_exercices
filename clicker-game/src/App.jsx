import './App.css'
import cma from './assets/cma.png'
import { useState, useRef, useEffect } from 'react'

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


function App() {
  return (
    <div>
      <MySociabble/>
      <RpsGame/>
    </div>
  )
}

export default App
