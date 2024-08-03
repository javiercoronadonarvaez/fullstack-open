const PersonForm = ({ addEntryToPersons, newName, handleAddedNameChange, newNumber, handleAddedNumberChange }) => {
  return (
    <form onSubmit={addEntryToPersons}>
      <div>
        name: <input 
                value={newName}
                onChange={handleAddedNameChange}
              />
      </div>
      <div>
        number: <input 
                value={newNumber}
                onChange={handleAddedNumberChange}
              />
      </div>
      <div>
        <button type="submit">add</button>
    </div>
</form>
  )
}

export default PersonForm