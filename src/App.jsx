import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import ContactList from './contacts/ContactList';
// import ContactForm from './contactForm/ContactForm';
// import Filter from './filter/Filter';
import AppBar from './components/appBar/AppBar';
import ContactsView from './views/ContactsView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import Container from './components/container/Container';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Container>
        <AppBar />

        <Routes>
          <Route exact path="/" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          {/* <Route path="/contacts" element={<ContactsView />} /> */}
        </Routes>
      </Container>
    </div>

    // <div className="App">
    //   <h1>Phonebook</h1>
    //   <ContactForm />
    //   <ToastContainer autoClose={3000} />
    //   <h2>Contacts</h2>
    //   <Filter />
    //   <ContactList />
    // </div>
  );
}
