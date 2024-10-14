import { ContentProps } from "../types";

const Total = (props: ContentProps) => {
  const courses = props.courses;
  const total = courses.reduce(
    (accumulator, course) => accumulator + course.exerciseCount,
    0
  );
  return <p>Number of Exercises: {total}</p>;
};

export default Total;
