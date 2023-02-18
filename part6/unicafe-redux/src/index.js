import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'

import { createStore } from 'redux'

const store = createStore(counterReducer)


const App = () => {
  return (
    <div>
      <div>
      <button onClick={ () => store.dispatch({ type: 'GOOD' })}>Good</button>
      <button onClick={ () => store.dispatch({ type: 'OK' })}>Ok</button>
      <button onClick={ () => store.dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={ () => store.dispatch({ type: 'ZERO' })}>Reset stats</button>
      </div>
      <div>
        <p>Good: {store.getState().good}</p>
        <p>Ok: {store.getState().ok}</p>
        <p>Bad: {store.getState().bad}</p>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)