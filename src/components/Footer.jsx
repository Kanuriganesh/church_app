import { Link } from "react-router-dom";
import "../styles/main.css"

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChurch,
} from "react-icons/fa";
import "../styles/main.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-title">
              <FaChurch className="footer-brand-icon" />
              <h2>IPC CHURCH OF GOD</h2>
            </div>

            <p className="footer-text">
              A place of prayer, worship, fellowship, and hope. Come as you are
              and grow in faith with us.
            </p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/announcements">Announcements</Link>
              <Link to="/events">Events</Link>
              <Link to="/sermons">Sermons</Link>
              <Link to="/gallery">Gallery</Link>
            </div>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>

            <a href="tel:+919963165089" className="footer-contact-item">
              <FaPhoneAlt className="footer-icon" />
              <span>+91 9963165089</span>
            </a>

            <a
              href="mailto:enoshburla@gmail.com"
              className="footer-contact-item"
            >
              <FaEnvelope className="footer-icon" />
              <span>enoshburla@gmail.com</span>
            </a>

            <a
              href="https://wa.me/919640212697"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-item"
            >
              <FaWhatsapp className="footer-icon" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="footer-column">
            <h3>Addresses</h3>

            <div className="footer-address-item">
              <FaMapMarkerAlt className="footer-icon address-icon" />
              <p>
                Jute Mill, near Kothuru, Sai Nagar,
                Ramakrishnapuram, Eluru Rural, Andhra Pradesh 534001
              </p>
            </div>

            <div className="footer-address-item">
              <FaMapMarkerAlt className="footer-icon address-icon" />
              <p>
                Vangayagudem Center, Subrahmanyam Colony, Ramakrishnapuram,
                Eluru, Andhra Pradesh 534001
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 IPC Church of God. Built with faith and purpose.</p>

          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}