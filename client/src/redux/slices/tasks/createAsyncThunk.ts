import { createAsyncThunk } from '@reduxjs/toolkit';
import TaskServise from '../../../servises/task';
import type { AddTaskFormData, TaskType } from '../../../types/Task';

export const thunkTaskLoad = createAsyncThunk(
  'tasksSlise/thunkTaskLoad',
  async () => TaskServise.getTask(),
);

export const thunkTaskAdd = createAsyncThunk(
  'tasksSlise/thunkTaskAdd',
  async (formData: AddTaskFormData) => TaskServise.addTask(formData),
);

export const thunkTaskDelete = createAsyncThunk(
  'tasksSlise/thunkTaskDelete',
  async (id: TaskType['id']) => TaskServise.deleteTask(id),
);

export const thunkTaskEdit = createAsyncThunk(
  'tasksSlise/thunkTaskEdit',
  async ({id, formData}: {id :TaskType['id'], formData: AddTaskFormData}) =>
    TaskServise.editTask(id, formData),
);
