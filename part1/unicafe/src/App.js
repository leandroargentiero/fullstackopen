import React, { useState } from 'react';

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => (
  <p>
    {text}: {value}
  </p>
);

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
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={calcAverage()} />
          <StatisticsLine text="positive" value={`${calcPositive()}%`} />
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
      <Button text="good" onClick={() => handleClick('good')} />
      <Button text="neutral" onClick={() => handleClick('neutral')} />
      <Button text="bad" onClick={() => handleClick('bad')} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
