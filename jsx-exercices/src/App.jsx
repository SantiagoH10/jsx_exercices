import './App.css'
import { useState } from 'react';

function WelcomeMessage() {
  return (
    <div>
      <h3>Welcome!</h3>
      <p>Hello, Santiago!</p>
      <button>Get Started</button>
    </div>
  );
}

function UserCard({name, age, email}) {
  return (
    <div>
      <p>Your name is: {name}</p>
      <p>Your age is: {age}</p>
      <p>Your email is: {email}</p>
    </div>
  )
}

//First possibility - Verbose and messy
/*
function LoginStatus () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (isLoggedIn === true) {
    return (
      <div>
        <h2>Welcome back!</h2>
        <button onClick={()=>setIsLoggedIn(false)}>Log out</button>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Please log in</h2>
        <button onClick={()=>setIsLoggedIn(true)}>Log In</button>
      </div>
    )
  }
}
*/

function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <div>
      <p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  )
}

function FruitList() {
  const fruits = ['apple', 'banana', 'orange', 'grape'];
  return(
    <ul>
      {fruits.map(f => <li>{f}</li> )}
    </ul>
  )
}

function StudentList() {
  const students = [
    { id: 1, name: "John", grade: "A" },
    { id: 2, name: "Sarah", grade: "B" },
    { id: 3, name: "Mike", grade: "A" }
  ];

  return(
    <div>
      {students.map(s => <p>{s.name}, student number {s.id}, grade : {s.grade}.</p>)}
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}



function App() {
  return (
    <div className="App">
      <WelcomeMessage />
      <UserCard name="Joe" age="25" email="foo@gmail.com" />
      <LoginStatus />
      <FruitList />
      <StudentList />
      <Counter />
    </div>
  );
}

export default App
