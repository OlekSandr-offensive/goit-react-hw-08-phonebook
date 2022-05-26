import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/auth-operation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/contactForm/ContactForm.css';

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
    if (name.length <= 0 || email.length <= 0 || password.length <= 0) {
      toast.error('Заповніть поля');
      return;
    }
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
              id="name"
              value={name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Пошта
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              pattern="[^ @]*@[^ @]*"
              required
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
              required
            />
          </label>
          <button type="submit">Зареєструватися</button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
