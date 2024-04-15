import '../Homepage.css';
import React, { useState } from 'react';
import { person, mail, lockClosed } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';

const Register = (handletoggleloginClick, handleChange, handleSubmit) => {
    
  return (
    <>
        <h2>Registration</h2>
        <form action="#" onSubmit={handleSubmit}>
            <div className="input-box">
                <span className="icon">
                    <IonIcon icon={person}>
                    </IonIcon></span>
                <input type="text"  name='username' onChange={handleChange} required></input>
                <label>Username</label>
            </div>
            <div className="input-box">
                <span className="icon">
                    <IonIcon icon={mail}>
                    </IonIcon></span>
                <input type="email" name='email' onChange={handleChange} required></input>
                <label>Email</label>
            </div>
            <div className="input-box">
                <span className="icon">
                    <IonIcon icon={lockClosed}>
                    </IonIcon></span>
                <input type="password" name='password' onChange={handleChange} required></input>
                <label>Password</label>
            </div>
            <div className="remember-forgot">
                <label><input type="checkbox"></input>
                agree to the terms & conditions</label>
            </div>
            <button type="submit" className="btn">Register</button>
            <div className="login-register">
                <p>Already have an account?<a
                href="#"
                className="login-link" onClick={handletoggleloginClick}> Login</a></p>
            </div>
        </form>
    </>
  )
}

export default Register