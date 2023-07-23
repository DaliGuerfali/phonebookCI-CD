const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const personsRouter = require('./controllers/personsRouter');
const apiRouter = require('./controllers/apiRouter');
const { unknownEndpoint, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api', apiRouter);
app.use('/api/persons', personsRouter);

if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingRouter');
  app.use('/api/testing', testingRouter);
}


app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;