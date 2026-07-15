import React, { useEffect, useState } from 'react';
import '../assets/css/QuestionsTable.css';

type Question = {
  question_id: number;
  question_text: string;
  trait_name: string;
  trait_id: number;
  weight: number;
};


type Trait = {
  trait_id: number;
  trait_name: string;
};


interface Props {
  question: Question;
  onClose: () => void;
  onSave: (q: Question) => void;
  loading: boolean;
  traitOptions: Trait[];
}

const QuestionsTable: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [traitOptions, setTraitOptions] = useState<Trait[]>([]);



useEffect(() => {
  fetch('http://localhost:8085/admin/api/questions/')
    .then((res) => res.json())
    .then((data) => setQuestions(data))
    .catch((err) => console.error('Erreur lors de la récupération des questions :', err));

  // Chargement des traits
  fetch('http://localhost:8085/admin/api/traits/')
    .then((res) => res.json())
    .then((data) => setTraitOptions(data))
    .catch((err) => console.error('Erreur lors de la récupération des traits :', err));
}, []);

  // Sauvegarder ou modifier une question (POST si nouvelle, PUT sinon)
  const handleSave = async (q: Question) => {
    setLoading(true);

try {
  if (q.question_id === 0) {
    console.log(q.question_text);
    console.log(q.trait_id);
    console.log(q.weight);
    // POST nouveau
    const response = await fetch('http://localhost:8085/admin/api/questions/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_text: q.question_text,
        trait_id: q.trait_id,
        weight: q.weight,
      }),
    });
    if (!response.ok) throw new Error('Erreur lors de l’ajout');

    const newQuestion = await response.json();
    console.log('Question ajoutée :', newQuestion);

    // Appelle l'API pour recharger toutes les questions
    const refreshedResponse = await fetch('http://localhost:8085/admin/api/questions/');
    if (!refreshedResponse.ok) throw new Error('Erreur lors du rechargement des questions');

    const refreshedQuestions = await refreshedResponse.json();
    setQuestions(refreshedQuestions);

    setEditingQuestion(null);
  } else {
        // PUT modif
        console.log(q.trait_id);
        console.log(q.weight);
        const response = await fetch(`http://localhost:8085/admin/api/questions/${q.question_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({
            question_id: q.question_id,
            question_text: q.question_text,
            trait_id: q.trait_id,
            weight: q.weight,
          }),
        });
      // Appelle l'API pour recharger toutes les questions
    const refreshedResponse = await fetch('http://localhost:8085/admin/api/questions/');
    if (!refreshedResponse.ok) throw new Error('Erreur lors du rechargement des questions');

    const refreshedQuestions = await refreshedResponse.json();
    setQuestions(refreshedQuestions);
      }
      setEditingQuestion(null);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  // Supprimer question
  const handleDelete = async () => {
    if (!deletingQuestion) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8085/admin/api/questions/${deletingQuestion.question_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setQuestions((prev) => prev.filter((q) => q.question_id !== deletingQuestion.question_id));
      setDeletingQuestion(null);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="card_questions">
        <div className="header-row">
          <h2>Gestion des Questions</h2>
          <button
            className="add-button"
            onClick={() =>
              setEditingQuestion({
                question_id: 0,
                question_text: '',
                trait_name: '',
                trait_id:0,
                weight: 1,
              })
            }
            disabled={loading}
          >
            + Ajouter une question
          </button>
        </div>

        <table className="questions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>QUESTION</th>
              <th>TRAIT DE PERSONNALITÉ</th>
              <th>POIDS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {questions.flatMap((q, index) =>
              q.traits.map((trait, traitIndex) => (
                <tr key={`${q.question_id}-${trait.trait_id}`}>
                  <td>{q.question_id}</td>
                  <td>{q.question_text}</td>
                  <td>{trait.trait_name}</td>
                  <td>{trait.weight}</td>
                  <td>
                    <span
                      className="edit"
                      onClick={() => setEditingQuestion({ ...q, trait })}
                      style={{ cursor: 'pointer' }}
                    >
                      Modifier
                    </span>{' '}
                    |{' '}
                    <span
                      className="delete"
                      onClick={() => setDeletingQuestion({ ...q, trait })}
                      style={{ cursor: 'pointer' }}
                    >
                      Supprimer
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>


        </table>

        <div className="footer-row">
          <p>Affichage de {questions.length} questions</p>
        </div>
      </div>

      {/* Modal édition / ajout */}
      {editingQuestion && (
        <QuestionModal
          question={editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onSave={handleSave}
          loading={loading}
          traitOptions={traitOptions} 
        />
      )}

      {/* Modal suppression */}
      {deletingQuestion && (
        <DeleteModal
          question={deletingQuestion}
          onClose={() => setDeletingQuestion(null)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </>
  );
};



const QuestionModal: React.FC<Props> = ({ question, onClose, onSave, loading, traitOptions }) => {
  const [questionText, setQuestionText] = useState(question.question_text || '');
  const [traitId, setTraitId] = useState<number>(question.trait_id || 0);
  const [weight, setWeight] = useState<number>(question.weight || 0);

  useEffect(() => {
    setQuestionText(question.question_text || '');
    setTraitId(question.trait_id || 0);
    setWeight(question.weight || 0);
  }, [question]);

  const handleSave = () => {
    const selectedTrait = traitOptions.find((t) => t.trait_id === traitId);
    if (!selectedTrait) return;

    onSave({
      ...question,
      question_text: questionText,
      trait_id: traitId,
      trait_name: selectedTrait.trait_name,
      weight: weight,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal_q">
        <div className="modal-header">
          <h3>{question.question_id === 0 ? 'Ajouter une question' : 'Modifier la question'}</h3>
          <span className="close" onClick={onClose} style={{ cursor: 'pointer' }}>
            ×
          </span>
        </div>

        <div className="modal-body">
          <label>Question</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
            disabled={loading}
          />

          <label>Trait de personnalité</label>
          <select
            value={traitId}
            onChange={(e) => setTraitId(Number(e.target.value))}
            disabled={loading}
          >
            <option value="">Sélectionnez un trait</option>
            {traitOptions.map((trait) => (
              <option key={trait.trait_id} value={trait.trait_id}>
                {trait.trait_name}
              </option>
            ))}
          </select>

          <label>Poids</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            min={0}
            max={1}
            step={0.01}
            disabled={loading}
          />
        </div>

        <div className="modal-footer">
          <button className="cancel" onClick={onClose} disabled={loading}>
            Annuler
          </button>
          <button
            className="save"
            onClick={handleSave}
            disabled={!questionText || !traitId || weight < 0 || weight > 1 || loading}
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal: React.FC<{
  question: Question;
  onClose: () => void;
  onDelete: () => void;
  loading: boolean;
}> = ({ question, onClose, onDelete, loading }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Supprimer la question</h3>
          <span className="close" onClick={onClose} style={{ cursor: 'pointer' }}>
            ×
          </span>
        </div>

        <div className="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer la question suivante ?</p>
          <p>
            <strong>{question.question_text}</strong>
          </p>
        </div>

        <div className="modal-footer">
          <button className="cancel" onClick={onClose} disabled={loading}>
            Annuler
          </button>
          <button className="save" onClick={onDelete} disabled={loading}>
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsTable;
