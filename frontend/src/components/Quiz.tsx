import { useEffect, useState } from 'react'

import { MessageSquare } from 'lucide-react'
import { Link } from "react-router-dom";

import "../assets/css/quiz.css"

type Question = {
  question_id: number
  question_text: string
}

function ResultModal({ onClose, character, userVector }) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [rating, setRating] = useState(0); // note choisie
  const [hoveredRating, setHoveredRating] = useState(0); // note survolée
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  // const [character, setCharacter] = useState(null);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    // Fermer la modale après envoi
    onClose();
  };


  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        overflowY: 'auto'
      }}>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            border: 'none',
            background: 'transparent',
            color: '#2563EB',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Votre résultat</h2>
<div style={{
  backgroundColor: '#E0EDFF',
  borderRadius: '0.75rem',
  padding: '1rem',
  marginBottom: '1.5rem',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center'
}}>
<img
  src={`http://localhost:8085/api/uploads/char_${character.char_id}.jpg`}
  alt={character.char_name}
    style={{
      width: '80px',
      height: '80px',
      borderRadius: '0.5rem',
      objectFit: 'cover'
    }}
  />
<div>
  <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#2563EB' }}>
    Vous ressemblez à {character.char_name}
  </strong>
  <p style={{ fontSize: '0.9rem' }}>
    {character.char_desc}
  </p>
</div>
</div>


        <h3 style={{ marginBottom: '1rem' }}>Vos traits de personnalité</h3>
        {userVector.map((trait) => {
          const percentage = Math.round((trait.value + 1) * 50); // converti -1 à 1 → 0% à 100%

          return (
            <div key={trait.trait_id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>{trait.trait_name}</span>
                <span>{percentage}%</span>
              </div>
              <div style={{
                background: '#E5E7EB',
                height: '8px',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  background: '#2563EB'
                }}></div>
              </div>
            </div>
          );
        })}
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>

<Link to="/perso" style={{ textDecoration: 'none' }}>
  <button style={{
    backgroundColor: '#2563EB',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500'
  }}>
    Voir la personnalité
  </button>
</Link>

</div>

      </div>
    </div>
  )
}


export default function Quiz() {
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [answers, setAnswers] = useState<(number | null)[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [character, setCharacter] = useState(null)
  const [userVector, setUserVector] = useState([]);


  // 1. Charger les questions au démarrage
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:8085/api/tables/questions") // Mets ici l'URL de ton API
        if (!response.ok) throw new Error("Erreur lors du chargement des questions")
        const data: Question[] = await response.json()
        setQuestions(data)
        setAnswers(Array(data.length).fill(null))
      } catch (error) {
        console.error(error)
      }
    }
    fetchQuestions()
  }, [])

  // 2. Gestion localStorage - adapter pour questions dynamiques
  useEffect(() => {
    if (!questions) return
    const saved = localStorage.getItem("quizAnswers")
    if (saved) {
      const parsed = JSON.parse(saved)
      // Si la longueur a changé, on peut reset ou ajuster
      if (parsed.length === questions.length) {
        setAnswers(parsed)
        const nextIndex = parsed.findIndex((a: number | null) => a === null)
        setCurrentIndex(nextIndex === -1 ? parsed.length - 1 : nextIndex)
      } else {
        setAnswers(Array(questions.length).fill(null))
      }
    } else {
      setAnswers(Array(questions.length).fill(null))
    }
  }, [questions])

  useEffect(() => {
    if (answers) {
      localStorage.setItem("quizAnswers", JSON.stringify(answers))
    }
  }, [answers])

  if (!questions || !answers) return <div>Chargement...</div>

  const selectedValue = answers[currentIndex]
  const currentQuestion = questions[currentIndex].question_text

  const totalAnswered = answers.filter(a => a !== null).length
  const percent = Math.round((totalAnswered / questions.length) * 100)

  const handleAnswerChange = (value: number) => {
    const updated = [...answers]
    updated[currentIndex] = value
    setAnswers(updated)
  }

  function transformAnswerToScore(answer) {
  switch (answer) {
    case 1: return 2;
    case 2: return 1;
    case 3: return 0;
    case 4: return -1;
    case 5: return -2;
    default: return 0; 
  }
}

const handleNext = async () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1)
  } else {
    // Envoi des réponses
    if (!questions || !answers) return

    const payload = questions.map((q, i) => ({
      question_id: q.question_id,
      score: transformAnswerToScore(answers[i])
    }));

    try {
      const response = await fetch("http://localhost:8085/api/matches/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error("Erreur lors de l'envoi des réponses")
      const result = await response.json(); 
      setCharacter(result.closest_character);
      setUserVector(result.user_vector);
      setShowResult(true); 
      
    } catch (error) {
      alert("Erreur lors de l'envoi : " + error)
    }
  }
}


  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleReset = () => {
    localStorage.removeItem("quizAnswers")
    setAnswers(Array(questions.length).fill(null))
    setCurrentIndex(0)
  }

  const handleManualSave = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers))
    alert("Réponses sauvegardées.")
  }

  const handleSubmit = async () => {
  if (!questions || !answers) return

  // Prépare le tableau à envoyer
  const payload = questions.map((q, i) => ({
    question_id: q.question_id,
    score: answers[i] !== null ? answers[i] : 0,  // par défaut 0 si non répondu
  }))

  try {
    const response = await fetch("http://localhost:8085/api/matches/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error("Erreur lors de l'envoi des réponses")
    alert("Réponses envoyées avec succès !")
  } catch (error) {
    alert("Erreur lors de l'envoi : " + error)
  }
}


  return (
    <div className="quiz-container" style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      {/* Progression */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontWeight: 500, color: "#1E3A8A" }}>Progression</span>
        <span style={{ fontWeight: 600 }}>{percent}%</span>
      </div>
      <div style={{ height: 12, backgroundColor: "#E0E7FF", borderRadius: 9999, marginBottom: "2rem" }}>
        <div style={{ width: `${percent}%`, height: "100%", background: "linear-gradient(to right, #2563EB, #3B82F6)" }} />
      </div>

      {/* Question */}
      <section style={{ backgroundColor: "#fff", borderRadius: "1.5rem", padding: "2rem", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#1E40AF", marginBottom: "1.5rem" }}>{currentQuestion}</h2>

 <form className="likert-scale">
          <div className="radio-group">
            {[1, 2, 3, 4, 5].map((index) => (
              <label key={index} className={`radio-label size-${index}`}>
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedValue === index}
                  onChange={() => handleAnswerChange(index)}
                />
              </label>
            ))}
          </div>
          <div className="label-row">
            <span className="left-label">D’accord</span>
            <span className="right-label">Pas d’accord</span>
          </div>
        </form>
        
      </section>

      {/* Boutons */}
      <div className="quiz-buttons" style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>Précédent</button>
        <button onClick={handleNext} disabled={selectedValue === null}>Suivant</button>
      </div>

      {/* Sauvegarde et reset */}
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div onClick={handleManualSave} style={{ cursor: "pointer", padding: "7px 17px", background: "linear-gradient(135deg, #3B82F6, #60A5FA)", color: "white", fontWeight: "bold", borderRadius: 9999, fontSize: "0.75rem" }}>
          Sauvegarder
        </div>
        <div onClick={handleReset} style={{ backgroundColor: "#2563EB", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginTop: 5 }} title="Recommencer le test">
          {/* Icône reset SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </div>
      </div>

      {/* Popup résultat */}
      {showResult && character && (
  <ResultModal
    onClose={() => setShowResult(false)}
    character={character}
    userVector={userVector}
  />
)}

    </div>
  )
}

