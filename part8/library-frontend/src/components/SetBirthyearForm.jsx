import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN_YEAR } from "../queries";
import Select from "react-select";

const SetBirthday = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
  console.log("Authors", authors);
  const options = authors.map((author) => {
    return { value: author.name, label: author.name };
  });
  console.log("Options", options);

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [bornYear, setBornYear] = useState("");

  const [updateAuthor] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAuthor({
      variables: { name: selectedAuthor.value, setBornTo: bornYear },
    });
    console.log("UPDATED VALUES", selectedAuthor.value, bornYear);
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <Select
        defaultValue={selectedAuthor}
        onChange={setSelectedAuthor}
        options={options}
      />
      born
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={bornYear}
          onChange={({ target }) => setBornYear(Number(target.value))}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthday;
