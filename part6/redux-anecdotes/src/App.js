import { useSelector, useDispatch } from "react-redux";
import { addVote, newAnnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    if (id) {
      dispatch(addVote(id));
    }
  };

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.annecdote.value;
    e.target.annecdote.value = "";
    dispatch(newAnnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))
        .sort((a1, a2) => a1.votes - a2.votes)
        .reverse()}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="annecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
