import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
          <Route path="/contacts" element={<ContactsView />} />
        </Routes>
      </Container>
    </div>
  );
}
