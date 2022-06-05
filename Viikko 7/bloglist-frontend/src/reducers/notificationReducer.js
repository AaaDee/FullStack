import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      state.value = action.payload;
    },
  },
});

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(updateNotification(content));
    const id = setTimeout(() => {
      dispatch(updateNotification(''));
    }, timeout * 1000);
    clearTimeout(id - 1);
  };
};

export const { updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
