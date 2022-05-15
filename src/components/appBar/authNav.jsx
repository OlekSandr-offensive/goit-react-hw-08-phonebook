import { NavLink } from 'react-router-dom';
import './AuthNav.scss';

const AuthNav = () => (
  <div className="auth-link">
    <NavLink to="/register" className="link">
      Регістрація
    </NavLink>
    <NavLink to="/login" className="link">
      Логін
    </NavLink>
  </div>
);

export default AuthNav;
