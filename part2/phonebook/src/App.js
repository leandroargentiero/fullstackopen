import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then((allPersons) => setPersons(allPersons))
      .catch((error) => console.log('Failed DB connection'));
  }, []);

  const personAlreadyAdded = (newPerson) => {
    return persons.some((person) => person.name === newPerson.name);
  };

  const updatePerson = (newPerson) => {
    const person = persons.find((n) => n.name === newPerson.name);
    const changedPerson = { ...person, number: newPerson.number };

    personsService
      .update(changedPerson.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        );
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (personAlreadyAdded(personObject)) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        updatePerson(personObject);
      }
    } else {
      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => console.log(error));
    }
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setFilterName('');
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage && <Notification message={notificationMessage} />}
      <Filter handleFilterName={handleFilterName} filterName={filterName} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterName={filterName}
        handleRemoveClick={removePerson}
      />
    </div>
  );
};

export default App;
