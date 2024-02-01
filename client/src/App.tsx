import type { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hook';
import TaskPage from './pages/TaskPage';
import { thunkTaskLoad } from './redux/slices/tasks/createAsyncThunk';
import { thunkAuthCheck, thunkAuthRefresh } from './redux/slices/auth/createAsynsThunk';
import NavBar from './components/Navbar';
import PrivateRouter from './components/privateRouter/PrivateRouter';
import RegistrationPage from './pages/RegistrationPage';
import SignUpPage from './pages/SignUpPage';
import { apiTaskServise } from './servises/task';
import FavoritesTaskList from './components/FavoritesList';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.authSlice);

  useEffect(() => {
    void dispatch(thunkTaskLoad());
    void dispatch(thunkAuthCheck());
  }, []);

  useEffect(() => {
    const requestInterceptor = apiTaskServise.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    const responseInterceptor = apiTaskServise.interceptors.response.use(
      (res) => res,
      async (err: AxiosError & { config: { sent?: boolean } }) => {
        const prevRequest = err.config;
        if (err.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await dispatch(thunkAuthRefresh()).unwrap();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken.accessToken}`;
          return apiTaskServise(prevRequest);
        }
        return Promise.reject(err);
      },
    );

    return () => {
      apiTaskServise.interceptors.request.eject(requestInterceptor);
      apiTaskServise.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.accessToken]);
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path="/" element={<TaskPage />} />
          <Route path="/favor" element={<FavoritesTaskList />} />
          <Route
            element={
              <PrivateRouter
                isAllowed={auth.user.status === 'authenticated'}
                redirectPath="/"
              />
            }
          >
            <Route path="/login" element={<SignUpPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            
          </Route>
          <Route
            element={
              <PrivateRouter
                isAllowed={auth.user.status !== 'authenticated'}
                redirectPath="/login"
              />
            }
          />
        </>
      </Routes>
    </>
  );
}

export default App;
