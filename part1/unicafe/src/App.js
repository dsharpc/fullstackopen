import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} - {value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad > 0){
      return (
      <table>
        <tbody>
            <tr><td><StatisticLine text="good" value={good}></StatisticLine></td></tr>
            <tr><td><StatisticLine text="neutral" value={neutral}></StatisticLine></td></tr>
            <tr><td><StatisticLine text="bad" value={bad}></StatisticLine></td></tr>
            <tr><td><StatisticLine text="total" value={calculateTotal(good, neutral, bad)}></StatisticLine></td></tr>
            <tr><td><StatisticLine text="average" value={calculateAverage(good, neutral, bad)}></StatisticLine></td></tr>
            <tr><td><StatisticLine text="positive" value={calculatePositive(good, neutral, bad)}></StatisticLine></td></tr>
        </tbody>
      </table>
      )
  } else {
    return (
      <p>No feedback given yet</p>
    )
  }
  
}

const calculateTotal = (...ratings) => {
  let total = 0
  for (const rating of ratings) {
    total += rating
  }
  return total
}

const calculateAverage = (good, neutral, bad) => {
  const total = calculateTotal(good, neutral, bad)
  return (good + (-1 * bad)) / total
}

const calculatePositive = (good, neutral, bad) => {
  const total = calculateTotal(good, neutral, bad)
  return good / total
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text="good" onClick={() => setGood(good+1)}></Button>
      <Button text="neutral" onClick={() => setNeutral(neutral+1)}></Button>
      <Button text="bad" onClick={() => setBad(bad+1)}></Button>

      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App