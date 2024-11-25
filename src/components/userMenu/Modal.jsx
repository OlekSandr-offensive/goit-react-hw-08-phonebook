import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import '../../styles/UserMenu.css';

const modalRootAvatar = document.querySelector('#modal-root-avatar');

const Modal = ({ children, isOpenModal, setIsOpenModal }) => {
  const profile_img = useSelector(authSelectors.getAvatar);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      setIsOpenModal(false);
    }
  };
  const handleBlackDropClick = e => {
    if (e.target === e.currentTarget) {
      setIsOpenModal(false);
    }
  };

  if (!isOpenModal) {
    return null;
  }

  return createPortal(
    <div className="Overlay" onClick={handleBlackDropClick}>
      <div className="Modal">
        {children}
        <img src={profile_img} alt="avatar" className="profileImg" />
      </div>
    </div>,
    modalRootAvatar
  );
};

export default Modal;
