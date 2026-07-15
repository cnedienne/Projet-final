import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Person = {
  char_id: number;
  char_name: string;
  char_title: string;
  char_desc: string;
  char_image: string;
};

const PersoHome: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    fetch("http://localhost:8085/api/tables/characters/")
      .then((res) => res.json())
      .then((data: Person[]) => {
        // Limiter aux 3 premiers
        setPersons(data.slice(0, 3));
      })
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  return (
    <section
      style={{
        padding: '4rem 2rem',
        backgroundColor: '#F9FAFB',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: '1rem',
        }}
      >
        <h2
          style={{
            color: '#1E40AF',
            fontSize: '2rem',
            fontWeight: 700,
          }}
        >
          Personnalités informatiques
        </h2>
        <Link
          to="/perso"
          style={{
            color: '#2563EB',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Voir toutes les personnalités →
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '3rem',
        }}
      >
        {persons.map((person) => (
          <div
            key={person.char_id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '1rem',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '250px',
              flex: '1 1 250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            <img
              src={`http://localhost:8085/api/uploads/char_${person.char_id}.jpg`}

              alt={person.char_name}
              style={{
                borderRadius: '9999px',
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                marginBottom: '1rem',
              }}
            />
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#1E3A8A',
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}
            >
              {person.char_name}
            </h3>
            <p
              style={{
                color: '#4B5563',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                textAlign: 'center',
              }}
            >
              {person.char_title}
            </p>
            <p
              style={{
                marginTop: '0.75rem',
                fontSize: '0.85rem',
                color: '#3B82F6',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
             
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersoHome;
