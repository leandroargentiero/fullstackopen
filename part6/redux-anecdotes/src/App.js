import { useSelector, useDispatch } from "react-redux";
import AnnecdoteForm from "./components/AnnecdoteForm";
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
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <AnnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
