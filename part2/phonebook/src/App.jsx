import { useState } from 'react'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input 
                          value={newFilter}
                          onChange={handleFilterChange}
                          />
    </div>
  )
}

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

const PersonNumberDisplay = ({ person }) => {
  return (
    <p>{person.name}: {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const addEntryToPersons = (event) => {
    event.preventDefault()
    const repeatedNameBool = persons.some(person => person.name === newName)
    const repeatedNumberBool = persons.some(person => person.number === newNumber)
    if (repeatedNameBool) {
      alert(`${newName} is already added to phonebook`)
    }
    if (repeatedNumberBool) {
      alert(`${newNumber} is already added to phonebook and can't belong to different people`)
    }
    const newNameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newNameObject))
    console.log('New Filter', newFilter)
    const filterAppliesToNewEntry = newNameObject.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
    console.log('Filter Applies to New Entry:', filterAppliesToNewEntry)
    if (filterAppliesToNewEntry) {
      const newFilteredPersons = filteredPersons.concat(newNameObject)
      setFilteredPersons(newFilteredPersons)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleAddedNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddedNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    const currentFilter = event.target.value
    const newFilteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(currentFilter.toLocaleLowerCase()))
    setNewFilter(currentFilter)
    setFilteredPersons(newFilteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new entry</h2>
      <PersonForm addEntryToPersons={addEntryToPersons} newName={newName} handleAddedNameChange={handleAddedNameChange} newNumber={newNumber} handleAddedNumberChange={handleAddedNumberChange} />
      <h2>Numbers</h2>
      {filteredPersons.map(person => <PersonNumberDisplay key={person.id} person={person} />)}
    </div>
  )
}

export default App