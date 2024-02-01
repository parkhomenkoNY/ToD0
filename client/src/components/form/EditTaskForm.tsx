import React from 'react';
import { Box, Button, FormControl } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { thunkTaskEdit } from '../../redux/slices/tasks/createAsyncThunk';
import type { AddTaskFormData } from '../../types/Task';
import CustomTextField from '../costom/CostomTextStyle';
import { clearCurrentTask } from '../../redux/slices/tasks/tasks';

function EditTaskForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.tasksSlice.currentTask);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget)) as AddTaskFormData;
        void dispatch(thunkTaskEdit({formData, id:content?.id}));
      }}
    >
      <FormControl
        sx={{
          margin: '30px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '600px',
          borderRadius: '12px',
        }}
      >
        <CustomTextField name="name" label="Задача" type="text" defaultValue={content?.name} />
        <CustomTextField name="tag" label="Категория" type="text" defaultValue={content?.tag} />
        <CustomTextField name="dop" label="Описание" type="text" defaultValue={content?.dop} />
        <Box>
          <Button type="submit" color="inherit">
            Изменить
          </Button>
          <Button color="inherit" onClick={() => dispatch(clearCurrentTask())}>
            Закрыть
          </Button>
        </Box>
      </FormControl>
    </form>
  );
}

export default React.memo(EditTaskForm);
