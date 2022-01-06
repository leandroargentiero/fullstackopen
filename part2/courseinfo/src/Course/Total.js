const Total = ({ course }) => {
  const excercises = course.parts.map((part) => part.exercises);
  const total = excercises.reduce((accumulator, curr) => accumulator + curr);

  return <p style={{ fontWeight: 'bold' }}>{`total of ${total} excercises`}</p>;
};
export default Total;
