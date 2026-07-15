import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import AfficherTraits from './affichertrait';

const Personnalite: React.FC = () => {
  const [personnalites, setPersonnalites] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  // Appel à l'API au montage du composant
  useEffect(() => {
    fetch('http://localhost:8085/api/tables/characters/')
      .then((res) => res.json())
      .then((data) => {
        setPersonnalites(data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des personnalités :', error);
      });
  }, []);

  // Affichage tant que les données ne sont pas chargées
  if (personnalites.length === 0) return <p>Chargement...</p>;

  const perso = personnalites[index];

  const prev = () => setIndex((i) => (i - 1 + personnalites.length) % personnalites.length);
  const next = () => setIndex((i) => (i + 1) % personnalites.length);

  return (
    <div style={wrapper}>
      <div style={container}>
        <button onClick={prev} style={{ ...navButton, left: '10px' }}>{'‹'}</button>

        <div style={leftPanel}>
          <img src={`http://localhost:8085/api/uploads/char_${perso.char_id}.jpg`} alt={perso.char_name} style={imageStyle} />
        </div>

        <button onClick={next} style={{ ...navButton, right: '10px' }}>{'›'}</button>

        <div style={rightPanel}>
          <h2 style={name}>{perso.char_name}</h2>

          <div style={tags}>
            <AfficherTraits charId={perso.char_id} />

          </div>

          <p style={description}>{perso.char_title}</p>
          <p style={description}>{perso.char_desc}</p>

        </div>
      </div>

      <NavLink to="/intro" style={ctaWrapper}>
        <button style={ctaButton}>Faire le test</button>
      </NavLink>


      <div style={dotsContainer}>
        {personnalites.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{ ...dot, ...(index === i ? activeDot : {}) }}
          />
        ))}
      </div>
    </div>
  );
};


// Styles
const wrapper: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '2rem 1rem',
};

const container: React.CSSProperties = {
  display: 'flex',
  borderRadius: '0 1rem 1rem 0',
  overflow: 'hidden',
  backgroundColor: '#e8f0fe',
  maxWidth: '1100px',
  margin: '0 auto',
  position: 'relative',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
  // ❌ Enlève height: '400px'
};



const leftPanel: React.CSSProperties = {
  width: '40%',
  position: 'relative',
};




const rightPanel: React.CSSProperties = {
  width: '60%',
  padding: '2.5rem',
};

const name: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 700,
  color: '#1e3a8a',
  marginBottom: '1rem',
};

const tags: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '1rem',
};

const tag: React.CSSProperties = {
  backgroundColor: '#dbeafe',
  color: '#1e3a8a',
  padding: '0.25rem 0.75rem',
  borderRadius: '9999px',
  fontSize: '0.875rem',
  fontWeight: 600,
};

const description: React.CSSProperties = {
  color: '#374151',
  marginBottom: '1rem',
};

const listSection: React.CSSProperties = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

const list: React.CSSProperties = {
  marginTop: '0.5rem',
  paddingLeft: '1.25rem',
  color: '#374151',
  lineHeight: 1.6,
};

const ctaWrapper: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.5rem',
};

const ctaButton: React.CSSProperties = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '0.75rem 1.5rem',
  borderRadius: '9999px',
  border: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
};

const navButton: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  width: '42px',
  height: '42px',
  fontSize: '1.25rem',
  color: '#1e3a8a',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
};

const dotsContainer: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
  gap: '0.5rem',
};

const dot: React.CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  border: '2px solid #1e3a8a',
  cursor: 'pointer',
  padding: 0,
};

const activeDot: React.CSSProperties = {
  backgroundColor: '#1e3a8a',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '0 0 0 1rem',
  display: 'block',
};



export default Personnalite;
