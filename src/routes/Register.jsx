import "../LoginRegister.css";
import "../components/App.css";
import {Link, Form, json, redirect} from 'react-router-dom';
import { close, person, mail, lockClosed } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';
// import axios from 'axios';
// import { useState } from "react";

function Register() {
    // const [formData, setFormData] = useState({
    //     username: '',
    //     email: '',
    //     password: ''
    //   });  
    
    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     window.location.href = '/home';
    //     // try {
    //     //     setFormData({
    //     //         ...formData,
    //     //         [e.target.name]: e.target.value
    //     //       });
            
    //     //     console.log(formData);
    //     //     const response = await axios.post('http://127.0.0.1:8000/api/register', JSON.stringify(formData));
    //     //     console.log(response.data); // Handle successful registration
    //     //     return redirect('/home');
    //     // } catch (error) {
    //     //   console.error('Registration failed:', error.message); // Handle registration error
    //     // }
    //   };

      function handleCloseButtonClick() {
        window.location.href = '/';
    }

    return (
        <>
            <div className="wrapper active-popup">
            <span className="icon-close" onClick={handleCloseButtonClick}>
            <IonIcon icon={close}></IonIcon></span>
            <div className="form-box login">
            <h2>Registration</h2>
            <Form method="post">
                <div className="input-box">
                    <span className="icon">
                        <IonIcon icon={person}>
                        </IonIcon></span>
                    <input type="text"  name='username' required></input>
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <IonIcon icon={mail}>
                        </IonIcon></span>
                    <input type="email" name='email' required></input>
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <IonIcon icon={lockClosed}>
                        </IonIcon></span>
                    <input type="password" name='password' required></input>
                    <label>Password</label>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" required></input>
                    I agree to the terms & conditions</label>
                </div>
                <button type="submit" className="btn">Register</button>
                <div className="login-register">
                    <p>Already have an account?<Link
                    to="/login"
                    className="login-link"> Login</Link></p>
                </div>
            </Form>
            </div>
            </div>
    </>
    )
}

export default Register;

export async function action({request}) {
    const data = await request.formData();
    const eventData = {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password')
    }
    
    const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });
    if (!response.ok) {
        throw json(
            {message: 'Could not register user...'},
            {status: response.status}
        );
    } else {
        localStorage.setItem('username', eventData.username);
        window.location.href = '/home';
    }
}