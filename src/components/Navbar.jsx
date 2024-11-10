import React from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css'; // Importa los estilos CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="navbar-brand" to="/">
        BAZAR ONLINE
      </NavLink>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/compras"
          >
            Compras
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/"
          >
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
