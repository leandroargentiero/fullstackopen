const Total = ({ course }) => (
  <p>
    Number of exercises{' '}
    {course.parts[0].exercises +
      course.parts[1].exercises +
      course.parts[2].exercises}
    .
  </p>
);

export default Total;
