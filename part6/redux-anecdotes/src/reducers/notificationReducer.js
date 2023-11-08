import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications(state, action) {
      const message = action.payload;
      return message
    },
    unsetNotifications() {
      const emptyString = ""
      return emptyString
    },
  },
});

export const { setNotifications, unsetNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
