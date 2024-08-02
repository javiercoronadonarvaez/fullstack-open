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

export default Course