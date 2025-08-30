import { useState } from 'react'
import { greet } from '@repo/utils'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>SomaBuddy</h1>
        <p className="tagline">Dyslexia is no disorder, dyslexics think differently.</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>{greet("Welcome to SomaBuddy!")}</p>
        </div>
      </header>
    </div>
  )
}

export default App
