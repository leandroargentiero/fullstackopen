import { useState } from 'react';

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const showRandomQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;

    setVotes(newVotes);
  };

  const indexOfMax = () => {
    const index = votes.reduce(
      //previousValue, currentValue, currentIndex, array
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );

    return index;
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>{`has ${votes[selected]} votes`}</div>
      <button onClick={handleVote}>vote</button>
      <button onClick={showRandomQuote}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[indexOfMax()]}</div>
      <div>{`has ${votes[indexOfMax()]} votes`}</div>
    </>
  );
}

export default App;
