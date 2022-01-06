const Persons = ({ persons, filterName }) => {
  return persons
    .filter((person) => person.name.match(new RegExp(filterName, 'i')))
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
};

export default Persons;
