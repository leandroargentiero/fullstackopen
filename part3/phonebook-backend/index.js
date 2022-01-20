require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const static = require('static');

const app = express();

const Person = require('./models/person');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

/*
 *  MIDDLEWARE
 */
app.use(express.json()); // express json-parser for receiving data
app.use(cors()); // allows requests from other origins
app.use(express.static('build')); // used for serving static files from build folder

/*
 *  MORGAN HTTP REQUEST LOGGER
 */
// 1. create custom body token
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
// 2. log every call with custom format
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

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
    id: generateId(),
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

/*
 *  SERVER DESIGNATION
 */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
