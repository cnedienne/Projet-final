
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });

  const legalTexts: Record<string, { title: string; text: string }> = {
    conditions: {
      title: "Conditions d'utilisation",
      text: `En accédant à ce site, vous acceptez d'utiliser nos services conformément à nos règles. Toute reproduction ou diffusion non autorisée du contenu est interdite. Nous nous réservons le droit de modifier ces conditions à tout moment.`,
    },
    privacy: {
      title: "Politique de confidentialité",
      text: `Nous respectons votre vie privée. Les données collectées sont utilisées uniquement pour améliorer l'expérience utilisateur. Aucune information personnelle n'est partagée avec des tiers sans votre consentement.`,
    },

  };

  const openModal = (key: keyof typeof legalTexts) => {
    setModalContent(legalTexts[key]);
    setModalOpen(true);
  };


  return (
    <footer style={{ backgroundColor: '#1E3A8A', color: '#E5E7EB', padding: '3rem 2rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          rowGap: '2rem',
        }}
      >
        {/* Bloc logo & description */}
        <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img
                src="/images/LOGO.svg"
                alt="WhoAmI Logo"
                className="logo"
                style={{ width: '200px', height: 'auto' }}
              />
            </div>
          </Link>
          <p style={{ fontSize: '0.95rem', color: '#D1D5DB', marginBottom: '1rem' }}>
            Découvrez votre personnalité informatique <br /> et à quelle légende vous ressemblez le plus.
          </p>

        </div>

        {/* Liens rapides */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Liens rapides</h4>
          <ul style={ulStyle}>
            <li><Link to="/" style={linkStyle}>Accueil</Link></li>
            <li><Link to="/perso" style={linkStyle}>Personnalités</Link></li>
            <li><Link to="/intro" style={linkStyle}>Faire le test</Link></li>
            <li><a href="#about" style={linkStyle}>À propos</a></li>
            <li><a href="#contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>

        {/* Légal */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Légal</h4>
          <ul style={ulStyle}>

            <li><button style={buttonStyle} onClick={() => openModal('conditions')}>Conditions d'utilisation</button></li>
            <li><button style={buttonStyle} onClick={() => openModal('privacy')}>Politique de confidentialité</button></li>
          </ul>
        </div>
      </div>

      <div
        style={{
          marginTop: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          paddingTop: '1.5rem',
          fontSize: '0.875rem',
          color: '#D1D5DB',
        }}
      >

        © 2026 WhoAmI. Tous droits réservés.
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div style={modalOverlayStyle} onClick={() => setModalOpen(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1rem' }}>{modalContent.title}</h2>
            <p style={{ lineHeight: '1.6' }}>{modalContent.text}</p>
            <button onClick={() => setModalOpen(false)} style={closeButtonStyle}>Fermer</button>
          </div>
        </div>
      )}

    </footer>
  );
};

const columnStyle: React.CSSProperties = {
  flex: '1 1 180px',
  minWidth: '160px',
};

const headingStyle: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: '1rem',
  color: 'white',
};

const ulStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  fontSize: '0.95rem',
  color: '#D1D5DB',
};


const linkStyle: React.CSSProperties = {
  color: '#D1D5DB',
  textDecoration: 'none',
};

const buttonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  color: '#D1D5DB',
  cursor: 'pointer',
  fontSize: '0.95rem',
  textAlign: 'left',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: 'white',
  color: '#111827',
  padding: '2rem',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '90%',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
};

const closeButtonStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  backgroundColor: '#1E3A8A',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
};


export default Footer;
