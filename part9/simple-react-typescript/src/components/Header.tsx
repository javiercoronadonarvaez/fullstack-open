import { CourseName } from "../types";

const Header = (props: CourseName) => {
  return <h1>{props.courseName}</h1>;
};

export default Header;
