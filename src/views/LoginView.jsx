import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, fetchCurrentUser } from '../redux/auth/auth-operation';
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

  const handleSubmit = e => {
    e.preventDefault();
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
          <button type="submit">Вхід</button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
