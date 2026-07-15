import React from 'react';

const testimonials = [
  {
    name: "Sophie L.",
    initial: "S",
    rating: 5,
    text: `J’ai découvert que je ressemble à Ada Lovelace ! Le test est vraiment bien fait et les descriptions sont très détaillées. J’ai appris beaucoup sur moi-même.`,
  },
  {
    name: "Thomas R.",
    initial: "T",
    rating: 4.5,
    text: `Test très amusant et étonnamment précis ! J’ai partagé mes résultats avec mes collègues et ça a lancé des discussions passionnantes sur nos différentes approches.`,
  },
  {
    name: "Marie D.",
    initial: "M",
    rating: 5,
    text: `Je ne connaissais pas beaucoup de figures de l’informatique avant de faire ce test. C’est une façon ludique d’en apprendre plus sur l’histoire de ce domaine !`,
  },
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        width="20"
        height="20"
        fill="#FACC15"
        viewBox="0 0 20 20"
        style={{ marginRight: 2 }}
      >
        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
      </svg>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{ marginRight: 2 }}
      >
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-star)"
          d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"
        />
      </svg>
    );
  }

  return <div style={{ display: 'flex' }}>{stars}</div>;
};

const Comments: React.FC = () => {
  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: '#fff', textAlign: 'center' }}>
      <h2 style={{ color: '#1D3BD7', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem' }}>
        Ce qu'en disent nos utilisateurs
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {testimonials.map((t, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#E9F2FF',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              maxWidth: '320px',
              flex: '1 1 260px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div
                style={{
                  backgroundColor: '#C9E0FF',
                  color: '#1D3BD7',
                  borderRadius: '9999px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              >
                {t.initial}
              </div>
              <div style={{ marginLeft: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#000', fontSize: '0.95rem' }}>{t.name}</div>
                <div style={{ marginTop: '0.25rem' }}>{renderStars(t.rating)}</div>
              </div>
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#3C3C3C', lineHeight: 1.6 }}>
              “{t.text}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;
