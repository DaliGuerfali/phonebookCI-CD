const Person = require('../models/person');
const testingRouter = require('express').Router();

const persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
  },
  {
    'name': 'Ada Lovelace',
    'number': '394-5323523',
  },
  {
    'name': 'Dan Abramov',
    'number': '124-234345',
  }
];

testingRouter.post('/reset', async (_req, res) => {
  await Person.deleteMany({});

  await Promise.all(persons.map(person => (new Person(person)).save()));

  res.send(201);
});



module.exports = testingRouter;