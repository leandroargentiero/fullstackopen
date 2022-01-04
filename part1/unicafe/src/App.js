import React, { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const calcAverage = () => {
    const avgGood = good * 1;
    const avgNeutral = neutral * 0;
    const avgBad = bad * -1;

    return total > 0 ? (avgGood + avgNeutral + avgBad) / total : 0;
  };

  const calcPositive = () => (total > 0 ? (good / total) * 100 : 0);

  return (
    <>
      <h3>Statistics</h3>
      {total > 0 ? (
        <>
          <p>Good:{good}</p>
          <p>Neutral:{neutral}</p>
          <p>Bad:{bad}</p>
          <p>All:{good + neutral + bad}</p>
          <p>Average: {calcAverage()}</p>
          <p>Positive: {calcPositive()}%</p>
        </>
      ) : (
        <p>No feedback given.</p>
      )}
    </>
  );
};

function App() {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value) => {
    console.log('---clicked ' + value);

    switch (value) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
    }
  };

  return (
    <>
      <h2>Give feedback</h2>
      <button onClick={() => handleClick('good')}>Good</button>
      <button onClick={() => handleClick('neutral')}>Neutral</button>
      <button onClick={() => handleClick('bad')}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
