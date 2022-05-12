import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperation } from '../redux/auth/auth-operation';

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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch();
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Сторінка логіна</h1>

      <form onSubmit={handleSubmit} autocomplete="off">
        <label>
          Пошта
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
      </form>
      <button type="button" onSubmit={handleSubmit}>
        Вхід
      </button>
    </div>
  );
};

export default LoginView;
