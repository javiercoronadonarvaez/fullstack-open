import { useState } from 'react'

const Display = ({ selectedIndex, numberVotes, selectedAnecdote, updateAnecdoteText, updateAnecdoteFunction, updateVoteText, updateVoteFunction, mostVotedAnecdote, mostVotedNumberVotes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selectedAnecdote}</p>
      <p>has {numberVotes} votes</p>
      <ButtonNextAnecdote displayText={updateAnecdoteText} buttonFunction={updateAnecdoteFunction} />
      <ButtonVote selectedIndex={selectedIndex} displayText={updateVoteText} buttonFunction={updateVoteFunction} />
      <MostVotedAnecdote mostVotedAnecdote={mostVotedAnecdote} mostVotedNumberVotes={mostVotedNumberVotes} />
    </div>
  )
}

const MostVotedAnecdote = ({ mostVotedAnecdote, mostVotedNumberVotes }) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotedAnecdote}</p>
      <p>has {mostVotedNumberVotes} votes</p>
    </>
  )
}

const ButtonNextAnecdote = ({ displayText, buttonFunction }) => {
  return (
    <button onClick={() => buttonFunction()}>
      {displayText}
    </button>
  )
}

const ButtonVote = ({ selectedIndex, displayText, buttonFunction }) => {
  return (
    <button onClick={() => buttonFunction(selectedIndex)}>
      {displayText}
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
  }

  const voteCountList = []
  anecdotes.forEach((_, index) => voteCountList[index] = 0)
  const [votes, setVotes] = useState(voteCountList)
  const updateVote = (selectedIndex) => {
    const voteCountList = [...votes]
    voteCountList[selectedIndex] += 1
    setVotes(voteCountList)
  }

  const getMostVotedIndex = () => {
    const mostVotedIndex = votes.reduce((maxValueIndex, currentValue, currentIndex, array) => {
      return currentValue > array[maxValueIndex] ? currentIndex : maxValueIndex
    }, 0)
    return mostVotedIndex
  }

  return (
    <div>
      <Display selectedIndex={selected} numberVotes={votes[selected]} selectedAnecdote={anecdotes[selected]} updateAnecdoteText='Next Anecdote' updateAnecdoteFunction={updateAnecdote} updateVoteText='Vote' updateVoteFunction={updateVote} mostVotedAnecdote={anecdotes[getMostVotedIndex()]} mostVotedNumberVotes={votes[getMostVotedIndex()]} />
    </div>
  )
}

export default App