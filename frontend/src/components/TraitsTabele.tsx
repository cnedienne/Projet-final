import React, { useState, useEffect } from 'react';
import '../assets/css/TraitsTable.css';

type Trait = {
  trait_id: number;
  trait_name: string;
};

const TraitsTable: React.FC = () => {
  const [traits, setTraits] = useState<Trait[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTrait, setEditingTrait] = useState<Trait | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [traitToDelete, setTraitToDelete] = useState<Trait | null>(null);
  const [traitNom, setTraitNom] = useState('');

  // Charger la liste des traits au montage
  const fetchTraits = () => {
    fetch('http://localhost:8085/admin/api/traits/')
      .then((res) => res.json())
      .then((data) => setTraits(data))
      .catch((err) => console.error('Erreur lors de la récupération des traits :', err));
  };

  useEffect(() => {
    fetchTraits();
  }, []);

  const openAddModal = () => {
    setEditingTrait(null);
    setTraitNom('');
    setShowFormModal(true);
  };

  const openEditModal = (trait: Trait) => {
    setEditingTrait(trait);
    setTraitNom(trait.trait_name);
    setShowFormModal(true);
  };

  const openDeleteModal = (trait: Trait) => {
    setTraitToDelete(trait);
    setShowDeleteModal(true);
  };

  const handleSaveTrait = () => {
    if (!traitNom.trim()) return;

    if (editingTrait) {
      // PUT vers l'API pour modifier un trait
      fetch(`http://localhost:8085/admin/api/traits/${editingTrait.trait_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trait_name: traitNom.trim() }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Erreur lors de la modification du trait');
          return res.json();
        })
        .then(() => {
          fetchTraits();
          setShowFormModal(false);
        })
        .catch((err) => {
          console.error(err);
          alert('Erreur lors de la modification du trait');
        });
    } else {
      // POST vers l'API pour ajouter un nouveau trait
      fetch('http://localhost:8085/admin/api/traits/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trait_name: traitNom.trim() }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Erreur lors de l\'ajout du trait');
          return res.json();
        })
        .then(() => {
          fetchTraits();
          setShowFormModal(false);
        })
        .catch((err) => {
          console.error(err);
          alert('Erreur lors de l\'ajout du trait');
        });
    }
  };

  const handleDeleteTrait = () => {
    if (!traitToDelete) return;

    fetch(`http://localhost:8085/admin/api/traits/${traitToDelete.trait_id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors de la suppression du trait');
        return res.json();
      })
      .then(() => {
        fetchTraits();
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Erreur lors de la suppression du trait');
      });
  };

  return (
    <div className="card_t">
      <div className="header-row">
        <h2>Gestion des Traits</h2>
        <button className="add-button" onClick={openAddModal}>+ Ajouter un trait</button>
      </div>

      <table className="personnalite-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TRAIT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {traits.map((t) => (
            <tr key={t.trait_id}>
              <td>{t.trait_id}</td>
              <td><span className={`badge ${t.trait_name}`}>{t.trait_name}</span></td>
              <td>
                <span className="edit" onClick={() => openEditModal(t)}>Modifier</span>
                <span className="delete" onClick={() => openDeleteModal(t)}>Supprimer</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer-row">
        <p>Affichage de 1 à {traits.length} sur {traits.length} traits</p>
      </div>

      {/* MODAL AJOUT / MODIFICATION */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingTrait ? 'Modifier un trait' : 'Ajouter un trait'}</h3>
              <button className="close" onClick={() => setShowFormModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <label>Nom</label>
              <input
                type="text"
                value={traitNom}
                onChange={(e) => setTraitNom(e.target.value)}
                placeholder="Nom du trait"
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowFormModal(false)}>Annuler</button>
              <button className="next-button" onClick={handleSaveTrait}>Suivant</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SUPPRESSION */}
      {showDeleteModal && traitToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirmation</h3>
              <button className="close" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Voulez-vous vraiment supprimer le trait <strong>{traitToDelete.trait_name}</strong> ?</p>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>Non</button>
              <button className="next-button" onClick={handleDeleteTrait}>Oui</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraitsTable;
