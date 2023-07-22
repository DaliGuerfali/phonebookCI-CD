const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const personsRouter = require('./controllers/personsRouter');
const { unknownEndpoint, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(personsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;