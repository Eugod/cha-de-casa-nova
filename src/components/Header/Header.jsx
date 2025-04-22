import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Header.css'

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminUser = sessionStorage.getItem('adminUser');
      if (adminUser) {
        const { timestamp } = JSON.parse(adminUser);
        const now = new Date().getTime();
        const sessionTimeout = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
        setIsAuthenticated((now - timestamp) < sessionTimeout);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="../../public/home-icon.png" alt="Home" />
          Chá de Casa Nova
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/lista-de-presentes" className="nav-link">Lista de Presentes</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="nav-link">Admin</Link>
              <button onClick={handleLogout} className="logout-button">
                Sair
              </button>
            </>
          ) : (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header 