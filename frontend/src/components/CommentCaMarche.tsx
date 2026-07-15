import React from 'react';

const steps = [
  {
    title: "1. Répondez au questionnaire",
    icon: "📋", // tu peux remplacer par une icône SVG ou un composant <img />
    description: "Une série de questions simples pour cerner votre personnalité et vos affinités avec le monde informatique.",
  },
  {
    title: "2. Analyse des résultats",
    icon: "⚙️", // idem ici
    description: "Notre algorithme analyse vos réponses et détermine votre profil de personnalité informatique.",
  },
  {
    title: "3. Découvrez votre alter ego",
    icon: "✅", // idem
    description: "Obtenez un profil détaillé et découvrez à quelle légende de l'informatique vous ressemblez le plus.",
  },
];

const CommentCaMarche: React.FC = () => {
  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: '#fff', textAlign: 'center' }}>
      <h2 style={{ color: '#1E40AF', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem' }}>
        Comment ça marche ?
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#F1F6FF',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '300px',
              flex: '1 1 250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div
              style={{
                background: 'linear-gradient(to bottom, #2643A3, #3B82F6)',
                color: 'white',
                borderRadius: '9999px',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1rem',
              }}
            >
              {step.icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.5rem' }}>
              {step.title}
            </h3>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentCaMarche;
