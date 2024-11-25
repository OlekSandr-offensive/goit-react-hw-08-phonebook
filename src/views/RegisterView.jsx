import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../redux/auth/auth-operation';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '../components/contactForm/ContactForm.css';

const RegisterView = () => {
  const history = useHistory();
  const [register] = useRegisterMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat_password, setRepeat_password] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'repeat_password':
        return setRepeat_password(value);
      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      name.length <= 0 ||
      email.length <= 0 ||
      password.length <= 0 ||
      repeat_password.length <= 0
    ) {
      defaultModules.set(PNotifyMobile, {});
      alert({
        text: `Fill in the fields`,
      });
      return;
    }
    try {
      await register({ name, email, password, repeat_password }).unwrap();
      history.push('/login');
      setEmail('');
      setPassword('');
      setName('');
      setRepeat_password('');
    } catch (error) {
      defaultModules.set(PNotifyMobile, {});
      alert({
        text: `${error.data.message}`,
      });
    }
  };

  return (
    <div>
      <h1>Registration page</h1>

      <div className="ContactForm">
        <form onSubmit={handleSubmit} className="form-input" autoComplete="off">
          <label>
            Name
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={name}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
            />
          </label>
          <label>
            Mail
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleChange}
              required
              minLength={6}
              maxLength={40}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
              required
              minLength={6}
              maxLength={30}
            />
          </label>
          <label>
            Repeat password
            <input
              type="password"
              id="repeat_password"
              name="repeat_password"
              placeholder="repeat password"
              value={repeat_password}
              onChange={handleChange}
              required
              minLength={6}
              maxLength={30}
            />
          </label>
          <button type="submit" className="formButton">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
