const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const parts = course.parts;
  return (
    <>
      {parts.map((part) => {
        return <Part name={part.name} exercises={part.exercises} />;
      })}
    </>
  );
};

export default Content;
