import React, { useState, useEffect } from 'react';
import '../assets/css/Login.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 🔁 Vérifie si l'utilisateur est déjà connecté à l'arrivée sur la page
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8085/admin/login.php', {
          method: 'POST',
          credentials: 'include'
        });
        const result = await response.json();
        if (result.auth && result.redirect) {
          window.location.href = result.redirect; // Redirection automatique
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de session :', error);
      }
    };

    checkSession();
  }, []);

  // 🔐 Connexion manuelle
  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('username', username.toLowerCase().trim());
    formData.append('password', password.trim());
    formData.append('lgn', '1');

    try {
      const response = await fetch('http://localhost:8085/admin/login.php', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const result = await response.json();
      if (result.success && result.redirect) {
        window.location.href = result.redirect;
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  // 🎯 Permet de gérer Entrée dans les champs
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Empêche le rechargement
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/images/LOGO.svg" alt="Logo" className="logoImage" />
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} onKeyDown={handleKeyDown}>
          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
