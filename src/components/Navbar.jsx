import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navabar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <button
        className={`hamburger ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
        aria-expanded={isOpen}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <div className="navbar__links">
          <NavLink
            to="/student"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            HEM
          </NavLink>
          <NavLink
            to="/match"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            MATCH
          </NavLink>
          <NavLink
            to="/utmaningar"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            UTMANINGAR
          </NavLink>
          <NavLink
            to="/company"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            FÖRETAG
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
