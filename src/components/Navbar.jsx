import { Link } from "react-router-dom"
import { useState } from "react"
import "../styles/main.css"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="nav-container">

        {/* LEFT - LOGO */}
        <Link to="/" className="logo">IPC CHURCH OF GOD</Link>

        {/* MOBILE MENU BUTTON */} 
        <div 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* RIGHT - NAV LINKS */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/announcements" onClick={() => setMenuOpen(false)}>Announcements</Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/sermons" onClick={() => setMenuOpen(false)}>Sermons</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>    
           <Link to="/donate"  className="donate-btn" onClick={() => setMenuOpen(false)}>Donate</Link>
        </nav>
      </div>
    </header>
  )
}