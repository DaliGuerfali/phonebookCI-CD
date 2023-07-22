import React from 'react';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import phoneBookService from './phoneBookService';
import { SuccessNotification, ErrorNotification } from './components/Notifications';


const App = () => {
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(res => {
        setPersons(res);
        setFilteredPersons(res);
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Failed to fetch data from server');
      });
  }, []);


  function handleNameInput(e) {
    setNewName(e.target.value);
  }

  function handleNumberInput(e) {
    setNewNumber(e.target.value);
  }

  function handleFilterInput(e) {
    setFilteredPersons(persons.filter((person) => {
      return person
        .name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    }));
    setNewFilter(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    // if(newName === '' || newNumber === '') {
    //   return;
    // }

    const addedPerson = persons.find((person) => person.name === newName);


    if(addedPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {

        const updatedPerson = { ...addedPerson, number: newNumber };

        phoneBookService
          .update(updatedPerson.id, updatedPerson)
          // eslint-disable-next-line no-unused-vars
          .then(_res => {
            setSuccessMessage(`Updated ${newName}'s number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 2000);
            const newPersons = persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson );
            setPersons(newPersons);
            setFilteredPersons(newPersons.filter((person) => {
              return person
                .name
                .toLowerCase()
                .includes(newFilter.toLowerCase());
            }));
            setNewName('');
            setNewNumber('');
          })
          .catch(err => {
            console.log(err);
            if(err.response.status === 400) {
              setErrorMessage(err.response.data.error);
            } else {
              setErrorMessage(`Information for ${updatedPerson.name} has already been deleted from the server`);
            }
          });
      }
      return;
    }

    phoneBookService
      .create({ name: newName, number: newNumber })
      .then(res => {
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
        const newPersons = persons.concat(res);
        setPersons(newPersons);
        setFilteredPersons(newPersons);
        setNewName('');
        setNewNumber('');
        setNewFilter('');
      })
      .catch(err => {
        console.log(err);
        if(err.response.status === 400) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage(`${newName} has already been added to the server`);
        }
      });
  }

  function handleDelete(id) {
    const deletedPerson = persons.find((person) => id === person.id);
    if(window.confirm(`Delete ${deletedPerson.name} ?`)) {
      phoneBookService
        .deleteEntry(id)
        // eslint-disable-next-line no-unused-vars
        .then(_res => {
          setSuccessMessage(`Deleted ${deletedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
          setFilteredPersons(newPersons.filter((person) => {
            return person
              .name
              .toLowerCase()
              .includes(newFilter.toLowerCase());
          }));
        })
        .catch(err => {
          console.log(err);
          setErrorMessage(`${deletedPerson.name} has already been removed from the server`);
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter onChange={handleFilterInput} value={newFilter} />
      <h3>add a new</h3>
      <PersonForm
        onNameChange={handleNameInput}
        nameValue={newName}
        onNumberChange={handleNumberInput}
        numberValue={newNumber}
        onClick={handleClick}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;