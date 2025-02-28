import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import '../../styles/UserMenu.css';
import { useRef, useState } from 'react';
import { Dialog } from './Dialog';
import { Watch } from 'react-loader-spinner';
import { useClickOutside } from './useClickOutside';
import Modal from './Modal';
import { useFetchCurrentUserQuery } from '../../redux/auth/auth-operation';

export default function ImageButton() {
  const user = useSelector(authSelectors.getCurrentUser);
  const { isLoading } = useFetchCurrentUserQuery(user);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const profile_img = useSelector(authSelectors.getAvatar);
  const buttonRef = useRef(null);

  const childProps = {
    isOpenForm,
    isOpenModal,
    setIsOpenModal,
    setIsShowDialog,
    setIsOpenForm,
  };

  const domNode = useClickOutside(() => {
    setIsShowDialog(false);
  }, [isShowDialog]);

  return (
    <>
      <div className="avatar">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => setIsShowDialog(true)}
          className="btn"
          aria-label="User profile"
        >
          {isLoading ? (
            <Watch height="20" width="20" color="teal" ariaLabel="loading" />
          ) : (
            <img
              src={profile_img}
              alt="User Avatar"
              width="50px"
              className="avatar-img"
            />
          )}
        </button>
        {isShowDialog && <Dialog ref={domNode} {...childProps} />}
      </div>
      {isOpenModal && <Modal {...childProps} />}
    </>
  );
}
