import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../redux/hook';
import type { TaskType } from '../types/Task';
import { thunkTaskDelete } from '../redux/slices/tasks/createAsyncThunk';
import { addFavoritesTask, setCurrentTask } from '../redux/slices/tasks/tasks';

type TaskTypeProps = {
  task: TaskType;
};

function TaskCard({ task }: TaskTypeProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {task.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {task.tag}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.dop}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => void dispatch(thunkTaskDelete(task.id))}
        >
          Удалить
        </Button>
        <Button
          size="small"
            onClick={() => {
              dispatch(setCurrentTask(task));
            }}
        >
          Изменить
        </Button>
        <Button
          size="small"
            onClick={() => {
              dispatch(addFavoritesTask(task));
            }}
        >
          Избранное
        </Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(TaskCard);
