import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      const message = action.payload;
      return (state = `Anecdote ${message} was added.`);
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
