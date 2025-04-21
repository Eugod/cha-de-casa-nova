import { Navigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

function ProtectedRoute({ children }) {
  const checkAuth = () => {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) return false;

    const { timestamp } = JSON.parse(adminUser);
    const now = new Date().getTime();
    const sessionTimeout = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

    return (now - timestamp) < sessionTimeout;
  };

  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => window.location.reload()} />;
  }

  return children;
}

export default ProtectedRoute; 