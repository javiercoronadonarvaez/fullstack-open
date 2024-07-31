import { useState } from 'react'

const Display = ({ selectedAnecdote, updateAnecdote }) => {
  return (
    <div>
      <p>{selectedAnecdote}</p>
      <Button updateAnecdote={updateAnecdote} />
    </div>
  )
}

const Button = ({ updateAnecdote }) => {
  return (
    <button onClick={() => updateAnecdote()}>
      Next Anecdote
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const min = 0
  const max = anecdotes.length - 1
  const updateAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    setSelected(randomNumber)
    console.log(randomNumber)
  }

  return (
    <div>
      <Display selectedAnecdote={anecdotes[selected]} updateAnecdote={updateAnecdote} />
    </div>
  )
}

export default App