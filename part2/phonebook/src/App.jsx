import { useState } from 'react'

const PersonNumberDisplay = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const addNameToPersons = (event) => {
    event.preventDefault()
    const newNameObject = {
      name: newName,
      id: persons.length + 1
    }
    console.log(newNameObject)
    setPersons(persons.concat(newNameObject))
    setNewName('')
  }

  const handleAddedNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameToPersons}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleAddedNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <PersonNumberDisplay key={person.id} person={person} />)}
    </div>
  )
}

export default App