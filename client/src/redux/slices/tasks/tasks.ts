import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TaskSliceState, TaskType } from '../../../types/Task';
import {
  thunkTaskAdd,
  thunkTaskDelete,
  thunkTaskEdit,
  thunkTaskLoad,
} from './createAsyncThunk';

const initialState: TaskSliceState = {
  tasks: [],
  currentTask: null,
  favorites: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // addProducts: (state, action: PayloadAction<TaskType>) => {
    //   state.tasks.unshift(action.payload);
    // },
    // deleteProduct: (state, action: PayloadAction<TaskType['id']>) => {
    //   const targetIndex = state.tasks.findIndex((task) => task.id === action.payload);
    //   if (targetIndex !== -1) {
    //     state.tasks.splice(targetIndex, 1);
    //   }
    // },
    addFavoritesTask: (state, action: PayloadAction<TaskType>) => {
      const index = state.favorites.findIndex(
        (favorite) => favorite.id === action.payload.id,
      );
      if (index === -1) {
        state.favorites.unshift(action.payload);
      }
    },
    setCurrentTask: (
      state,
      action: PayloadAction<TaskSliceState['currentTask']>,
    ) => {
      state.currentTask = action.payload;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkTaskLoad.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(thunkTaskLoad.rejected, (state, action) =>
      console.log(action.error),
    );
    builder.addCase(thunkTaskAdd.fulfilled, (state, action) => {
      state.tasks.unshift(action.payload);
    });
    builder.addCase(thunkTaskAdd.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(thunkTaskDelete.fulfilled, (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
      state.currentTask = null;
    });
    builder.addCase(thunkTaskDelete.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(thunkTaskEdit.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.currentTask = null;
    });
  },
});

export const { setCurrentTask, clearCurrentTask, addFavoritesTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
