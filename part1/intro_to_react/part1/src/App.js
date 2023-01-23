import { useState } from 'react'


const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    setCounter(counter+1)
  }

  const resetCounter = () => {
    setCounter(0)
  }


  return (
    <div>
      <h1>Greetings</h1>
      <div>{ counter }</div>
      <button onClick={handleClick}>Click me</button>
      <button onClick={resetCounter}>Reset</button>
    </div>
    )
    
}


export default App;
