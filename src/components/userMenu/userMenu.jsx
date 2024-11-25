import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import { useLogOutMutation } from '../../redux/auth/auth-operation';
import ImageButton from './ImageButton';
import '../../styles/UserMenu.css';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

export default function UserMenu() {
  const [logOut] = useLogOutMutation();
  const name = useSelector(authSelectors.getUserName);

  const exitLogin = () => {
    logOut()
      .then()
      .catch(error => {
        defaultModules.set(PNotifyMobile, {});
        alert({
          text: `Failed to sign out, error text ${error}`,
        });
      });
  };

  return (
    <div className="menu-container">
      <ImageButton />
      <span className="name-title"> Congratulations, {name}!</span>
      <button type="button" onClick={exitLogin} className="menuButton">
        Exit
      </button>
    </div>
  );
}
