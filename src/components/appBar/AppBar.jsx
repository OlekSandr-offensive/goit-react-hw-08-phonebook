import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import AuthNav from './authNav';
import UserMenu from 'components/userMenu/userMenu';
import './AppBar.css';
import authSelectors from '../../redux/auth/auth-selectors';

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <header className="header-link">
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
