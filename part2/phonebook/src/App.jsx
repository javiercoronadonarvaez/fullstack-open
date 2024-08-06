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
      const personProfile = persons.find(person => person.name === newName)
      if (!repeatedNumberBool) {
        if (window.confirm(`${personProfile.name} is already added to the phonebook, replace the old number with a new one?`)) {
          const updatedPersonProfile = {...personProfile, number: newNumber}
          phoneService  
            .updateNumber(updatedPersonProfile.id, updatedPersonProfile)
            .then(updatedProfile => (setPersons(persons.map(person => person.id !== updatedProfile.id ? person : updatedProfile)), 
                                     setFilteredPersons(filteredPersons.map(person => person.id !== updatedProfile.id ? person : updatedProfile))))
          setNewName('')
          setNewNumber('')
          return ;
        }
      }
      else {
        alert(`${newName} is already added to phonebook and can't be input again`)
        setNewName('')
        setNewNumber('')
        return ;
      }
    }
    if (repeatedNumberBool) {
      alert(`${newNumber} is already added to phonebook and can't belong to different people`)
      setNewName('')
      setNewNumber('')
      return ;
    }
    const newNameObject = {
      id: String(persons.length + 1),
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

  const deleteEntry = (personId, personName) => {
    console.log(personName)
    if (window.confirm(`Delete ${personName}?`)) {
      phoneService
        .deleteEntry(personId)
        .then(personProfile => (setPersons(persons.filter(person => person.id !== personProfile.id)), setFilteredPersons(filteredPersons.filter(person => person.id !== personProfile.id))))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new entry</h2>
      <PersonForm addEntryToPersons={addEntryToPersons} newName={newName} handleAddedNameChange={handleAddedNameChange} newNumber={newNumber} handleAddedNumberChange={handleAddedNumberChange} />
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person key={person.id} person={person} deleteEntry={deleteEntry} />)}
    </div>
  )
}

export default App