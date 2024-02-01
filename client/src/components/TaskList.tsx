import React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '../redux/hook';
import TaskCard from './TaskCard';
import EditTaskFormModal from './form/EditTaskModal';


export default function TaskList(): JSX.Element {
  const tasks = useAppSelector((state) => state.tasksSlice.tasks);
  return (
    <Grid container spacing={3}>
      {tasks.map((task) => (
        <Grid key={task.id} item xs={4}>
          <TaskCard task={task} />
        </Grid>
      ))}
      <EditTaskFormModal/>
    </Grid>
  );
}