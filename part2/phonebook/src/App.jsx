import { useState, useEffect } from "react";
import phoneService from "./services/phone";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    phoneService.getAll().then((personProfile) => {
      setPersons(personProfile);
      setFilteredPersons(personProfile);
    });
  };

  useEffect(hook, []);

  const updateNotification = (addedPersonName) => {
    setNotification(addedPersonName);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const updateError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addEntryToPersons = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      alert("The name or number is missing");
      setNewName("");
      setNewNumber("");
      return;
    }

    const repeatedNameBool = persons.some((person) => person.name === newName);
    const repeatedNumberBool = persons.some(
      (person) => person.number === newNumber
    );
    console.log("New name", newName);
    if (repeatedNameBool) {
      const personProfile = persons.find((person) => person.name === newName);
      if (!repeatedNumberBool) {
        if (
          window.confirm(
            `${personProfile.name} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          const updatedPersonProfile = { ...personProfile, number: newNumber };
          phoneService
            .updateNumber(updatedPersonProfile.id, updatedPersonProfile)
            .then(
              (updatedProfile) => (
                setPersons(
                  persons.map((person) =>
                    person.id !== updatedProfile.id ? person : updatedProfile
                  )
                ),
                setFilteredPersons(
                  filteredPersons.map((person) =>
                    person.id !== updatedProfile.id ? person : updatedProfile
                  )
                ),
                updateNotification(updatedProfile.name)
              )
            );
          setNewName("");
          setNewNumber("");
          return;
        }
      } else {
        alert(
          `${newName} is already added to phonebook and can't be input again`
        );
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    if (repeatedNumberBool) {
      alert(
        `${newNumber} is already added to phonebook and can't belong to different people`
      );
      setNewName("");
      setNewNumber("");
      return;
    }
    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    phoneService
      .createNewEntry(newNameObject)
      .then(
        (newNameData) => (
          setPersons(persons.concat(newNameData)),
          updateNotification(newNameData.name)
        )
      )
      .catch((error) => updateError(error.response.data.error));
    setNewName("");
    setNewNumber("");
  };

  const checkIfFiltered = () => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  useEffect(checkIfFiltered, [persons, newFilter]);

  const handleAddedNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddedNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const currentFilter = event.target.value;
    setNewFilter(currentFilter);
  };

  const deleteEntry = (personId, personName) => {
    console.log("Frontend ID", personId);
    console.log("Frontend Person Name", personName);
    if (window.confirm(`Delete ${personName}?`)) {
      phoneService
        .deleteEntry(personId)
        .then(
          (personProfile) => (
            setPersons(
              persons.filter((person) => person.id !== personProfile.id)
            ),
            setFilteredPersons(
              filteredPersons.filter((person) => person.id !== personProfile.id)
            )
          )
        )
        .catch((error) => {
          updateError(personName);
          console.log(error.name);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new entry</h2>
      <PersonForm
        addEntryToPersons={addEntryToPersons}
        newName={newName}
        handleAddedNameChange={handleAddedNameChange}
        newNumber={newNumber}
        handleAddedNumberChange={handleAddedNumberChange}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} deleteEntry={deleteEntry} />
      ))}
    </div>
  );
};

export default App;
