import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  function determineAverage(good, neutral, bad) {
    let newAverage = ((good * 1) + (bad * -1)) / (good + neutral + bad);
    setAverage(newAverage);
  }

  function determinePositivePercent(good, neutral, bad) {
    const total = good + neutral + bad;
    const newPositive = (good / total) * 100;
    setPositive(newPositive)
  }

  const handleGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    setTotal(total + 1);
    determineAverage(newGood, neutral, bad);
    determinePositivePercent(newGood, neutral, bad);
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    setTotal(total + 1);
    determineAverage(good, newNeutral, bad);
    determinePositivePercent(good, newNeutral, bad);
  }

  const handleBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    setTotal(total + 1);
    determineAverage(good, neutral, newBad);
    determinePositivePercent(good, neutral, newBad);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleGood} text='good'/>
      <Button handler={handleNeutral} text='neutral'/>
      <Button handler={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App