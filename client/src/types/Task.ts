export type TaskType = {
  id: number;
  name: string;
  tag: string;
  status: boolean;
  dop: string;
};

export type AddTaskFormData = {
  name: string;
  tag: string;
  dop: string;
};

export type TasksState = {
  tasks: TaskType[];
};

export type TaskSliceState = {
  tasks: TaskType[];
  currentTask: TaskType | null;
  favorites: TaskType[];
};
