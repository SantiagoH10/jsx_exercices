import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Tw() {
  return(
    <div className="bg-blue-500 text-white p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Hello Tailwind!</h1>
      <p className="text-xl">If you can see blue background and white text, Tailwind is working!</p>
    </div>
  )
}

function StatusBadge({status}) {
  if (status) {
    if (status === "active") {
      return (
        <div className="bg-green-500 text-white p-8 text-center">
          <p>Status Active 👌</p>
        </div>
      )
    }
    
    if (status === "pending") {
      return (
        <div className="bg-yellow-500 text-white p-8 text-center">
          <p>Status Pending... ⌛</p>
        </div>
      )
    }

    if (status === "inactive") {
      return (
        <div className="bg-red-500 text-white p-8 text-center">
          <p>Status Inactive!</p>
        </div>
      )
    }

    return (
        <div className="bg-gray-500 text-white p-8 text-center">
          <p>Invalid Status</p>
        </div>
      )

  } else {
    return (
        <div className="bg-gray-500 text-white p-8 text-center">
          <p>Missing Status</p>
        </div>
      )
  }
}



function App() {
  return (
    <div>
      <Tw />
      <StatusBadge status="inactive" />
    </div>
  )
}

export default App