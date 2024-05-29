// Register.js
import '../Homepage.css';
import React, { useState } from 'react';
import { person, mail, lockClosed } from 'ionicons/icons/index.js';
import { IonIcon } from '@ionic/react';
import axios from 'axios';

const Register = ({ handletoggleloginClick }) => {
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
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData); // Send formData directly
      console.log(response.data); // Handle successful registration
    } catch (error) {
      console.error('Registration failed:', error.message); // Handle registration error
    }
  };

  return (
    <>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <span className="icon">
            <IonIcon icon={person} />
          </span>
          <input type="text" name='username' onChange={handleChange} required defaultValue=''/>
          <label>Username</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <IonIcon icon={mail} />
          </span>
          <input type="email" name='email' onChange={handleChange} required />
          <label>Email</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <IonIcon icon={lockClosed} />
          </span>
          <input type="password" name='password' defaultValue='' onChange={handleChange} required />
          <label>Password</label>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Agree to the terms & conditions
          </label>
        </div>
        <button type="submit" className="btn">Register</button>
        <div className="login-register">
          <p>Already have an account? <a href="#" className="login-link" onClick={handletoggleloginClick}>Login</a></p>
        </div>
      </form>
    </>
  )
}

export default Register;



// import '../Homepage.css';
// import React from 'react';
// import { person, mail, lockClosed } from 'ionicons/icons/index.js';
// import { IonIcon } from '@ionic/react';

// const Register = (handletoggleloginClick, handleChange, handleSubmit) => {
    
//   return (
//     <>
//         <h2>Registration</h2>
//         <form action="#" onSubmit={handleSubmit}>
//             <div className="input-box">
//                 <span className="icon">
//                     <IonIcon icon={person}>
//                     </IonIcon></span>
//                 <input type="text"  name='username' onChange={handleChange} required></input>
//                 <label>Username</label>
//             </div>
//             <div className="input-box">
//                 <span className="icon">
//                     <IonIcon icon={mail}>
//                     </IonIcon></span>
//                 <input type="email" name='email' onChange={handleChange} required></input>
//                 <label>Email</label>
//             </div>
//             <div className="input-box">
//                 <span className="icon">
//                     <IonIcon icon={lockClosed}>
//                     </IonIcon></span>
//                 <input type="password" name='password' onChange={handleChange} required></input>
//                 <label>Password</label>
//             </div>
//             <div className="remember-forgot">
//                 <label><input type="checkbox"></input>
//                 agree to the terms & conditions</label>
//             </div>
//             <button type="submit" className="btn">Register</button>
//             <div className="login-register">
//                 <p>Already have an account?<a
//                 href="#"
//                 className="login-link" onClick={handletoggleloginClick}> Login</a></p>
//             </div>
//         </form>
//     </>
//   )
// }

// export default Register