import { Box, Button, FormControl } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../redux/hook';
import CustomTextField from '../costom/CostomTextStyle';
import { thunkAuthLogin } from '../../redux/slices/auth/createAsynsThunk';
import type { LoginFormData } from '../../types/auth';

export default function SignUpForm(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.currentTarget),
          ) as LoginFormData;
          void dispatch(thunkAuthLogin(formData))
        }}
      >
        <FormControl
          sx={{
            padding: '10px',
            height: '200px',
            justifyContent: 'space-around',
            borderRadius: '12px',
            border: '2px solid black',
          }}
        >
          <CustomTextField name="email" label="Email" type="text" />
          <CustomTextField name="password" label="Password" type="text" />
          <Button type="submit">SignUp</Button>
        </FormControl>
      </form>
    </Box>
  );
}
