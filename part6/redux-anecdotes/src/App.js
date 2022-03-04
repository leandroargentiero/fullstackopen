import { useSelector, useDispatch } from "react-redux";
import AnnecdoteForm from "./components/AnnecdoteForm";
import Notification from "./components/Notification";
import { addVote, newAnecdote } from "./reducers/anecdoteReducer";
import { addNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);

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
    dispatch(newAnecdote(content));
    dispatch(addNotification(content));
  };

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      {[...anecdotes]
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
