import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, fetchCurrentUser } from '../redux/auth/auth-operation';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '../components/contactForm/ContactForm.css';

const LoginView = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (email.length <= 0 || password.length <= 0) {
      defaultModules.set(PNotifyMobile, {});
      alert({
        text: `Заповніть поля`,
      });
      return;
    }
    dispatch(logIn({ email, password }));
    dispatch(fetchCurrentUser());
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Сторінка логіна</h1>

      <div className="ContactForm">
        <form onSubmit={handleSubmit} className="form-input" autoComplete="off">
          <label>
            Пошта
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              pattern="[^ @]*@[^ @]*"
              // required
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              // required
            ></input>
          </label>
          <button type="submit">Вхід</button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
