import { createSlice } from '@reduxjs/toolkit';
import type { AuthSliceState } from '../../../types/auth';
import { thunkAuthCheck, thunkAuthLogin, thunkAuthLogout, thunkAuthRefresh, thunkAuthSignup } from './createAsynsThunk';

const initialState: AuthSliceState = { accessToken: '', user: { status: 'pending' } };
const guestState: AuthSliceState = {
  accessToken: '',
  user: { status: 'guest' },
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkAuthLogin.fulfilled, (state, action) => action.payload);
   
    builder.addCase(thunkAuthLogin.rejected, (state, action) => guestState);

    builder.addCase(thunkAuthCheck.fulfilled, (state, action) => action.payload);
    
    builder.addCase(thunkAuthCheck.rejected, (state, action) => guestState);

    builder.addCase(thunkAuthSignup.fulfilled, (state, action) => action.payload);
     
    builder.addCase(thunkAuthSignup.rejected, (state, action) => guestState);

    builder.addCase(thunkAuthLogout.fulfilled, (state, action) => guestState);

    builder.addCase(thunkAuthRefresh.fulfilled, (state, action) => action.payload);
    
    builder.addCase(thunkAuthRefresh.rejected, (state, action) => guestState);
  },
});


export default authSlice.reducer;
