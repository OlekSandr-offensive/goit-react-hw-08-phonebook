import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/auth-operation';
// import '../styles/Register.scss';
import '../components/contactForm/ContactForm.scss';

const LoginView = () => {
  const dispatch = useDispatch();
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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setEmail('');
    setPassword('');
    setName('');
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
              value={name}
              onChange={handleChange}
            />
          </label>
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
          <button type="submit">Зареєструватися</button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
