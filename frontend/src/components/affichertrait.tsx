import React, { useState, useEffect } from 'react';

type Trait = {
  trait_id: number;
  trait_name: string;
};

const AfficherTraits: React.FC<{ charId: number }> = ({ charId }) => {
  const [traits, setTraits] = useState<Trait[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8085/admin/api/characters/${charId}`)
      .then(res => res.json())
      .then(data => {
        if (data.top_traits) setTraits(data.top_traits);
      });
  }, [charId]);

  return (
    <>
      {traits.map(t => (
        <span
          key={t.trait_id}
          style={{
            backgroundColor: '#dbeafe',
            color: '#1e3a8a',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {t.trait_name}
        </span>
      ))}
    </>
  );
};

export default AfficherTraits;
