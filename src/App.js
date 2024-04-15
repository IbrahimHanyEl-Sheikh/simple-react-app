import './App.css';
import './Homepage.css';
import './script.js';
import React, { useState } from 'react';
import login from './pages/login.js';
import Register from './pages/register.js';
import { close } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';
import axios from 'axios';
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const handleLoginButtonClick = () => {
    setShowLogin(true);
    setShowForm(true);
  };
  const handletoggleregisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  const handletoggleloginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  const handleCloseButtonClick = () => {
    setShowForm(false);
  };
  const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(formData);
          const response = await axios.post('http://127.0.0.1:8000/api/register', JSON.stringify(formData));
          console.log(response.data); // Handle successful registration
        } catch (error) {
          console.error('Registration failed:', error.message); // Handle registration error
        }
      };
  return (
    <div>
      <header>
        <h2 className="logo">Codecad</h2>
        <nav className="navigation">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <button className="btnlogin-popup" onClick={handleLoginButtonClick}>Login</button>
            
        </nav>
      </header>
      {showForm && (
        <div className={showForm ? showLogin? "wrapper active-popup": "wrapper active-popup active" : "wrapper"}>
        <span className="icon-close" onClick={handleCloseButtonClick}>
          <IonIcon icon={close}></IonIcon></span>
        <div className = "form-box login" > {showLogin ? login(handletoggleregisterClick) : null} </div>
        <div className = "form-box register" > {showRegister ? Register(handletoggleloginClick, handleChange, handleSubmit) : null} </div>
      </div>
      )}
      
    </div>
  );
}

export default App;
