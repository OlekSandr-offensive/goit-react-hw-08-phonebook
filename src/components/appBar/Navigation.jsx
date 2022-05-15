import { NavLink } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => (
  <nav>
    <NavLink to="/" exact className="link" activeclassname="activeLink">
      Головна
    </NavLink>
    <NavLink to="/contacts" exact className="link" activeclassname="activeLink">
      Контакти
    </NavLink>
  </nav>
);

export default Navigation;
