import { useState, useEffect } from 'react'
import phoneService from './services/phone'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const hook = () => {
    phoneService
      .getAll()
      .then(personProfile => {
        setPersons(personProfile)
        setFilteredPersons(personProfile)
      })
  }

  useEffect(hook, [])

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
    console.log('New Filter', newFilter)
    const filterAppliesToNewEntry = newNameObject.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
    console.log('Filter Applies to New Entry:', filterAppliesToNewEntry)
    if (filterAppliesToNewEntry) {
      const newFilteredPersons = filteredPersons.concat(newNameObject)
      setFilteredPersons(newFilteredPersons)
    }
    phoneService
      .createNewEntry(newNameObject)
      .then(newNameData => setPersons(persons.concat(newNameData))
    )
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
      {filteredPersons.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App