import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin/Admin'
import AddProduct from './pages/AddProduct/AddProduct';
import ListaDePresentes from './pages/ListaDePresentes/ListaDePresentes';
import Messages from './pages/Messages/Messages';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-product" element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/lista-de-presentes" element={<ListaDePresentes />} />
            <Route path="/" element={
              <div>
                <h1>Bem-vindo!</h1>
                <p>Acesse a página de administração em <a href="/admin">/admin</a></p>
                <p>Veja nossos produtos em <a href="/lista-de-presentes">/lista-de-presentes</a></p>
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
