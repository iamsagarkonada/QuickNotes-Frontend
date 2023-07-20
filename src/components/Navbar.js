import React from 'react'
import {
    Link, useNavigate
} from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    let history=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history('/login');
    }
    let location=useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">QuickNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {localStorage.getItem('token')?
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/profile"?"active":""}`} to="/profile">My Profile</Link>
                        </li>
                        :<></>}
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>
                        
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-2" to='/login' type="submit">Login</Link>
                        <Link className="btn btn-primary " to='/signup' type="submit">SignUp</Link>
                    </form>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
