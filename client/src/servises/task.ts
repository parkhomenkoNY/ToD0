import axios from 'axios';
import type { AddTaskFormData, TaskType } from '../types/Task';

export const apiTaskServise = axios.create({
  baseURL: 'http://localhost:4000/api/tasks',
  // VITE_SERVER_BASEURL=http://localhost:3000/api/v1/ 

});

class TaskServise {
  static async getTask(): Promise<TaskType[]> {
    const response = await apiTaskServise.get<TaskType[]>('/');
    if (response.status === 200) return response.data;
    return [];
  }

  static async addTask(taskFormData: AddTaskFormData): Promise<TaskType> {
    const response = await apiTaskServise.post<TaskType>('/', taskFormData);
    if (response.status === 201) return response.data;
    return Promise.reject(new Error('**server error adding task**'));
  }

  static async deleteTask(id: TaskType['id']): Promise<TaskType['id']> {
    const response = await apiTaskServise.delete<TaskType>(`/${id}`);
    if (response.status === 200) return id;
    return Promise.reject(new Error('**server error delete task**'));
  }

  static async editTask(
    id: TaskType['id'],
    taskFormData: AddTaskFormData,
  ): Promise<TaskType> {
    try {
      const response = await apiTaskServise.put<TaskType>(`/${id}`, taskFormData);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('**falied to update task**');
    } catch (error) {
      throw new Error('**server error edit task**');
    }
  }
}
export default TaskServise;
