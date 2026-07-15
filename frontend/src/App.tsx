import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Header from './components/header';
import Footer from './components/footer';
import Perso from './components/Perso';
import Admin from './components/Admin';
import LoginPage from './components/login'; 

const App: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const hideLayout = path.startsWith('/admin') || path === '/login';

  return (
    <div>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/perso" element={<Perso />} />
        <Route path="/admin/:username" element={<Admin />} />
        <Route path="/login" element={<LoginPage />} /> {/* Ajoute cette ligne */}
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
