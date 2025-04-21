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
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 