import React, { useState } from 'react';
import { useRegisterMutation } from '../redux/auth/auth-operation';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '../components/contactForm/ContactForm.css';

const LoginView = () => {
  const [register] = useRegisterMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (name.length <= 0 || email.length <= 0 || password.length <= 0) {
      defaultModules.set(PNotifyMobile, {});
      alert({
        text: `Заповніть поля`,
      });
      return;
    }
    try {
      await register({ name, email, password }).unwrap();
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      defaultModules.set(PNotifyMobile, {});
      alert({
        text: `Не вдалося зареєструватися`,
      });
    }
  };

  return (
    <div>
      <h1>Сторінка регістрація</h1>

      <div className="ContactForm">
        <form onSubmit={handleSubmit} className="form-input" autoComplete="off">
          <label>
            Ім'я
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={name}
              onChange={handleChange}
            />
          </label>
          <label>
            Пошта
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleChange}
              pattern="[^ @]*@[^ @]*"
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
          </label>
          <button type="submit">Зареєструватися</button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
