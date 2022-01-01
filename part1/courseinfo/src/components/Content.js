const Part = ({ name, excercises }) => {
  return (
    <p>
      {name} {excercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      <Part
        name={course.parts[0].name}
        excercises={course.parts[0].exercises}
      />
      <Part
        name={course.parts[1].name}
        excercises={course.parts[1].exercises}
      />
      <Part
        name={course.parts[2].name}
        excercises={course.parts[2].exercises}
      />
    </>
  );
};

export default Content;
