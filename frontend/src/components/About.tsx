import React from 'react';

const About: React.FC = () => {
  return (
    <div id="about">
      <section style={containerStyle}>
        {/* Texte */}
        <div style={textStyle}>
          <h2 style={titleStyle}>À propos de WhoAmI</h2>
          <p style={paragraphStyle}>
            WhoAmI est né de la passion pour l'informatique et de l'admiration pour les grandes figures qui ont façonné ce
            domaine. Notre objectif est de faire découvrir ces personnalités inspirantes tout en aidant chacun à mieux se
            connaître.
          </p>
          <p style={paragraphStyle}>
            Notre test de personnalité est basé sur des recherches approfondies sur les traits de caractère, les méthodes de
            travail et les philosophies des plus grandes figures de l'informatique.
          </p>
          <p style={paragraphStyle}>
            Que vous soyez un professionnel de l'informatique, un étudiant ou simplement curieux, WhoAmI vous offre une
            expérience ludique et enrichissante.
          </p>
        </div>

        {/* Illustration / icône */}
        <div style={iconWrapper}>
          <div style={blobStyle}>
            <img src="/images/LOGO.svg" alt="Logo" style={iconStyle} />
          </div>
        </div>
      </section>
    </div>
  );
};

// Ajout d’un media query dans le style du conteneur principal
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4rem 2rem',
  maxWidth: '1200px',
  margin: '0 auto',
  gap: '2rem', // espace entre les deux blocs
  flexDirection: 'row',
};

// Texte
const textStyle: React.CSSProperties = {
  flex: '1 1 600px',
  maxWidth: '650px',
  minWidth: '280px',
  padding: '0 1rem', // 👈 ajoute une marge interne à gauche/droite
};


// Titre
const titleStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#1E3A8A',
  fontWeight: '700',
  marginBottom: '1.5rem',
};

// Paragraphe
const paragraphStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  lineHeight: '1.8',
  color: '#374151',
  marginBottom: '1rem',
};

// Wrapper icône
const iconWrapper: React.CSSProperties = {
  flex: '1 1 300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '280px',
};

// Forme blob
const blobStyle: React.CSSProperties = {
  backgroundColor: 'rgb(221, 235, 255)',
  borderRadius: '50% 50% 45% 55% / 60% 40% 60% 40%',
  width: '300px',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// Icône/logo
const iconStyle: React.CSSProperties = {
  fontSize: '3rem',
  color: '#1E3A8A',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

export default About;
