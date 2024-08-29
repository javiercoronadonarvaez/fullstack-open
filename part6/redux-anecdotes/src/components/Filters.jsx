import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleFilterChange = (event) => {
    dispatch(filter(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
