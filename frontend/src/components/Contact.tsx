import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  // États pour les champs du formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // État pour message retour (succès / erreur)
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus('Veuillez remplir tous les champs.');
      return;
    }

    const templateParams = {
      name,
      email,
      message,
    };

    emailjs.send(
      'service_xxqekzv',    
      'template_0uwppk5',   
      templateParams,
      'Xe7w9nI3SY58720a6'    
    )
    .then(() => {
      setStatus('Message envoyé avec succès !');
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.error('Erreur envoi mail:', error);
      setStatus('Une erreur est survenue. Veuillez réessayer plus tard.');
    });
  };

  return (
    <div id="contact">
      <section style={{ padding: '2rem 1rem', backgroundColor: '#F9FAFB' }}>
        <h2 style={{
          textAlign: 'center',
          color: '#1E3A8A',
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '3rem',
        }}>
          Contactez-nous
        </h2>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          padding: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          {/* Infos de contact */}
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ color: '#1E3A8A', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Informations de contact
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={iconStyle}>✉️</div>
              <div>
                <strong>Email</strong><br />
                <span style={grayText}>Bouzid-chayma@gmail.com</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={iconStyle}>📞</div>
              <div>
                <strong>Téléphone</strong><br />
                <span style={grayText}>+33 1 23 45 67 89</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={iconStyle}>📍</div>
              <div>
                <strong>Adresse</strong><br />
                <span style={grayText}>
                  Avignon<br />
                 
                </span>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ color: '#1E3A8A', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Envoyez-nous un message
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Nom</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(to right, #2643A3, #3B82F6)',
                  color: '#fff',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                }}
              >
                Envoyer
              </button>
              {status && (
                <p style={{ marginTop: '1rem', color: status.includes('succès') ? 'green' : 'red' }}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const iconStyle: React.CSSProperties = {
  background: 'linear-gradient(to bottom, #2643A3, #3B82F6)',
  color: '#fff',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  marginRight: '1rem',
};

const inputStyle: React.CSSProperties = {
  width: '90%',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  border: '1px solid #D1D5DB',
  fontSize: '1rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.25rem',
  fontWeight: 500,
};

const grayText: React.CSSProperties = {
  color: '#6B7280',
};

export default Contact;
