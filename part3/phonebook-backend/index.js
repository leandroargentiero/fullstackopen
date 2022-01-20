const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');
const morgan = require('morgan');
const static = require('static');

/*
 *  MIDDLEWARE
 */
app.use(express.static('build')); // used for serving static files from build folder
app.use(cors()); // allows requests from other origins
app.use(express.json()); // express json-parser for receiving data

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

/*
 *  HTTP RREQUESTS
 */

// GET - root directory
app.get('/', (request, response) => {
  response.send('<h1>Phonebook App!</h1>');
});

// GET - all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// GET - person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// GET - info
app.get('/info', (request, response) => {
  const currentDate = new Date();
  const totalPersons = Person.length;
  const html = `
    <p>Phonebook has info for ${totalPersons} persons.</p>
    <p>${currentDate}</p>
  `;

  response.send(html);
});

// POST - new person (uses -> express json-parser for receiving data)
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

// DELETE - person
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end(); // Succesfull response: 'No Content';
    })
    .catch((error) => next(error));
});

// UPDATE - new number
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
    id: body.id,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.use(errorHandler);

/*
 *  SERVER DESIGNATION
 */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
