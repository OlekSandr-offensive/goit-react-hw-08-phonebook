import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import './Navigation.scss';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <nav>
      <NavLink to="/" className="link" activeclassname="activeLink">
        Головна
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className="link" activeclassname="activeLink">
          Контакти
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
