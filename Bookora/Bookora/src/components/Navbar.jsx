import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/browse" onClick={closeMenu}>
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-book" onClick={closeMenu}>
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-listings" onClick={closeMenu}>
            My Listings
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
