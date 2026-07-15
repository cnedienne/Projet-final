import React, { useEffect, useState } from 'react';
import '../assets/css/PersonnaliteTable.css';

type TraitPerso = {
  trait_id: number;
  trait_name: string;
  weight: number;
};

type Personnalite = {
  char_id: number;
  char_name: string;
  char_title: string;
  char_desc: string;
  char_image: string;
  top_traits: TraitPerso[];
};

const PersonnaliteTable: React.FC = () => {
  const [personnalites, setPersonnalites] = useState<Personnalite[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [editingPerson, setEditingPerson] = useState<Personnalite | null>(null);
  const [deletingPerson, setDeletingPerson] = useState<Personnalite | null>(null);
  const [selectedTrait, setSelectedTrait] = useState<string>('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [allTraits, setAllTraits] = useState<TraitPerso[]>([]);
  const [traitsPerso, setTraitsPerso] = useState<TraitPerso[]>([]);

  // Nouveaux états pour upload image
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Récupération des personnalités
    fetch('http://localhost:8085/admin/api/characters/')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des personnalités');
        return res.json();
      })
      .then((data) => setPersonnalites(data))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));

    // Récupération des traits disponibles
    fetch('http://localhost:8085/admin/api/traits/')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des traits');
        return res.json();
      })
      .then((data) => setAllTraits(data))
      .catch((err) => console.error('Erreur lors de la récupération des traits :', err));
  }, []);

  // Gérer le changement du fichier image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Ajout d'un trait associé à une personne
  const ajouterTrait = () => {
    const trait = allTraits.find((t) => t.trait_name === selectedTrait);
    if (trait && !traitsPerso.find((t) => t.trait_id === trait.trait_id)) {
      setTraitsPerso([...traitsPerso, { ...trait, weight: 0.5 }]);
      setSelectedTrait('');
    }
  };

  // Supprimer un trait associé à une personne
  const supprimerTrait = (traitName: string) =>
    setTraitsPerso(traitsPerso.filter((t) => t.trait_name !== traitName));

  // Ouvrir le pop_up modal
  const openModal = (p?: Personnalite) => {
    setShowModal(true);
    setStep(1);
    if (p) {
      setEditingPerson(p);
      setUsername(p.char_name);
      setDescription(p.char_desc);
      setTraitsPerso(p.top_traits);
      setPreview(p.char_image || null);
      setFile(null);
    } else {
      setEditingPerson(null);
      setUsername('');
      setDescription('');
      setTraitsPerso([]);
      setPreview(null);
      setFile(null);
    }
  };

  const confirmModal = async () => {
  if (!username.trim()) {
    alert('Le username est obligatoire');
    return;
  }
  setLoading(true);

  try {
    const isCreate = !editingPerson;
    let fetchOptions: RequestInit;

    if (isCreate) {
      // === POST : FormData avec image ===
      const formData = new FormData();
      formData.append('char_name', username);
      formData.append('char_title', '');
      formData.append('char_desc', description);
      formData.append(
        'trait_tab',
        JSON.stringify(traitsPerso.map(({ trait_id, weight }) => ({ trait_id, weight })))
      );
      if (file) {
        formData.append('image', file);
      }

      fetchOptions = {
        method: 'POST',
        body: formData,
        credentials: 'include',
      };
    } else {
      // === PUT : JSON uniquement, pas d'image ===
      const payload = {
        char_name: username,
        char_title: '',
        char_desc: description,
        trait_tab: traitsPerso.map(({ trait_id, weight }) => ({ trait_id, weight })),
      };

      fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      };
    }

    const url = editingPerson
      ? `http://localhost:8085/admin/api/characters/${editingPerson.char_id}`
      : 'http://localhost:8085/admin/api/characters/';

    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      throw new Error(isCreate
        ? 'Erreur lors de l’ajout'
        : 'Erreur lors de la modification'
      );
    }

    // Rafraîchir la liste
    const refreshedResponse = await fetch('http://localhost:8085/admin/api/characters/');
    if (!refreshedResponse.ok) {
      throw new Error('Erreur lors du rechargement des personnalités');
    }
    const refreshedPersonnalites = await refreshedResponse.json();
    setPersonnalites(refreshedPersonnalites);

    setShowModal(false);
    setFile(null);
    setPreview(null);
  } catch (error: any) {
    alert(error.message || 'Erreur inconnue');
  } finally {
    setLoading(false);
  }
};


  // Suppression d'une personne
  const handleDelete = async () => {
    if (!deletingPerson) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8085/admin/api/characters/${deletingPerson.char_id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setPersonnalites((prev) => prev.filter((p) => p.char_id !== deletingPerson.char_id));
      setDeletingPerson(null);
    } catch (error: any) {
      alert(error.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Modal de suppression
  const DeletePersonModal: React.FC<{
    person: Personnalite;
    onClose: () => void;
    onDelete: () => void;
  }> = ({ person, onClose, onDelete }) => (
    <div className="modal-backdrop_p">
      <div className="modal_p">
        <div className="modal-header">
          <h3>Supprimer la personnalité</h3>
          <span className="close" onClick={onClose} style={{ cursor: 'pointer' }}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>
            Voulez-vous vraiment supprimer <strong>{person.char_name}</strong> ?
          </p>
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose} disabled={loading}>
            Annuler
          </button>
          <button className="save-btn" onClick={onDelete} disabled={loading}>
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card_table">
      <div className="header-row">
        <h2>Gestion des Personnalités</h2>
        <button className="add-button" onClick={() => openModal()} disabled={loading}>
          + Ajouter une personnalité
        </button>
      </div>
      <table className="personnalite-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>PHOTO</th>
            <th>Username</th>
            <th>Description</th>
            <th>TRAITS DOMINANTS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {personnalites.map((p) => (
            <tr key={p.char_id}>
              <td>{p.char_id}</td>
              <td>
                {p.char_image ? (
                  <img
                    src={`http://localhost:8085/api/uploads/char_${p.char_id}.jpg`}
                    alt={p.char_name}
                    style={{ maxWidth: '50px', maxHeight: '50px' }}
                  />
                ) : (
                  '👤'
                )}
              </td>
              <td>{p.char_name}</td>
              <td>{p.char_desc}</td>
              <td className="traits-colonne">
                <div className="traits-wrapper">
                  {p.top_traits.map((t) => (
                    <span key={`${p.char_id}-${t.trait_id}`} className="trait-badge">
                      {t.trait_name}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <span
                  className="edit"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModal(p)}
                >
                  Modifier
                </span>{' '}
                |{' '}
                <span
                  className="delete"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setDeletingPerson(p)}
                >
                  Supprimer
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer-row">
        <p>
          Affichage de 1 à {personnalites.length} sur {personnalites.length} personnalités
        </p>
      </div>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            {step === 1 ? (
              <>
                <h2>{editingPerson ? 'Modifier' : 'Ajouter'} une personnalité</h2>
                <label>Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  disabled={loading}
                  autoFocus
                />

                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description de la personnalité..."
                  disabled={loading}
                />

                <label>Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
                {preview && (
                  <div style={{ marginTop: '10px' }}>
                    <img src={preview} alt="Aperçu" style={{ maxWidth: '200px' }} />
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button
                    className="save-btn"
                    onClick={() => setStep(2)}
                    disabled={loading}
                  >
                    Suivant
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>{editingPerson ? 'Modifier' : 'Ajouter'} une personnalité</h2>
                <label>Traits de personnalité</label>
                <select
                  value={selectedTrait}
                  onChange={(e) => setSelectedTrait(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Sélectionnez un trait</option>
                  {allTraits.map((trait) => (
                    <option key={trait.trait_id} value={trait.trait_name}>
                      {trait.trait_name}
                    </option>
                  ))}
                </select>

                <p className="add-trait" onClick={ajouterTrait} style={{ cursor: 'pointer' }}>
                  + Ajouter ce trait
                </p>
                {traitsPerso.length > 0 && (
                  <>
                    <h4>Traits sélectionnés</h4>
                    <table className="trait-table">
                      <thead>
                        <tr>
                          <th>TRAIT</th>
                          <th>POIDS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {traitsPerso.map((t) => (
                          <tr key={t.trait_id}>
                            <td>{t.trait_name}</td>
                            <td>
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.01}
                                value={t.weight}
                                onChange={(e) => {
                                  const val = Math.min(1, Math.max(0, Number(e.target.value)));
                                  setTraitsPerso((prev) =>
                                    prev.map((tr) =>
                                      tr.trait_id === t.trait_id ? { ...tr, weight: val } : tr
                                    )
                                  );
                                }}
                                disabled={loading}
                              />
                            </td>
                            <td>
                              <span
                                className="delete"
                                onClick={() =>
                                  setTraitsPerso(traitsPerso.filter((tr) => tr.trait_id !== t.trait_id))
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                Supprimer
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
                <div className="modal-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    Précédent
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button className="save-btn" onClick={confirmModal} disabled={loading}>
                    {loading ? 'Enregistrement...' : 'Confirmer'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {deletingPerson && (
        <DeletePersonModal
          person={deletingPerson}
          onClose={() => setDeletingPerson(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PersonnaliteTable;
