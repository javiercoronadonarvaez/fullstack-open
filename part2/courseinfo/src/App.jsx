const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts} />
    </div>
  )
}

const Content = ({ parts }) => {
  const sumOfExercises = parts.reduce((sum, currentPart) => sum + currentPart.exercises, 0)
  return (
    <>
      {parts.map(part => <Part key={part.id} partName={part.name} exercises={part.exercises} />)}
      <p style={{ fontWeight: 'bold' }}>Total of {sumOfExercises} exercises</p>
    </>
  )
}

const Part = ({ id, partName, exercises }) => {
  return (
    <p key={id}>{partName}: {exercises}</p>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'TEST',
        exercises: 10,
        id: 4
      }
    ]
  }

  return <Course key={course.id} course={course} />
}

export default App