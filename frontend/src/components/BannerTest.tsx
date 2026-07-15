import React from 'react';
import { NavLink} from 'react-router-dom';

const BannerTest: React.FC = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(90deg, #1E3A8A, #3B82F6)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1rem',
        }}
      >
        Prêt à découvrir votre personnalité informatique ?
      </h2>
      <p
        style={{
          fontSize: '1.1rem',
          marginBottom: '2rem',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
        }}
      >
        Répondez à notre questionnaire et découvrez à quelle légende de
        l'informatique vous ressemblez le plus.
      </p>
     <NavLink to="/intro" >
      <button
        style={{
          backgroundColor: '#fff',
          color: '#1E3A8A',
          padding: '0.75rem 2rem',
          borderRadius: '9999px',
          fontWeight: 600,
          fontSize: '1rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F3F4F6';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#fff';
        }}
      >
        Commencer le test maintenant
      </button>
 </NavLink>

    </section>
  );
};

export default BannerTest;
