// import { useState } from 'react';
import "../LoginRegister.css";
import "./App.css";
import {Link, useLocation, redirect} from "react-router-dom";

function App() {
        const location = useLocation();
        const logoutHandler = () => {
            localStorage.clear();
            return redirect('/');
        }

    return (
        <header className="header">
            <h2 className="logo">
                CodeCad
            </h2>
            <nav className="navigation">
            {
                (
                        location.pathname === "/" && (
                    <Link to="/login" className="btnlogin-popup">
                        Login
                    </Link>
                    )
                )
            ||  (
                    location.pathname === "/home" && (
                    <Link to="/" className="btnlogin-popup" onClick={logoutHandler}>
                        Logout
                    </Link>
                    )
                )
            }
            </nav>

        </header>
    )
}

export default App;