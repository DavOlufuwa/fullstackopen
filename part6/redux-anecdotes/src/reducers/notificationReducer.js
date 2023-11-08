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

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setNotifications(message));
    setTimeout(() => dispatch(unsetNotifications()), timeout * 1000);
  };
};


export const { setNotifications, unsetNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
