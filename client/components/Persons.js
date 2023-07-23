import React from 'react';

const Person = ({ person, handleDelete }) => {
  return (
    <p id={person.number}>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </p>
  );

};

const Persons = ({ persons, handleDelete }) => {
  return (
    <div id='persons'>
      {
        persons.map((person) => <Person
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />)
      }
    </div>
  );
};

export default Persons;

