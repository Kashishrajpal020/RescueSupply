import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "./Button.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/map", label: "Live Map" },
  { to: "/available-food", label: "Available Food" },
  { to: "/impact", label: "Impact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          🌿 RescueSupply
        </Link>

        <nav className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Button as={Link} to="/donate" size="sm">
            Donate Food
          </Button>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {LINKS.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/donate" onClick={() => setMenuOpen(false)}>
            Donate Food
          </Link>
        </div>
      )}
    </header>
  );
}