import React , { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate("/login");
  }
    let loaction = useLocation();
    useEffect(() =>{
        console.log(loaction.pathname);
    }, [loaction]);
   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${loaction.pathname==="/" ? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${loaction.pathname==="/create" ? "active":""}`} to="/create">Create</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${loaction.pathname==="/view" ? "active":""}`} to="/view">View</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${loaction.pathname==="/about" ? "active":""}`} to="/about">About</Link>
        </li>
        {!localStorage.getItem('token')?<form className='d-flex'>
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
        </form> :  <button onClick={handleLogout} className="btn btn-primary mx-2" to="/login" >Log Out</button>}
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar
