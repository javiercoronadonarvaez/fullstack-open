import { CoursePart } from "../src/types";

export const courseName: string = "Half Stack application development";
const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
  },
];

export const coursePartsAsInterface: CoursePart[] = courseParts.map(
  (course) => {
    const courseFormatted = course as CoursePart;
    return courseFormatted;
  }
);
