import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin/Admin'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={
              <div>
                <h1>Bem-vindo!</h1>
                <p>Acesse a página de administração em <a href="/admin">/admin</a></p>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
