import React, { useState } from 'react';
import { mail, lockClosed } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Login = ( {handletoggleregisterClick} ) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      console.log(response.data); // Handle successful login
      login(formData.username);
    } catch (error) {
      console.error('Login failed:', error.message); // Handle login error
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <span className="icon">
            <IonIcon icon={mail}></IonIcon>
          </span>
          <input type="text" name="username" onChange={handleChange} required />
          <label>Username</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <IonIcon icon={lockClosed}></IonIcon>
          </span>
          <input type="password" name='password' onChange={handleChange} required />
          <label>Password</label>
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="login-register">
          <p>Don't have an account?<a href="#" className="register-link" onClick={handletoggleregisterClick}> Register</a></p>
        </div>
      </form>
    </>
  );
};

export default Login;
