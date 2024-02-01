import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks/tasks';
import authReduser from './slices/auth/authSlice'


export const store = configureStore({
  reducer: {
    tasksSlice: tasksReducer,
    authSlice:authReduser,
   
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
