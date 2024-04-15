import '../Homepage.css';
import { person, mail, lockClosed } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';
function login(handletoggleloginClick) {

  return (
    <>
    <h2>Login</h2>
    <form action="#">
        <div className="input-box">
            <span className="icon">
                <IonIcon icon={mail}>
                </IonIcon></span>
            <input type="email" required></input>
            <label>Email</label>
        </div>
        <div className="input-box">
            <span className="icon">
                <IonIcon icon={lockClosed}>
                </IonIcon></span>
            <input type="password" required></input>
            <label>Password</label>
        </div>
        <div className="remember-forgot">
            <label><input type="checkbox"></input>Remember me</label>
            <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="login-register">
            <p>Don't have an account?<a
            href="#"
            className="register-link" onClick={handletoggleloginClick}> Register</a></p>
        </div>
    </form>
    </>
  )
}

export default login