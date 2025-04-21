import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loginRef = collection(db, 'login');
      const q = query(
        loginRef,
        where('user', '==', formData.user),
        where('password', '==', formData.password)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Usuário ou senha incorretos');
        return;
      }

      // Login bem sucedido
      const userData = querySnapshot.docs[0].data();
      sessionStorage.setItem('adminUser', JSON.stringify({
        user: userData.user,
        timestamp: new Date().getTime()
      }));

      onLoginSuccess();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login Administrativo</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="user">Usuário:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginForm; 