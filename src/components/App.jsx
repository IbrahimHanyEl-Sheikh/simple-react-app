// import { useState } from 'react';
import "../LoginRegister.css";
import "./App.css";
import {Link, useLocation} from "react-router-dom";

function App() {
        const location = useLocation();

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
                    <Link to="/" className="btnlogin-popup">
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