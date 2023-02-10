import React, { useEffect } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('tocken');
        navigate('/Login');
    }
    let location = useLocation();
    useEffect(()=>{
        console.log(location.pathname);
    },[location]);
    return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><b>Navbar</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/"? "active":""}`} aria-current="page" to="/"><b>Home</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about"? "active":""}`} to="/about"><b>About</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/Login"? "active":""}`} to="/Login"><b>Login</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/SignUp"? "active":""}`} to="/SignUp"><b>Signup</b></Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('tocken')?<form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success me-2" type="submit"><b>Search</b></button>
                    </form> :<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
