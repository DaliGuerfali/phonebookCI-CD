const Person = require('../models/person');
const personsRouter = require('express').Router();



personsRouter.get('/api/persons', (_request, response, next) => {
  Person.find({}).then(res => {
    response.json(res);
  })
    .catch(err => next(err));
});


personsRouter.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Person.findById(id).then(res => {
    if(res) {
      response.json(res);
    } else {
      next();
    }

  })
    .catch(err => next(err));
});


personsRouter.get('/api/info', (_request, response, next) => {
  Person.find({}).then(res => {
    response.send(`
        <p>Phonebook has info for ${res.length} people</p>
        <p>${new Date()}</p>
        `);
  })
    .catch(err => next(err));
});


personsRouter.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndRemove(id).then(() => {
    response.status(204).end();
  })
    .catch(err => next(err));
});


personsRouter.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(res => {
    response.json(res);
  })
    .catch(err => next(err));
});


personsRouter.put('/api/persons/:id',(request,response, next) => {
  const id = request.params.id;

  const { name, number } = request.body;

  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(res => {
      response.json(res);
    })
    .catch(err => next(err));
});

module.exports = personsRouter;