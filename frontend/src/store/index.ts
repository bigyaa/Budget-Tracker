import { configureStore } from '@reduxjs/toolkit';

import transactionReducer from './reducers/transactionSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;