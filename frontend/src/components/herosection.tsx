import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";

const HeroSection: React.FC = () => {
  const [animationData, setAnimationData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetch("/animations/logo.json")
      .then(res => res.json())
      .then(setAnimationData);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!animationData) return null;

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '2rem 1.5rem' : '4rem 6rem',
        background: 'linear-gradient(to right, #2643A3, #3B82F6)',
        color: 'white',
        minHeight: isMobile ? 'auto' : '80vh',
        gap: isMobile ? '2rem' : 0,
        textAlign: isMobile ? 'center' : 'left'
      }}
    >
      {/* Texte à gauche */}
      <div style={{
        maxWidth: isMobile ? '100%' : '40%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: isMobile ? 'center' : 'flex-start'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: 800,
          lineHeight: 1.2
        }}>
          Découvrez votre<br />personnalité informatique
        </h1>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: 1.5
        }}>
          À quelle légende de l'informatique ressemblez-vous ? Faites notre test et découvrez votre alter ego numérique.
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: isMobile ? 'column' : 'row',
          width: isMobile ? '100%' : 'auto'
        }}>
          <Link to="/intro" style={{ width: isMobile ? '100%' : 'auto' }}>

            <button style={{
              background: 'linear-gradient(to right, #2F64E1, #57A5FB)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',

              width: '100%',
              minWidth: '200px',
              outline: 'none'

            }}>
              Commencer le test
            </button>
          </Link>

          <Link to="/perso" style={{ width: isMobile ? '100%' : 'auto' }}>

            <button style={{
              background: 'white',
              border: 'none',
              borderRadius: '50px',
              color: '#2F64E1',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              minWidth: '200px',
              outline: 'none'

            }}>
              Voir les personnalités
            </button>
          </Link>
        </div>
      </div>


      {/* Animation à droite */}
      <div style={{
        marginLeft: isMobile ? '0' : '8rem',
        width: isMobile ? '80%' : '40%',
        maxWidth: '400px'
      }}>
        <Lottie animationData={animationData} loop autoplay />

      </div>
    </section>
  );
};

export default HeroSection;
