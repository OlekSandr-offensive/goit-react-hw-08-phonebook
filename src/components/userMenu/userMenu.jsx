import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import { useLogOutMutation } from '../../redux/auth/auth-operation';
import defaultAvatar from '../userMenu/default-avatar.png';
import '../../styles/UserMenu.css';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

export default function UserMenu() {
  const [logOut] = useLogOutMutation();
  const name = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;

  const exitLogin = () => {
    logOut()
      .then()
      .catch(error => {
        defaultModules.set(PNotifyMobile, {});
        alert({
          text: `Не вдалося вийти з облікового запису, текст помилки ${error}`,
        });
      });
  };

  return (
    <div className="menu-container">
      <img src={avatar} alt="" width="32px" className="avatar-img" />
      <span className="name-title"> Вітаємо {name}</span>
      <button type="button" onClick={exitLogin}>
        Вихід
      </button>
    </div>
  );
}

// import { useDispatch, useSelector } from 'react-redux';
// import authSelectors from '../../redux/auth/auth-selectors';
// import authApi from '../../redux/auth/auth-operation';
// import defaultAvatar from '../userMenu/default-avatar.png';
// import '../../styles/UserMenu.css';

// export default function UserMenu() {
//   const dispatch = useDispatch();
//   const name = useSelector(authSelectors.getUserName);
//   const avatar = defaultAvatar;

//   const exitLogin = () => {
//     dispatch(authApi.logOut());
//   };

//   return (
//     <div className="menu-container">
//       <img src={avatar} alt="" width="32px" className="avatar-img" />
//       <span className="name-title"> Вітаємо {name}</span>
//       <button type="button" onClick={exitLogin}>
//         Вихід
//       </button>
//     </div>
//   );
// }
