import { useState } from 'react'
import './App.css'
import Body from './Components/Body'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Body />
    </div>
    
  )
}

export default App
