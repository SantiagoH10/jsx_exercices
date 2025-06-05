import { useState } from 'react'
import './App.css'

//#region Testing TailWind CSS
function Tw() {
  return(
    <div className="bg-blue-500 text-white p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Hello Tailwind!</h1>
      <p className="text-xl">If you can see blue background and white text, Tailwind is working!</p>
    </div>
  )
}
//#endregion

//#region StatusBadge Exercise

//Repetitive if statements and code
/*
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
*/

//Object-based approach
/*
  function StatusBadge({status}) {
    const statusConfig = {
      active: {
        bgColor: 'bg-green-500',
        text: 'Status Active',
        emoji: '👌'
      },
      pending: {
        bgColor: 'bg-yellow-500',
        text: 'Status Pending...',
        emoji: '⌛'
      },
      inactive: {
        bgColor: 'bg-red-500',
        text: 'Status Inactive!',
        emoji: '❌'
      }
    };

    const defaultConfig = {
      bgColor: 'bg-gray-500',
      text: 'Invalid Status',
      emoji: '❓'
    };

    const config = statusConfig[status] || defaultConfig;

    const baseClasses = 'text-white p-8 text-center';

    return (
      <div className={`${config.bgColor} ${baseClasses}`}>
        <p>{config.text} {config.emoji}</p>
      </div>
    );
  }

  function StatusButton({status, setBadgeStatus}) {
    return (
      <div>
        <button className='bg-gray-500' 
                onClick={() => {status === "active" ? setBadgeStatus("inactive") : setBadgeStatus("active")}}>
            {status === "active" ? "Deactivate Status" : "Activate Status"}
        </button>
      </div>
    );
  }

  function StatusWrapper() {
    const [badgeStatus, setBadgeStatus] = useState("inactive");
    return(
      <div>
        <StatusBadge status={badgeStatus} />
        <StatusButton status={badgeStatus} setBadgeStatus={setBadgeStatus}/>
      </div>
    );
  }
*/

//Improved version
// Configuration object moved outside component to prevent re-creation on every render
const statusConfig = {
  active: {
    bgColor: 'bg-green-500',
    text: 'Status Active',
    emoji: '👌'
  },
  pending: {
    bgColor: 'bg-yellow-500',
    text: 'Status Pending...',
    emoji: '⌛'
  },
  inactive: {
    bgColor: 'bg-red-500',
    text: 'Status Inactive!',
    emoji: '❌'
  }
};

// Default configuration for invalid/missing status
const defaultConfig = {
  bgColor: 'bg-gray-500',
  text: 'Invalid Status',
  emoji: '❓'
};

// Custom hook for status toggle logic
function useStatusToggle(initialStatus = 'inactive') {
  const [status, setStatus] = useState(initialStatus);
  
  const toggleStatus = () => {
    setStatus(currentStatus => 
      currentStatus === 'active' ? 'inactive' : 'active'
    );
  };
  
  return { status, toggleStatus };
}

function StatusBadge({status}) {
  // Look up the configuration or use default
  const config = statusConfig[status] || defaultConfig;

  // Common classes shared by all badges
  const baseClasses = 'text-white p-8 text-center';

  return (
    <div className={`${config.bgColor} ${baseClasses}`}>
      <p>{config.text} {config.emoji}</p>
    </div>
  );
}

function StatusButton({status, toggleStatus}) {
  return (
    <div>
      <button 
        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600' 
        onClick={toggleStatus}
      >
        {status === "active" ? "Deactivate Status" : "Activate Status"}
      </button>
    </div>
  );
}

function StatusWrapper() {
  const { status, toggleStatus } = useStatusToggle('pending');
  
  return(
    <div>
      <StatusBadge status={status} />
      <StatusButton status={status} toggleStatus={toggleStatus} />
    </div>
  );
}

//#endregion


function App() {
  return (
    <div>
      <Tw />
      <StatusWrapper />
    </div>
  )
}

export default App