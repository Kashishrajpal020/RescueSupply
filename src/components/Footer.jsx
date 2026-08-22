import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">🌿 RescueSupply</div>
          <p className="footer-tag">Good food should never go to waste.</p>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Quick Links</div>
          <Link to="/">Home</Link>
          <Link to="/map">Live Map</Link>
          <Link to="/donate">Donate Food</Link>
          <Link to="/available-food">Available Food</Link>
          <Link to="/impact">Impact</Link>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Community</div>
          <Link to="/donate">For Restaurants</Link>
          <Link to="/available-food">For NGOs</Link>
          <Link to="/my-rescues">For Volunteers</Link>
        </div>
      </div>

      <div className="container footer-bottom">© 2026 RescueSupply</div>
    </footer>
  );
}
