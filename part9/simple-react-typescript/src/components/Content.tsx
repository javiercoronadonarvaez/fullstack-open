import Part from "./Part";
import { ContentProps } from "../types";

const Content = ({ courses }: ContentProps) => {
  return courses.map((course, index) => <Part key={index} course={course} />);
};

export default Content;
