import React from 'react';

const BannerPerso: React.FC = () => {
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
        Découvrez les personnalités informatiques
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
        Explorez les profils des légendes qui ont façonné le monde de l'informatique et découvrez à laquelle vous ressemblez le plus.
      </p>

    </section>
  );
};

export default BannerPerso;
