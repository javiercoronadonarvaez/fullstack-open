import { useState } from "react";
// import { DiaryEntry } from "../types";

const NewDiary = () => {
  const [date, setDate] = useState("");
  //   const [weather, setWeather] = useState("");
  //   const [visibility, setVisibility] = useState("");

  return (
    <div>
      <form>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </form>
    </div>
  );
};

export default NewDiary;
