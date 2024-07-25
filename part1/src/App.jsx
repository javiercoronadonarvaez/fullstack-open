import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
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

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const a = 15
  const b = 20
  const name = 'Megan'
  const age = 10

  useEffect(() => {
    const timerID = setTimeout(() => {
      setCurrentTime(Date());
    }, 1000);
    return () => clearTimeout(timerID);
  })

  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Javier' age={a+b} />
      <Hello name={name} age={age} />
      <p>Hello world, it is {currentTime.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
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