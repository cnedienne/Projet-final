import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMenuOpen(false); // fermer menu mobile
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 200);
    }
  };

  return (
    <header>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/images/LOGO.svg" alt="WhoAmI Logo" className="logo" />
        </div>
      </Link>

      {/* Burger Icon */}
      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/perso" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Personnalités
            </NavLink>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={(e) => handleLinkClick(e, 'about')}>
              À propos
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <NavLink to="/intro" className="desktop-button">
        <button className="test-button">Commencer le test</button>
      </NavLink>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)} className="nav-link">Accueil</NavLink></li>
            <li><NavLink to="/perso" onClick={() => setMenuOpen(false)} className="nav-link">Personnalités</NavLink></li>
            <li><a href="#about" className="nav-link" onClick={(e) => handleLinkClick(e, 'about')}>À propos</a></li>
            <li><a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a></li>
            <li><NavLink to="/intro" onClick={() => setMenuOpen(false)}><button className="test-button">Commencer le test</button></NavLink></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
