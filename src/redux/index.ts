import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './topics';

const store = configureStore({
  reducer: {
    topics: topicsReducer,
  },
  devTools: process.env.NEXT_PUBLIC_DD_ENV !== 'prod',
});

export default store;
