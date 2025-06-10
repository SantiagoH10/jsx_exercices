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

function ClickerGame() {
  const [points, setPoints] = useState(0);
  const [pointPerClick, setPointsPerClick] = useState(1);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);
  
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
      <div className="m-4 bg-white p-12 rounded-lg shadow-lg border border-gray-200 w-32 h-96 flex items-center justify-center">
        <p className="text-1xl font-bold text-gray-800 mb-8 text-center">
          Shop
        </p>
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
