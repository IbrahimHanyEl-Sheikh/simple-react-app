import React, { useState } from 'react';
import './App.css';
import './Homepage.css';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Courses from './pages/Courses.js';
import { close } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';
import { useAuth } from './AuthContext';
import Home from './pages/Home';

function App() {
  const { isLoggedIn, logout } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowCourses(false);
  };

  const handletoggleregisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowCourses(true);
  };

  const handleCoursesButtonClick = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowCourses(true);
  };

  const handleCloseButtonClick = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowCourses(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ width: '100%' }}>
      <header>
        <h2 className="logo">Codecad</h2>
        <nav className="navigation">
          <a href="/">Home</a>
          {isLoggedIn && <a href="#" onClick={handleCoursesButtonClick}>Courses</a>}
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          {isLoggedIn ? (
            <>
              <button className="btnlogin-popup" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="btnlogin-popup" onClick={handleLoginButtonClick}>Login</button>
          )}
        </nav>
      </header>
      {isLoggedIn && !showCourses && <Home />}
      {!isLoggedIn && (showLogin || showRegister) && (
        <div className="wrapper">
          {showRegister && (
            <div className="form-box login">
              <Register handletoggleloginClick={handleLoginButtonClick} />
            </div>
          )}
          {showLogin && (
            <div className="form-box login">
              <Login handletoggleregisterClick={handletoggleregisterClick} />
            </div>
          )}
          <span className="icon-close" onClick={handleCloseButtonClick}>
            <IonIcon icon={close}></IonIcon>
          </span>
        </div>
      )}
      {isLoggedIn && showCourses && <Courses />}
    </div>
  );
}

export default App;
