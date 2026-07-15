import { useNavigate } from 'react-router-dom'
import '../assets/css/intro.css'

const Intro = () => {
  const navigate = useNavigate()

  const startQuiz = () => {
    navigate('/quiz')
  }

  return (
    <div className="container-Intro" style={{ padding: '4rem 2rem', fontFamily: 'Poppins, sans-serif' }}>

      <section
        className="intro-box"
        style={{
          backgroundColor: '#fff',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          maxWidth: '700px',
          margin: '0 auto',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1E40AF', marginBottom: '1.5rem' }}>
          Bienvenue au test de personnalité informatique
        </h2>
        <p style={{ color: '#4B5563', marginBottom: '1rem', lineHeight: 1.6 }}>
          Chaque Développeur, ingénieur ou passionné d’informatique possède un style de pensée unique
          qui résonne avec les grands esprits qui ont façonné notre monde numérique.
        </p>
        <p style={{ color: '#4B5563', marginBottom: '2rem', lineHeight: 1.6 }}>

          Pour chaque affirmation, indiquez votre niveau d’accord ou de désaccord. Vos réponses
          révéleront quelle légende de l’informatique partage votre vision, votre approche des problèmes
          et votre philosophie technologique.
        </p>

        <button
          onClick={startQuiz}
          style={{
            background: 'linear-gradient(to right, #2563EB, #3B82F6)',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Lancer le Test
        </button>

      </section>
    </div>
  )
}

export default Intro
