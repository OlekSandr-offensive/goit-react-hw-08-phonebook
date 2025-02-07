import React, { forwardRef, useState, useRef } from 'react';
import { useUpdateAvatarMutation } from 'redux/auth/auth-operation';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '../../styles/UserMenu.css';

export const Dialog = forwardRef(
  ({ children, setIsOpenModal, setIsShowDialog, setIsOpenForm }, ref) => {
    const [updateAvatar] = useUpdateAvatarMutation();
    const filePicker = useRef(null);

    const handleClick = () => {
      setIsOpenModal(true);
      setIsShowDialog(false);
    };

    const handlePick = () => {
      filePicker.current.click();
    };

    const handleUpload = async e => {
      e.preventDefault();
      setIsShowDialog(false);
      const file = e.target.files[0];

      if (!file) {
        defaultModules.set(PNotifyMobile, {});
        alert({
          text: `Please select a file`,
        });
        return;
      }

      try {
        await updateAvatar(file).unwrap();
      } catch (error) {
        defaultModules.set(PNotifyMobile, {});
        alert({
          text: `${error.data.message}`,
        });
      }
    };

    return (
      <>
        {' '}
        <dialog ref={ref} className="dialog">
          {children}

          <button type="button" onClick={handleClick} className="dialogBtb">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 32"
              className="dialogSvg"
            >
              <path d="M34 4h-2v-2c0-1.1-0.9-2-2-2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h2v2c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2zM4 6v20h-1.996c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993c0.001 0.001 0.003 0.002 0.004 0.004v1.996h-24c-1.1 0-2 0.9-2 2v0zM34 29.996c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993c0.001 0.001 0.003 0.002 0.004 0.004v23.993z"></path>
              <path d="M30 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
              <path d="M32 28h-24v-4l7-12 8 10h2l7-6z"></path>
            </svg>
            view the main image
          </button>
          <button type="button" onClick={handlePick} className="dialogBtb">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="dialogSvg"
            >
              <path d="M27.883 12.078c0.076-0.347 0.117-0.708 0.117-1.078 0-2.761-2.239-5-5-5-0.444 0-0.875 0.058-1.285 0.167-0.775-2.417-3.040-4.167-5.715-4.167-2.73 0-5.033 1.823-5.76 4.318-0.711-0.207-1.462-0.318-2.24-0.318-4.418 0-8 3.582-8 8s3.582 8 8 8h4v6h8v-6h7c2.761 0 5-2.239 5-5 0-2.46-1.777-4.505-4.117-4.922zM18 20v6h-4v-6h-5l7-7 7 7h-5z"></path>
            </svg>
            load the main image
          </button>
          <form
            encType="multipart/form-data"
            aria-label="Upload file"
            className="hidden"
            method="dialog"
          >
            <input
              ref={filePicker}
              type="file"
              name="avatar"
              accept="image/*,.png,.jpg,.gif,.web"
              onChange={handleUpload}
              required
            />
          </form>
          <div className="arrow"></div>
        </dialog>
      </>
    );
  }
);
