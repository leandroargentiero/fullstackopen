require('dotenv').config();
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

// connect to DB
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message);
  });

// create new DB schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// validate unique input
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
