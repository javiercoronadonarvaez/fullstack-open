import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

Header.propTypes = {
  course: PropTypes.string.isRequired,
};

const Content = (props) => {
  return (
    <>
      <p>{props.partName} {props.numExercises}</p>
    </>
  )
}

Content.propTypes = {
  partName: PropTypes.string.isRequired,
  numExercises: PropTypes.number.isRequired
};

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )
}

Total.propTypes = {
  exercises1: PropTypes.number.isRequired,
  exercises2: PropTypes.number.isRequired,
  exercises3: PropTypes.number.isRequired
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content partName={part1} numExercises={exercises1} />
      <Content partName={part2} numExercises={exercises2} />
      <Content partName={part3} numExercises={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App