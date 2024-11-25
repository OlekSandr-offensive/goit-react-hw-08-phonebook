import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import authSelectors from '../../redux/auth/auth-selectors';
import '../../styles/UserMenu.css';

const modalRootForm = document.querySelector('#modal-root-form');

const UploadForm = ({ isOpenForm }) => {
  if (!isOpenForm) {
    return null;
  }

  return createPortal(
    <dialog id="favDialog" className="Overlay">
      <form method="dialog">
        <section>
          <p>
            <label htmlFor="favAnimal">Favorite animal:</label>
            <select id="favAnimal">
              <option></option>
              <option>Brine shrimp</option>
              <option>Red panda</option>
              <option>Spider monkey</option>
            </select>
          </p>
        </section>
        <menu>
          <button id="cancel" type="reset">
            Cancel
          </button>
          <button type="submit">Confirm</button>
        </menu>
      </form>
    </dialog>,
    modalRootForm
  );
};

export default UploadForm;
