import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import './Navigation.css';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <nav>
      <NavLink to="/" className="link" exact activeClassName="activeLink">
        Main
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className="link"
          exact
          activeClassName="activeLink"
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
