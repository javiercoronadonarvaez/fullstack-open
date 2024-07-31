import { useState } from 'react'

const FeedbackDisplay = ({ stateStringList, updateFunction }) => {
  return (
    <>
      <div style={{ color: 'blue', fontWeight: 'bold', fontSize: '20px' }}>
        Give Feedback
      </div>
      <div>
        {stateStringList.map((state, index) => <Button key={index} label={state} setStateFunction={updateFunction} />)}
      </div>
    </>
  )
}

const StatisticsDisplay = ({ stateStringList, stateList, statisticsStringList, statisticsList }) => {
  const sumOfStates = stateList.reduce((sum, state) => sum + state, 0)
  if (sumOfStates > 0) {
    return (
      <div>
        <StatisticLines key='tracker' stateStringList={stateStringList} stateList={stateList} />
        <StatisticLines key='statistics' stateStringList={statisticsStringList} stateList={statisticsList} />
      </div>
    )
  }
  else {
    return (
      <div>No Feedback Given</div>
    )
  }
}

const StatisticLines = ({ stateStringList, stateList }) => {
  return(
    <>
      {stateStringList.map((state, index) => (state !== 'Positive'
                                              ? (<p key={index}>{state}: {stateList[index]}</p>)
                                              : (<p key={index}>{state}: {stateList[index]}%</p>)
      ))}
    </>
  )
}

const Button = ({ label, setStateFunction }) => {
  return (
    <button onClick={() => setStateFunction(label)}>{label}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stateStringList = ['Good', 'Neutral', 'Bad']
  const stateList = [good, neutral, bad]
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const statisticsStringList = ['All', 'Average', 'Positive']
  const statisticsList = [all, average, positive]

  const setIndividualStateFunction = (label) => {
    if (label === 'Good') {
      const newGood = good + 1
      const newAll = newGood + neutral + bad
      const newAverage = (1 * newGood -1 * bad) / newAll
      const newPositive = (newGood / newAll) * 100
      setGood(newGood)
      setAll(newAll)
      setAverage(newAverage)
      setPositive(newPositive)
    }
    else if (label === 'Neutral') {
      const newNeutral = neutral + 1
      const newAll = good + newNeutral + bad
      const newAverage = (1 * good -1 * bad) / newAll
      const newPositive = (good / newAll) * 100
      setNeutral(newNeutral)
      setAll(newAll)
      setAverage(newAverage)
      setPositive(newPositive)
    }
    else {
      const newBad = bad + 1
      const newAll = good + neutral + newBad
      const newAverage = (1 * good -1 * newBad) / newAll
      const newPositive = (good / newAll) * 100
      setBad(newBad)
      setAll(newAll)
      setAverage(newAverage)
      setPositive(newPositive)
    }
  }

  return (
    <div>
      <FeedbackDisplay stateStringList={stateStringList} updateFunction={setIndividualStateFunction} />
      <StatisticsDisplay stateStringList={stateStringList} stateList={stateList} statisticsStringList={statisticsStringList} statisticsList={statisticsList} />
    </div>
  )
}

export default App