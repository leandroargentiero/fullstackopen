import React, { useState } from 'react';

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

  const calcAverage = () => {
    const avgGood = good * 1;
    const avgNeutral = neutral * 0;
    const avgBad = bad * -1;
    const total = good + neutral + bad;

    return (avgGood + avgNeutral + avgBad) / total;
  };

  const calcPositive = () => {
    const total = good + neutral + bad;

    return (good / total) * 100;
  };

  return (
    <>
      <h2>Give feedback</h2>
      <button onClick={() => handleClick('good')}>Good</button>
      <button onClick={() => handleClick('neutral')}>Neutral</button>
      <button onClick={() => handleClick('bad')}>Bad</button>
      <h3>Statistics</h3>
      <p>Good:{good}</p>
      <p>Neutral:{neutral}</p>
      <p>Bad:{bad}</p>
      <p>All:{good + neutral + bad}</p>
      <p>Average: {calcAverage()}</p>
      <p>Positive: {calcPositive()}%</p>
    </>
  );
}

export default App;
