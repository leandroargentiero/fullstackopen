// Mongoose is an Object Data Modeling (ODM) library for MongoDB
const mongoose = require('mongoose');

// check if password parameter is given
if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

// fetch command line parameters (node mongo.js yourpassword name number)
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// mongoose automatically creates new DB based on url /phonebook-app
const url = `mongodb+srv://fullstack:${password}@cluster0.by4vi.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

// connect to DB
mongoose.connect(url);

// create new DB schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// create new DB model
const Person = mongoose.model('Person', personSchema);

// attach data to model
const person = new Person({
  name: name,
  number: number,
});

// if no argument where given, log all DB entries
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  // save new person to DB
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    // close DB connection
    mongoose.connection.close();
  });
}
