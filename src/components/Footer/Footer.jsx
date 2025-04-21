import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2024 Chá de Casa Nova. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="/sobre">Sobre</a>
            <a href="/contato">Contato</a>
            <a href="/privacidade">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 