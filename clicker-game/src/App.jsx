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
  new AutoUpgrade(1, "Basic Auto-Clicker", 50, 1),
  new AutoUpgrade(2, "Advanced Auto-Clicker", 200, 5)
];

function ClickerGame() {
  const [points, setPoints] = useState(0);
  const [pointPerClick, setPointsPerClick] = useState(1);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState({click: 0, auto: 0})
  
  function purchaseUpgrade(type, upgradeIndex) {
    if (type === "click") {
      console.log(upgradeIndex);
      if (upgradeIndex >= clickUpgrades.length) return;
      
      setPoints(prevPoints => prevPoints - clickUpgrades[upgradeIndex].cost);
      setPointsPerClick(prevPointPerClick =>
        prevPointPerClick + clickUpgrades[upgradeIndex].improvement
      );
      console.log(upgrades.click);
      setUpgrades(prevUpgrades => ({
        ...prevUpgrades,
        click: prevUpgrades.click + 1
      }));
    } else if (type === "auto") {
      if (upgradeIndex >= autoUpgrades.length) return;
      
      setPoints(prevPoints => prevPoints - autoUpgrades[upgradeIndex].cost);
      setUpgrades(prevUpgrades => ({
        ...prevUpgrades,
        auto: prevUpgrades.auto + 1
      }));
      setPointsPerSecond(prevPointPerSec =>
        prevPointPerSec + autoUpgrades[upgradeIndex].improvement
      );
    }
    console.log(upgrades.click);
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
            Improve click
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}


function App() {
  return (
    <div>
      <MySociabble/>
      <ClickerGame/>
    </div>
  )
}

export default App
