import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { courseName, coursePartsAsInterface } from "../data/entries";

const App = () => {
  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={coursePartsAsInterface} />
      <Total courses={coursePartsAsInterface} />
    </div>
  );
};

export default App;
