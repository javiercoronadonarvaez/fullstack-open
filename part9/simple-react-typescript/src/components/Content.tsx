import { ContentProps } from "../types";

const Content = (props: ContentProps) => {
  const courses = props.courses;
  return courses.map((course, index) => (
    <p key={index}>
      {course.name} {course.exerciseCount}
    </p>
  ));
};

export default Content;
