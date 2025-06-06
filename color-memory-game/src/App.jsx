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








function App() { 
  return (
    <div>
      <MySociabble/>
    </div>
  )
}

export default App
