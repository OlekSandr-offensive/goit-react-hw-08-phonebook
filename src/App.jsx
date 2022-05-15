import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import AppBar from './components/appBar/AppBar';
// import ContactsView from './views/ContactsView';
// import HomeView from './views/HomeView';
// import LoginView from './views/LoginView';
// import RegisterView from './views/RegisterView';
import Container from './components/container/Container';
import { fetchCurrentUser } from './redux/auth/auth-operation';
// import { useSelector } from 'react-redux';
// import authSelectors from './redux/auth/auth-selectors';
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
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <AppBar />
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
          {' '}
          <Routes>
            <Route exact path="/" element={<HomeView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/contacts" element={<ContactsView />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
}
