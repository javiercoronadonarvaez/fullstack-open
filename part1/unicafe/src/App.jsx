import { useState } from 'react'

const FeedbackDisplay = ({ statesList, updateFunction }) => {
  return (
    <>
      <div style={{ color: 'blue', fontWeight: 'bold', fontSize: '20px' }}>
        Give Feedback
      </div>
      <div>
        {statesList.map((state, index) => <Button key={index} label={state} setStateFunction={updateFunction} />)}
      </div>
    </>
  )
}

const StatisticsDisplay = ({ statesList, statisticsList }) => {
  return (
    <div>
      {statesList.map((state, index) => <p key={index}>{state}: {statisticsList[index]}</p>)}
    </div>
  )
}

const Button = ({ label, setStateFunction }) => {
  return (
    <button onClick={setStateFunction(label)}>{label}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statesList = ['Good', 'Neutral', 'Bad']
  const statisticsList = [good, neutral, bad]

  const setStatisticsFunction = (label) => {
    if (label === 'Good') {
      const totalGood = good + 1
      return () => setGood(totalGood)
    }
    else if (label === 'Neutral') {
      const totalNeutral = neutral + 1
      return () => setNeutral(totalNeutral)
    }
    else {
      const totalBad = bad + 1
      return () => setBad(totalBad)
    }
  }

  return (
    <div>
      <FeedbackDisplay statesList={statesList} updateFunction={setStatisticsFunction} />
      <StatisticsDisplay statesList={statesList} statisticsList={statisticsList} />
    </div>
  )
}

export default App