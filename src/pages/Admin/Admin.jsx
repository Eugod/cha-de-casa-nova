import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="admin-page">
      <h1>Página de Administração</h1>
      <div className="admin-buttons">
        <Link to="/admin/add-product" className="add-product-button">
          Adicionar Produto
        </Link>
        <Link to="/admin/messages" className="add-product-button">
          Ver Mensagens
        </Link>
      </div>
    </div>
  );
}

export default Admin; 