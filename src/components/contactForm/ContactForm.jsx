import React, { useState } from 'react';
import {
  useFetchContactsQuery,
  useAddContactMutation,
} from 'redux/contacts/contacts-operation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactForm.css';

export default function ContactForm() {
  const { data: contacts } = useFetchContactsQuery();
  const [AddContact] = useAddContactMutation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleInputChanged = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const findContact = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (findContact) {
      toast.error(`${name} is already in contacts.`);
      reset();
    } else {
      await AddContact({ name, phone });
      reset();
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className="ContactForm" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChanged}
          required
          minLength={3}
          maxLength={50}
        />
      </label>
      <label>
        Phone
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={handleInputChanged}
          required
          minLength={6}
          maxLength={30}
        />
      </label>
      <button type="submit" className="formButton">
        Add contact
      </button>
    </form>
  );
}
