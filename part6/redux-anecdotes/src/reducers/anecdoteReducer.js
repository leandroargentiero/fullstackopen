import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const annecdoteToChange = state.find((a) => a.id === id);
      const changedAnnecdote = {
        ...annecdoteToChange,
        votes: annecdoteToChange.votes + 1,
      };
      return state.map((a) =>
        a.id !== changedAnnecdote.id ? a : changedAnnecdote
      );
    },
    newAnecdote(state, action) {
      const content = action.payload;
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0,
      };
      anecdoteService.addNewAnecdote(newAnecdote);
      state.push(newAnecdote);
    },
    setAnecdotes(state, action) {
      return (state = action.payload);
    },
  },
});

export const { addVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initaliazeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export default anecdoteSlice.reducer;
