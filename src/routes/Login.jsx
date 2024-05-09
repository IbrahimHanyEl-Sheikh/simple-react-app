import "../LoginRegister.css";
import "../components/App.css";
import { Link, Form, redirect } from "react-router-dom";
import { close, mail, lockClosed } from 'ionicons/icons/index.js';
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
                        <IonIcon icon={mail}></IonIcon>
                    </span>
                    <input type="email" required></input>
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <span className="icon">
                        <IonIcon icon={lockClosed}></IonIcon>
                        </span>
                    <input type="password" required></input>
                    <label>Password</label>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"></input>Remember me</label>
                    <Link to="/register">Forgot Password?</Link>
                </div>
                <button type="submit" className="btn">Login</button>
                <div className="login-register">
                    <p>Don't have an account?
                    <Link to="/register" className="register-link"> Register</Link>
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
    const formData = request.formData();
    const userData = Object.fromEntries(formData);

    await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return redirect('/home');
}