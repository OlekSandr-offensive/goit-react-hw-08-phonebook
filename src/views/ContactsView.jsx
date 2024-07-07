import { ToastContainer } from 'react-toastify';
import ContactList from '../components/contacts/ContactList';
import ContactForm from '../components/contactForm/ContactForm';
import Filter from '../components/filter/Filter';
import '../App.css';

export default function ContactsView() {
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <ToastContainer autoClose={3000} />
      <h2>Contacts</h2>
      <Filter />
      {/* <ContactList /> */}
    </div>
  );
}
