import React from 'react'
import { Link } from "react-router-dom"


const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/wishlist">Wishlist</Link>

      {user ? (
        <>
          <div className='welcome-text'><span>Welcome, {user.name}</span></div>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/auth">Login / Signup</Link>
      )}
    </div>
  )
}

export default Navbar
