import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Chá de Casa Nova
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/lista-de-presentes" className="nav-link">Lista de Presentes</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 