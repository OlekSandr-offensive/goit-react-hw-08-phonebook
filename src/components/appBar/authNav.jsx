import { NavLink } from 'react-router-dom';
import './AuthNav.css';

const AuthNav = () => (
  <div className="auth-link">
    <NavLink to="/register" className="link">
      Sing Up
    </NavLink>
    <NavLink to="/login" className="link">
      Sing In
    </NavLink>
  </div>
);

export default AuthNav;
