const api = require('express').Router();
const Person = require('../models/person');

api.get('/info', (_request, response, next) => {
  Person.find({}).then(res => {
    response.send(`
          <p>Phonebook has info for ${res.length} people</p>
          <p>${new Date()}</p>
          `);
  })
    .catch(err => next(err));
});


api.get('/health', (_req, res) => {
  res.send('ok');
});

api.get('/version', (_req, res) => {
  res.send('1.2');
});

module.exports = api;