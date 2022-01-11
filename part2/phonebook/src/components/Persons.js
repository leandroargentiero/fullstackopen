const Persons = ({ persons, filterName, handleRemoveClick }) => {
  return persons
    .filter((person) => person.name.match(new RegExp(filterName, 'i')))
    .map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleRemoveClick(person.id)}>remove</button>
      </p>
    ));
};

export default Persons;
