const express = require('express');
const app = express();

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

// GET root directory
app.get('/', (request, response) => {
  response.send('<h1>Phonebook App!</h1>');
});

// GET all persons
app.get('/api/persons', (request, response) => {
  response.send(persons);
});

// GET specific person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// GET info
app.get('/info', (request, response) => {
  const currentDate = new Date();
  const totalPersons = persons.length;
  const html = `
    <p>Phonebook has info for ${totalPersons} persons.</p>
    <p>${currentDate}</p>
  `;

  response.send(html);
});

// DELETE Specific Person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// SERVER DESIGNATION
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
