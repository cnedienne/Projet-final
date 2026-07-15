import { useState, useEffect } from "react";


const listeImages = [
  { photo: "images/chat1.jpeg", titre: "Chat 1", description: "Petit chat mignon" },
  { photo: "images/chat2.jpeg", titre: "Chat 2", description: "Chat curieux" },
  { photo: "images/chat3.jpeg", titre: "Chat 3", description: "Chat joueur" },
  { photo: "images/chat4.jpeg", titre: "Chat 4", description: "Chat pensif" },
  { photo: "images/chat5.jpeg", titre: "Chat 5", description: "Chat explorateur" },
  { photo: "images/chat6.jpeg", titre: "Chat 6", description: "Chat câlin" },
];

function Carrousel() {
  const [indexCentre, setIndexCentre] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  function getPos(i: number): number | null {
    const len = listeImages.length;
    let pos = (i - indexCentre + len) % len;

    if (pos > 2 && pos < len - 2) return null;

    if (pos > 2) pos = pos - len;

    return pos;
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") deplacerGauche();
      if (e.key === "ArrowRight") deplacerDroite();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [indexCentre]);

  function deplacerGauche() {
    setIndexCentre((prev) => (prev - 1 + listeImages.length) % listeImages.length);
  }

  function deplacerDroite() {
    setIndexCentre((prev) => (prev + 1) % listeImages.length);
  }

  function ouvrirPopup(message: string) {
    setPopupMessage(message);
    setShowPopup(true);
  }

  function fermerPopup() {
    setShowPopup(false);
  }

  return (
    <>
      <div className="carousel-container">
      <div className="carousel" id="carousel">
      {listeImages.map((item, i) => {
        const pos = getPos(i);
        if (pos === null) return null;
      
      return (
        <div
          key={i}
          className={`image-wrapper pos${pos}`}
          onClick={() => ouvrirPopup(item.description)}
        >
          <div className="card">
            <img src={item.photo} alt={item.titre} />
            <h3>{item.titre}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      );
    })}
  </div>
       <button className="btn-gauche" onClick={deplacerGauche} aria-label="Précédent">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
</button>

<button className="btn-droite" onClick={deplacerDroite} aria-label="Suivant">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
</button>


      </div>

      {showPopup && (
        <div id="popup" className="popup" onClick={fermerPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p id="popup-message">{popupMessage}</p>
            <button className="button" onClick={fermerPopup}>
              J'ai compris !
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Carrousel;
