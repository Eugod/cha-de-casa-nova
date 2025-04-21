import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <div>
            <h1>Bem-vindo!</h1>
            <p>Acesse a página de administração em <a href="/admin">/admin</a></p>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
