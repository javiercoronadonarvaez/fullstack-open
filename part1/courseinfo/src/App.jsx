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

const Part = (props) => {
  return (
    <>
      <p>{props.partName} {props.numExercises}</p>
    </>
  )
}

Part.propTypes = {
  partName: PropTypes.string.isRequired,
  numExercises: PropTypes.number.isRequired
};

const Content = (props) => {
  return (
    <>
      <Part partName={props.part1} numExercises={props.exercises1}/>
      <Part partName={props.part2} numExercises={props.exercises2}/>
      <Part partName={props.part3} numExercises={props.exercises3}/>
    </>
  )
}

Content.propTypes = {
  part1: PropTypes.string.isRequired,
  part2: PropTypes.string.isRequired,
  part3: PropTypes.string.isRequired,
  exercises1: PropTypes.number.isRequired,
  exercises2: PropTypes.number.isRequired,
  exercises3: PropTypes.number.isRequired
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
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App