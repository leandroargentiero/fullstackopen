import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnnecdoteForm from "./components/AnnecdoteForm";
import Notification from "./components/Notification";
import {
  addVote,
  initaliazeAnecdotes,
  createNewAnecdote,
  addNewVote,
} from "./reducers/anecdoteReducer";
import {
  anecdoteNotification,
  voteNotification,
} from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);
  const showNotification = useSelector(
    ({ notification }) => notification.visible
  );

  useEffect(() => {
    dispatch(initaliazeAnecdotes());
  }, [dispatch]);

  const vote = (annecdote) => {
    if (annecdote.id) {
      dispatch(addNewVote(annecdote));
      dispatch(voteNotification(annecdote.content));
    }
  };

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.annecdote.value;
    e.target.annecdote.value = "";
    dispatch(createNewAnecdote(content));
    dispatch(anecdoteNotification(content));
  };

  return (
    <div>
      {showNotification && <Notification />}
      <h2>Anecdotes</h2>
      {[...anecdotes]
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      <AnnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
