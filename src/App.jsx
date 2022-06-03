import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { lazy, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import AppBar from './components/appBar/AppBar';
import PrivateRoute from './components/appBar/PrivateRoute';
import PublicRoute from './components/appBar/PublicRoute';
import Container from './components/container/Container';
import {
  fetchCurrentUser,
  useFetchCurrentUserQuery,
} from './redux/auth/auth-operation';
import { useSelector } from 'react-redux';
import authSelectors from './redux/auth/auth-selectors';
import './App.css';

const HomeView = lazy(() =>
  import('views/HomeView' /* webpackChunkName: "HomeViewLazy" */)
);
const RegisterView = lazy(() =>
  import('views/RegisterView' /* webpackChunkName: "RegisterViewLazy" */)
);
const LoginView = lazy(() =>
  import('views/LoginView' /* webpackChunkName: "LoginViewLazy" */)
);
const ContactsView = lazy(() =>
  import('views/ContactsView' /* webpackChunkName: "ContactsViewLazy" */)
);

export default function App() {
  // const dispatch = useDispatch();
  const { isLoading } = useFetchCurrentUserQuery();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser
  );

  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, [dispatch]);

  return (
    <>
      {isLoading && <Watch />}
      {!isFetchingCurrentUser && (
        <div className="App">
          <Container>
            <AppBar />
            <Switch>
              <Suspense
                fallback={
                  <>
                    <Watch
                      height="100"
                      width="100"
                      color="teal"
                      ariaLabel="loading"
                    />
                  </>
                }
              >
                <PublicRoute exact path="/">
                  <HomeView />
                </PublicRoute>
                <PublicRoute path="/register" redirectTo="/contacts" restricted>
                  <RegisterView />
                </PublicRoute>
                <PublicRoute path="/login" redirectTo="/contacts" restricted>
                  <LoginView />
                </PublicRoute>
                <Redirect to="/contacts" />
                <PrivateRoute path="/contacts" redirectTo="/login">
                  <ContactsView />
                </PrivateRoute>
              </Suspense>
            </Switch>
          </Container>
        </div>
      )}
    </>
  );
}
