import React from 'react';
import { Button, FormControl } from '@mui/material';
import { useAppDispatch } from '../../redux/hook';
import { thunkTaskAdd } from '../../redux/slices/tasks/createAsyncThunk';
import type { AddTaskFormData } from '../../types/Task';
import CustomTextField from '../costom/CostomTextStyle';

function AddTaskForm(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget)) as AddTaskFormData;
        void dispatch(thunkTaskAdd(formData));
        e.currentTarget.reset();
      }}
    >
      <FormControl
        sx={{
          margin: '30px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100px',
          borderRadius: '12px',
          border: '2px solid #FACDC6',
        }}
      >
        <CustomTextField name="name" label="Задача" type="text" />
        <CustomTextField name="tag" label="Группа" type="text" />
        <CustomTextField name="dop" label="Описание" type="text" />
        <Button type="submit">Добавить</Button>
      </FormControl>
    </form>
  );
}

export default React.memo(AddTaskForm);
