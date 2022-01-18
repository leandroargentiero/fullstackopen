require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const static = require('static');

const app = express();

const Person = require('./models/person');

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
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
// GET - info
app.get('/info', (request, response) => {
  const currentDate = new Date();
  const totalPersons = persons.length;
  const html = `
    <p>Phonebook has info for ${totalPersons} persons.</p>
    <p>${currentDate}</p>
  `;

  response.send(html);
});

// POST - new person (uses -> express json-parser for receiving data)
app.post('/api/persons', (request, response) => {
  const body = request.body;
  const checkName = persons.some((person) => person.name === body.name);
  const checkNumber = persons.some((person) => person.number === body.number);

  if (!body.name) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  if (checkName || checkNumber) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

// DELETE - person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

/*
 *  SERVER DESIGNATION
 */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
