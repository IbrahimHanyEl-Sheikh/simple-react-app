import "../LoginRegister.css";
import "../components/App.css";
import { Link, Form, redirect, json } from "react-router-dom";
import { close, person, lockClosed } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';

function Login() {
    function handleCloseButtonClick() {
        window.location.href = '/';
    }
    return (
        <>
            <div className="wrapper active-popup">
            <span className="icon-close" onClick={handleCloseButtonClick}>
            <IonIcon icon={close}></IonIcon></span>
            <div className="form-box login">
            <h2>Login</h2>
            <Form method="post">
                <div className="input-box">
                    <span className="icon">
                        <IonIcon icon={person}></IonIcon>
                    </span>
                    <input id="username" type="text" name="username" required></input>
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <IonIcon icon={lockClosed}></IonIcon>
                        </span>
                    <input id="password" type="password" name="password" required></input>
                    <label>Password</label>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"></input>Remember me</label>
                    <Link to="/register">Forgot Password?</Link>
                </div>
                <button id="Login" type="submit" className="btn">Login</button>
                <div className="login-register">
                    <p>Don't have an account?
                    <Link id="register_redirect" to="/register" className="register-link"> Register</Link>
                    </p>
                </div>
            </Form>
            </div>
            </div>
        </>
    );
}

export default Login;

export async function action({request}) {
    const data = await request.formData();
    const userData = {
        username: data.get('username'),
        password: data.get('password')
    };

    const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-type': 'application/json'
        }
    });
    console.log(response);
    console.log(response.ok);
    console.log(response.data);
    if (!response.ok) {
        throw json({message: 'Invalid username or password!'}, {status: response.status});
    } else {
        // Store the username in localStorage
        localStorage.setItem('username', userData.username);
        return redirect('/home');
    }
}