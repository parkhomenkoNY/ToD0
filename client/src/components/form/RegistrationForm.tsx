import { Box, Button, FormControl } from '@mui/material';
import React from 'react';
import CustomTextField from '../costom/CostomTextStyle';
import { thunkAuthSignup } from '../../redux/slices/auth/createAsynsThunk';
import { useAppDispatch } from '../../redux/hook';

export default function RegistrationForm(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.currentTarget),
          ) as SignupFormData;
          void dispatch(thunkAuthSignup(formData));
        }}
      >
        <FormControl
          sx={{
            padding: '10px',
            height: '300px',
            justifyContent: 'space-around',
            borderRadius: '12px',
            border: '2px solid black',
          }}
        >
          <CustomTextField name="name" label="Name" type="text" />
          <CustomTextField name="email" label="Email" type="text" />
          <CustomTextField name="password" label="Password" type="text" />
          <Button type="submit">Registration</Button>
        </FormControl>
      </form>
    </Box>
  );
}
