import { Container } from '@mui/material';
import React from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/form/AddTaskForm';

export default function TaskPage(): JSX.Element {
  return (
    <Container sx={{ margin: 'auto' }}>
      <AddTaskForm />
      <TaskList />
    </Container>
  );
}
