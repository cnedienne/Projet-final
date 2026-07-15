import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/css/Admin.css';
import PersonnaliteTable from './personnalitestable';
import QuestionsTable from './questionstable';
import TraitsTable from './TraitsTabele';

import {
  FiHelpCircle,
  FiUser,
  FiTag,
  FiLogOut,
} from 'react-icons/fi';

const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'questions' | 'personnalites' | 'traits'>('questions');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8085/admin/check_session.php', {
          credentials: 'include',
        });
        const data = await response.json();

        if (!data.auth || data.username !== username) {
          navigate('/login');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur de session:', error);
        navigate('/login');
      }
    };

    checkSession();
  }, [username, navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8085/admin/logout.php', {
        credentials: 'include',
      });
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <img src="/images/LOGO.svg" alt="Logo" className="logoImage" />
        </div>

        <nav className="nav">
          <NavItem
            icon={<FiHelpCircle />}
            label="Questions"
            active={activeSection === 'questions'}
            onClick={() => setActiveSection('questions')}
          />
          <NavItem
            icon={<FiUser />}
            label="Personnalités"
            active={activeSection === 'personnalites'}
            onClick={() => setActiveSection('personnalites')}
          />
          <NavItem
            icon={<FiTag />}
            label="Traits"
            active={activeSection === 'traits'}
            onClick={() => setActiveSection('traits')}
          />
        </nav>

        <div className="logout">
          <NavItem
            icon={<FiLogOut />}
            label="Déconnexion"
            onClick={handleLogout}
          />
        </div>
      </aside>

      <main className="main">
        <div className="header">
          <div className="profile">
            <div className="avatar">{username?.substring(0, 2).toUpperCase()}</div>
            <div>
              <div className="adminName">{username}</div>
              <div className="adminEmail">{username}@personatest.com</div>
            </div>
          </div>
        </div>

        <div className="content-area">
          {activeSection === 'questions' && <QuestionsTable />}
          {activeSection === 'personnalites' && <PersonnaliteTable />}
          {activeSection === 'traits' && <TraitsTable />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    className={`navItem ${active ? 'active' : ''}`}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <span className="navIcon">{icon}</span>
    <span>{label}</span>
  </div>
);

export default Admin;
