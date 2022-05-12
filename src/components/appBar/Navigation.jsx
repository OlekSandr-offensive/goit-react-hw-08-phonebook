import { NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => (
  <nav>
    <NavLink to="/" exact className="link">
      Головна
    </NavLink>
    <NavLink to="/contacts" className="link">
      Контакти
    </NavLink>
  </nav>
);

export default Navigation;
