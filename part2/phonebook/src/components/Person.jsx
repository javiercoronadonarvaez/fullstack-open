const Person = ({ person, deleteEntry }) => {
  return (
    <div>
      {person.name}: {person.number}
      <button
        style={{ marginLeft: "20px" }}
        onClick={() => deleteEntry(person.id, person.name)}
      >
        delete
      </button>
    </div>
  );
};

export default Person;
