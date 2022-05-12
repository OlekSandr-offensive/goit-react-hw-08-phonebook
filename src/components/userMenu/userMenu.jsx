import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import { logOut } from '../../redux/auth/auth-operation';
import defaultAvatar from '../userMenu/default-avatar.png';
import '../../styles/UserMenu.scss';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;

  return (
    <div className="menu-container">
      <img src={avatar} alt="" width="32px" className="avatar-img" />
      <span className="name-title"> Вітаємо {name}</span>
      <button type="button" onClick={() => dispatch(logOut())}>
        Вихід
      </button>
    </div>
  );
}
