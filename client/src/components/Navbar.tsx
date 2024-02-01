import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Grid,
  Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
// import OwlIcon from './Icons/OwlIcon';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import OwlIcon from './icons/OwnIcon';
import { thunkAuthLogout } from '../redux/slices/auth/createAsynsThunk';

export default function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.authSlice);

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Grid container justifyContent="space-around">
          <Grid item display="flex">
            <Box>
              <OwlIcon />
            </Box>
            <Typography variant="h6">
              {auth.user.status === 'authenticated'
                ? `Здорова, ${auth.user.name}`
                : ' Гость'}
            </Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" component={Link} href="/">
              Главная
            </Button>
            {auth.user.status !== 'authenticated' ? (
              <>
                <Button color="inherit" component={Link} href="/login">
                  Авторизация
                </Button>
                <Button color="inherit" component={Link} href="/signup">
                  Регистрация
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => void dispatch(thunkAuthLogout())}
                >
                  Выйти
                </Button>
                <Button color="inherit" component={NavLink} to="/favor">
                  Избранное
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
