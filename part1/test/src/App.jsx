import PropTypes from 'prop-types';
import { useState } from 'react';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name},  you are {age} years old
      </p>
      <p>
        You are were probably born in {bornYear()}
      </p>
    </div>
  )
}

Hello.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

Display.propTypes = {
  counter: PropTypes.number.isRequired
};

const Button = ({ onSmash, functionDescription } ) => {
  return (
    <button onClick={onSmash}>{functionDescription}</button>
  )
}

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
      the app is used by pressing buttons bro
      </div>
    )
  }
  return (
    <div>
    Button Press History: {allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [counter, setCounter] = useState(0)
  const a = 15
  const b = 20
  const name = 'Megan'
  const age = 10

  /*
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})

  const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})
  */

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    console.log('left before', left)
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    console.log('left after', left)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    console.log('right before', right)
    const updateRight = right + 1
    setRight(updateRight)
    console.log('right after', right)
    setTotal(left + updateRight)
  }

  setTimeout(() => setCurrentTime(new Date()), 1000)
  /*
  useEffect(() => {
    const timerID = setTimeout(() => {
      setCurrentTime(Date());
    }, 1000);
    return () => clearTimeout(timerID);
  })
  */
  const increaseByOne = () => setCounter(counter+1)
  const decreaseByOne = () => setCounter(counter-1)
  const restartCounter = () => setCounter(0)
  const increaseByOneObject = {
    'function': increaseByOne,
    'description': '+'
  }
  const decreaseByOneObject = {
    'function': decreaseByOne,
    'description': '-'
  }
  const restartCounterObject = {
    'function': restartCounter,
    'description': 'Restart'
  }
  const buttonFunctions = [increaseByOneObject, decreaseByOneObject, restartCounterObject]
  //const buttonFunctions = [increaseByOne, decreaseByOne, restartCounter]
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Javier' age={a+b} />
      <Hello name={name} age={age} />
      <p>Hello world, it is {currentTime.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Display counter={counter}/>
      <>{buttonFunctions.map((content, index) => <Button key={index} onSmash={content.function} functionDescription={content.description} />)}</>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks} />
        <p>Total Clicks: {total} </p>
      </div>
      <Footer />
    </>
  )
}

/*
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George' />
      <Hello name='Daisy' />
    </div>
  )
}
*/

export default App