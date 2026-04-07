import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navabar.css";
import navmenu from "../assets/images/navmenu.png";
import xIcon from "../assets/images/X.png";
import yrgoLogo from "../assets/images/YRGO-logga.png";
import navbarTitle from "../assets/images/navbar-title.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const studentLinks = [
    { to: "/student", label: "Hem" },
    { to: "/student/registrering", label: "Registrera dig" },
    { to: "/foretag-list", label: "Företags lista" },
    { to: "/match", label: "Matcha" },
    { to: "/utmaningar", label: "Utmaning" },
    { to: "/student-list", label: "Studentlista" },
  ];

  const companyLinks = [
    { to: "/foretag", label: "Hem" },
    { to: "/foretag/registrering", label: "Registrera företag" },
    { to: "/student-list", label: "Kandidat lista" },
  ];

  const companyRoutes = ["/foretag", "/foretag/registrering", "/student-list"];

  const isCompanyPage = companyRoutes.includes(location.pathname);
  const currentLinks = isCompanyPage ? companyLinks : studentLinks;

  return (
    <nav className="navbar">
      <Link to="/" aria-label="Till startsidan">
        <img className="navbar__logo" src={yrgoLogo} alt="YRGO" />
      </Link>

      <button
        className={`hamburger ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
        aria-expanded={isOpen}
        type="button"
      >
        <img
          src={isOpen ? xIcon : navmenu}
          alt={isOpen ? "Stäng" : "Meny"}
          className="hamburger-icon"
        />
      </button>

      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <div className="navbar__links">
          {isOpen && (
            <div className="navbar-title-section">
              <h2 className="navbar-title-text">
                {isCompanyPage ? "FÖRETAG" : "KANDIDAT"}
              </h2>
              <img
                src={navbarTitle}
                alt="Navbar title"
                className="navbar-title-image"
              />
            </div>
          )}
          {currentLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
