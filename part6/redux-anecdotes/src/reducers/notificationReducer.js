import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  visible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    anecdoteNotification(state, action) {
      const anecdote = action.payload;
      return (state = {
        message: `Anecdote '${anecdote}' was added.`,
        visible: true,
      });
    },
    voteNotification(state, action) {
      const content = action.payload;
      return (state = {
        message: `you voted '${content}'`,
        visible: true,
      });
    },
    toggleVisibility(state, action) {
      return (state = {
        ...state,
        visible: !state.visible,
      });
    },
  },
});

export const { anecdoteNotification, voteNotification, toggleVisibility } =
  notificationSlice.actions;
export default notificationSlice.reducer;
