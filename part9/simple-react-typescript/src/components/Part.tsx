import { IndividualPart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: IndividualPart) => {
  switch (course.kind) {
    case "basic":
      return (
        <>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <em>
            <p>{course.description}</p>
          </em>
        </>
      );
    case "background":
      return (
        <>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <em>
            <p>{course.description}</p>
          </em>
          <p>Submit to {course.backgroundMaterial}</p>
        </>
      );
    case "group":
      return (
        <>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <p>Project Exercises: {course.groupProjectCount}</p>
        </>
      );
    case "special":
      return (
        <>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <em>
            <p>{course.description}</p>
          </em>
          <p>
            Required skills:{" "}
            {course.requirements.map((req, index) =>
              index > 0 ? `, ${req}` : `${req}`
            )}
          </p>
        </>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
