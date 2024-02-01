import React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '../redux/hook';
import TaskCard from './TaskCard';


export default function FavoritesTaskList(): JSX.Element {
  const favorites = useAppSelector((state) => state.tasksSlice.favorites)
  console.log('$$$$$$$', favorites)
  return (
    <Grid container spacing={3}>
      {favorites.map((task) => (
        <Grid key={task.id} item xs={4}>
               <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
}